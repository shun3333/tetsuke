// クサリ列 → グローバル位置への変換ロジック(全体の土台)
//
// 位置の表し方:
//  - beat_ref.beat は「半拍単位の枠番号」(1始まり)。
//    1 = 0拍の裏 / 2 = 1拍の表 / 3 = 1拍の裏 / … / 2N = N拍の表
//  - 描画では「拍(表)の横線からの距離」で扱いたいので、
//    クサリ内オフセット(拍単位、0 = 1拍目の横線)に直して使う。
//      offset = beat / 2 - 1    (1 → -0.5, 2 → 0, 3 → 0.5, 16 → 7)
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

/** 指定typeのクサリが持つ半拍枠の数(= 拍数 × 2) */
export function slotCountOf(type: KusariType): number {
  return beatCountOf(type) * 2;
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

/** 半拍枠番号 → クサリ内オフセット(拍単位、0 = 1拍目の横線、-0.5 = 0拍の裏) */
export function slotToLocalOffset(beat: number): number {
  return beat / 2 - 1;
}

/** クサリ内オフセット(拍単位) → 半拍枠番号 */
export function localOffsetToSlot(offset: number): number {
  return (offset + 1) * 2;
}

/** beat_refがそのクサリ列の中で有効な範囲か(型変更・クサリ削除後の不整合チェック用) */
export function isBeatRefValid(
  ref: BeatRef,
  kusariSequence: KusariEntry[],
): boolean {
  const k = kusariSequence[ref.kusari_index];
  if (!k) return false;
  return ref.beat >= 1 && ref.beat <= slotCountOf(k.type);
}


/**
 * グローバル位置(拍単位、小数可)を beat_ref に変換する。
 * 各クサリは [global_start - 0.5, global_start + 拍数 - 1] の範囲を受け持つ。
 * (クサリ末尾の拍の裏は次のクサリの beat: 1 になる)
 */
export function globalPosToBeatRef(
  globalPos: number,
  kusariSequence: KusariEntry[],
  globalStarts: number[],
): BeatRef | null {
  for (let i = 0; i < kusariSequence.length; i++) {
    const start = globalStarts[i];
    const len = beatCountOf(kusariSequence[i].type);
    if (globalPos >= start - 0.5 && globalPos <= start + len - 1) {
      return { kusari_index: i, beat: localOffsetToSlot(globalPos - start) };
    }
  }
  return null;
}

/**
 * 手組の起点となるグローバル位置(拍単位)。
 * 選んだクサリの1拍目(表)が起点で、rel_pos: 0 がそこに乗る。
 * 前のクサリの最後の拍を使う手組は rel_pos を負にして表すため、
 * 起点より前に出ることがある(最初のクサリでは曲の頭より前になり、
 * その分は描画されないだけで、置くこと自体は問題ない)。
 */
export function teInstanceStartGlobalPos(
  kusariIndex: number,
  globalStarts: number[],
): number {
  return globalStarts[kusariIndex];
}

/** グローバル拍番号(0-indexed) → クサリindexとクサリ内の拍番号(1始まり) */
export function globalBeatToKusariBeat(
  globalBeat: number,
  kusariSequence: KusariEntry[],
  globalStarts: number[],
): { kusariIndex: number; localBeat: number } | null {
  for (let i = 0; i < kusariSequence.length; i++) {
    const start = globalStarts[i];
    const len = beatCountOf(kusariSequence[i].type);
    if (globalBeat >= start && globalBeat < start + len) {
      return { kusariIndex: i, localBeat: globalBeat - start + 1 };
    }
  }
  return null;
}

