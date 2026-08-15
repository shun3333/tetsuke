// 手組マスタの保存・復元と、外から来たJSONの検証。
//
// マスタは画面から編集できるため、曲データと同じくブラウザに保存する。
// 読むときは形を確かめてから使う(合わなければ既定のマスタに戻す)。
import {
  INSTRUMENTS,
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

const TIMINGS: readonly Timing[] = ["on", "slightly_early", "slightly_late"];
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
  };
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
): TeMasterEntry {
  if (!isRecord(value)) throw new Error(`${where} がオブジェクトではありません`);
  return {
    te_id: readString(value.te_id, `${where}.te_id`),
    label: readString(value.label, `${where}.label`),
    // 楽器はどのマスタに入っているかで決まる
    instrument,
    internal_pattern: readPattern(value.internal_pattern, `${where}.internal_pattern`),
  };
}

/** JSONの文字列を手組マスタとして読み込む */
export function parseTeMasterJson(text: string): ParseResult<TeMasterByInstrument> {
  return parseJson(text, (raw) => {
    if (!isRecord(raw)) throw new Error("中身がオブジェクトではありません");
    const master = {} as TeMasterByInstrument;
    for (const instrument of INSTRUMENTS) {
      const group: unknown = raw[instrument];
      if (!isRecord(group)) {
        throw new Error(`${instrument} がオブジェクトではありません`);
      }
      const entries: TeMaster = {};
      for (const [teId, value] of Object.entries(group)) {
        entries[teId] = readEntry(value, instrument, `${instrument}.${teId}`);
      }
      master[instrument] = entries;
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
