// 唱歌マスタ(笛)の保存・復元と、外から来たJSONの検証。
//
// 手組マスタ(masterStorage.ts)と同じ作りにしてある。
// 画面から編集できるため、曲データと同じくブラウザに保存し、
// 読むときは形を確かめてから使う(合わなければ既定のマスタに戻す)。
import type { ShogaChar, ShogaEntry, ShogaMaster } from "../types";
import { SHOGA_MASTER } from "../data/shogaMaster";
import { newUid } from "./tePattern";
import {
  isRecord,
  parseJson,
  readArray,
  readInteger,
  readString,
  type ParseResult,
} from "./jsonRead";

const STORAGE_KEY = "tetsuke:shoga-master";

function readChar(value: unknown, where: string): ShogaChar {
  if (!isRecord(value)) throw new Error(`${where} がオブジェクトではありません`);
  return {
    beat: readInteger(value.beat, `${where}.beat`),
    text: readString(value.text, `${where}.text`),
  };
}

/**
 * 内部IDを読む。無いものや、他と同じものは振り直す。
 * 画面の中でまとまりを指すためのものなので、読めた時点で一意ならよい。
 */
function readUid(value: unknown, where: string, used: Set<string>): string {
  const uid =
    value === undefined || used.has(String(value))
      ? newUid()
      : readString(value, `${where}.uid`);
  used.add(uid);
  return uid;
}

function readEntry(
  value: unknown,
  where: string,
  usedUids: Set<string>,
): ShogaEntry {
  if (!isRecord(value)) throw new Error(`${where} がオブジェクトではありません`);
  const length = readInteger(value.length, `${where}.length`);
  if (length < 1) throw new Error(`${where}.length は1以上にしてください`);
  return {
    uid: readUid(value.uid, where, usedUids),
    // IDは任意。無いものは空のIDとして扱う(曲データから参照できないだけ)
    shoga_id:
      value.shoga_id === undefined
        ? ""
        : readString(value.shoga_id, `${where}.shoga_id`),
    label: readString(value.label, `${where}.label`),
    length,
    chars: readArray(value.chars, `${where}.chars`).map((v, i) =>
      readChar(v, `${where}.chars[${i}]`),
    ),
  };
}

/** JSONの文字列を唱歌マスタとして読み込む */
export function parseShogaMasterJson(text: string): ParseResult<ShogaMaster> {
  return parseJson(text, (raw) => {
    const list = readArray(raw, "唱歌マスタ");
    const usedUids = new Set<string>();
    return list.map((v, i) => readEntry(v, `[${i}]`, usedUids));
  });
}

export function shogaMasterToJson(master: ShogaMaster): string {
  return `${JSON.stringify(master, null, 2)}\n`;
}

/** 保存してある唱歌マスタを読む。無い・読めない場合は null */
export function loadStoredShogaMaster(): ShogaMaster | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const result = parseShogaMasterJson(raw);
    return result.ok ? result.value : null;
  } catch {
    return null;
  }
}

export function storeShogaMaster(master: ShogaMaster): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, shogaMasterToJson(master));
  } catch {
    // 保存できない環境でも編集は続けられる
  }
}

/** コードに書いてある既定のマスタ */
export function defaultShogaMaster(): ShogaMaster {
  return structuredClone(SHOGA_MASTER);
}
