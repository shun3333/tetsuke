// 手組マスタの保存・復元と、外から来たJSONの検証。
//
// マスタは画面から編集できるため、曲データと同じくブラウザに保存する。
// 読むときは形を確かめてから使う(合わなければ既定のマスタに戻す)。
import {
  INSTRUMENTS,
  TIMINGS,
  type GuideEntry,
  type GuideShape,
  type HitEntry,
  type Instrument,
  type InternalPattern,
  type KakegoeEntry,
  type TeMaster,
  type TeMasterEntry,
  type Timing,
} from "../types";
import { TE_MASTER } from "../data/teMaster";
import { newUid } from "./tePattern";
import {
  isRecord,
  parseJson,
  readArray,
  readEnum,
  readInteger,
  readString,
  type ParseResult,
} from "./jsonRead";

const STORAGE_KEY = "tetsuke:te-master";

const GUIDE_SHAPES: readonly GuideShape[] = ["straight", "bent"];

export type TeMasterByInstrument = Record<Instrument, TeMaster>;

function readKakegoe(value: unknown, where: string): KakegoeEntry {
  if (!isRecord(value)) throw new Error(`${where} がオブジェクトではありません`);
  return {
    rel_pos: readInteger(value.rel_pos, `${where}.rel_pos`),
    text: readString(value.text, `${where}.text`),
  };
}

function readHit(value: unknown, where: string): HitEntry {
  if (!isRecord(value)) throw new Error(`${where} がオブジェクトではありません`);
  return {
    rel_pos: readInteger(value.rel_pos, `${where}.rel_pos`),
    timing: readEnum(value.timing, TIMINGS, `${where}.timing`),
    te: readString(value.te, `${where}.te`),
  };
}

function readGuide(value: unknown, where: string): GuideEntry {
  if (!isRecord(value)) throw new Error(`${where} がオブジェクトではありません`);
  return {
    from_pos: readInteger(value.from_pos, `${where}.from_pos`),
    to_pos: readInteger(value.to_pos, `${where}.to_pos`),
    shape: readEnum(value.shape, GUIDE_SHAPES, `${where}.shape`),
    from_timing: readTiming(value.from_timing, `${where}.from_timing`),
    to_timing: readTiming(value.to_timing, `${where}.to_timing`),
  };
}

/** 端のずらし方は無くてもよい(古いデータには入っていない) */
function readTiming(value: unknown, where: string): Timing | undefined {
  return value === undefined ? undefined : readEnum(value, TIMINGS, where);
}

function readPattern(value: unknown, where: string): InternalPattern {
  if (!isRecord(value)) throw new Error(`${where} がオブジェクトではありません`);
  const length = readInteger(value.length, `${where}.length`);
  if (length < 1) throw new Error(`${where}.length は1以上にしてください`);
  return {
    length,
    kakegoe: readArray(value.kakegoe, `${where}.kakegoe`).map((v, i) =>
      readKakegoe(v, `${where}.kakegoe[${i}]`),
    ),
    hits: readArray(value.hits, `${where}.hits`).map((v, i) =>
      readHit(v, `${where}.hits[${i}]`),
    ),
    guides:
      value.guides === undefined
        ? undefined
        : readArray(value.guides, `${where}.guides`).map((v, i) =>
            readGuide(v, `${where}.guides[${i}]`),
          ),
  };
}

function readEntry(
  value: unknown,
  instrument: Instrument,
  where: string,
  usedUids: Set<string>,
): TeMasterEntry {
  if (!isRecord(value)) throw new Error(`${where} がオブジェクトではありません`);
  return {
    uid: readUid(value.uid, where, usedUids),
    // IDは任意。無いものは空のIDとして扱う(曲データから参照できないだけ)
    te_id:
      value.te_id === undefined
        ? ""
        : readString(value.te_id, `${where}.te_id`),
    label: readString(value.label, `${where}.label`),
    // 楽器はどのマスタに入っているかで決まる
    instrument,
    // 配置する拍(N拍目)。無い(古いデータ)ものは未設定として扱う
    start_beat: readNullableInteger(value.start_beat, `${where}.start_beat`),
    internal_pattern: readPattern(value.internal_pattern, `${where}.internal_pattern`),
  };
}

/** 値が無ければ未設定(null)として読む */
function readNullableInteger(value: unknown, where: string): number | null {
  return value === undefined || value === null ? null : readInteger(value, where);
}

/**
 * 内部IDを読む。無い(古いデータ)ものや、他と同じものは振り直す。
 * 内部IDは画面の中で手組を指すためのものなので、読めた時点で
 * 一意になっていればよい。
 */
function readUid(value: unknown, where: string, used: Set<string>): string {
  const uid =
    value === undefined || used.has(String(value))
      ? newUid()
      : readString(value, `${where}.uid`);
  used.add(uid);
  return uid;
}

/**
 * 1つの楽器分の手組を読む。
 * いまは手組を並べた配列で持つが、以前は te_id をキーにした
 * オブジェクトだったため、そちらの形も読めるようにしてある。
 */
function readGroup(
  value: unknown,
  instrument: Instrument,
  usedUids: Set<string>,
): TeMaster {
  if (Array.isArray(value)) {
    return value.map((v, i) =>
      readEntry(v, instrument, `${instrument}[${i}]`, usedUids),
    );
  }
  if (isRecord(value)) {
    return Object.entries(value).map(([teId, v]) =>
      readEntry(v, instrument, `${instrument}.${teId}`, usedUids),
    );
  }
  throw new Error(`${instrument} が手組の配列ではありません`);
}

/** JSONの文字列を手組マスタとして読み込む */
export function parseTeMasterJson(text: string): ParseResult<TeMasterByInstrument> {
  return parseJson(text, (raw) => {
    if (!isRecord(raw)) throw new Error("中身がオブジェクトではありません");
    const master = {} as TeMasterByInstrument;
    // 内部IDは楽器をまたいで一意にしておく
    const usedUids = new Set<string>();
    for (const instrument of INSTRUMENTS) {
      master[instrument] = readGroup(raw[instrument], instrument, usedUids);
    }
    return master;
  });
}

export function teMasterToJson(master: TeMasterByInstrument): string {
  return `${JSON.stringify(master, null, 2)}\n`;
}

/** 保存してある手組マスタを読む。無い・読めない場合は null */
export function loadStoredTeMaster(): TeMasterByInstrument | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const result = parseTeMasterJson(raw);
    return result.ok ? result.value : null;
  } catch {
    return null;
  }
}

export function storeTeMaster(master: TeMasterByInstrument): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, teMasterToJson(master));
  } catch {
    // 保存できない環境でも編集は続けられる
  }
}

/** コードに書いてある既定のマスタ */
export function defaultTeMaster(): TeMasterByInstrument {
  return structuredClone(TE_MASTER);
}
