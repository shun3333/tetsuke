// クサリ列 → グローバル拍位置への変換ロジック(全体の土台)
import {
  KUSARI_BEAT_COUNT,
  type BeatRef,
  type KusariEntry,
  type KusariType,
} from "../types";

/** 指定typeの拍数 */
export function beatCountOf(type: KusariType): number {
  return KUSARI_BEAT_COUNT[type];
}

/**
 * 各クサリの先頭のグローバル拍位置(0-indexed)を計算する。
 * global_start[0] = 0
 * global_start[i] = global_start[i-1] + beatCountOf(type[i-1])
 * 曲データには保存せず、読み込み時に都度計算する導出値。
 */
export function computeGlobalStarts(kusariSequence: KusariEntry[]): number[] {
  const starts: number[] = [];
  let acc = 0;
  for (const k of kusariSequence) {
    starts.push(acc);
    acc += beatCountOf(k.type);
  }
  return starts;
}

/** 曲全体の総拍数 */
export function totalBeats(kusariSequence: KusariEntry[]): number {
  return kusariSequence.reduce((sum, k) => sum + beatCountOf(k.type), 0);
}

/**
 * beat_ref(クサリindex + クサリ内1-indexed拍)をグローバル拍位置(0-indexed)に変換する。
 * globalStartsは computeGlobalStarts の結果を渡す(呼び出し側でキャッシュ可能)。
 */
export function beatRefToGlobal(ref: BeatRef, globalStarts: number[]): number {
  const start = globalStarts[ref.kusari_index];
  if (start === undefined) {
    throw new Error(`invalid kusari_index: ${ref.kusari_index}`);
  }
  return start + (ref.beat - 1);
}

/** グローバル拍位置(0-indexed)を beat_ref に変換する(グリッドUIでのクリック位置特定などに使用) */
export function globalToBeatRef(
  globalBeat: number,
  kusariSequence: KusariEntry[],
  globalStarts: number[],
): BeatRef | null {
  for (let i = kusariSequence.length - 1; i >= 0; i--) {
    const start = globalStarts[i];
    if (globalBeat >= start) {
      const len = beatCountOf(kusariSequence[i].type);
      if (globalBeat < start + len) {
        return { kusari_index: i, beat: globalBeat - start + 1 };
      }
      return null;
    }
  }
  return null;
}

/** 手組インスタンスが開始するグローバル拍位置 */
export function teInstanceGlobalStart(
  ref: BeatRef,
  globalStarts: number[],
): number {
  return beatRefToGlobal(ref, globalStarts);
}

/** beat_refがそのクサリ列の中で有効な範囲か(型変更・クサリ削除後の不整合チェック用) */
export function isBeatRefValid(
  ref: BeatRef,
  kusariSequence: KusariEntry[],
): boolean {
  const k = kusariSequence[ref.kusari_index];
  if (!k) return false;
  return ref.beat >= 1 && ref.beat <= beatCountOf(k.type);
}

/**
 * 手組インスタンスの終了位置(自動算出、end_refは保存しない)。
 * クサリをまたいでも、開始グローバル位置 + internal_pattern.length からそのまま求まる。
 * 戻り値は「最後の拍のグローバル位置 + 1」(exclusive end)。
 */
export function teInstanceGlobalEnd(
  ref: BeatRef,
  length: number,
  globalStarts: number[],
): number {
  return teInstanceGlobalStart(ref, globalStarts) + length;
}
