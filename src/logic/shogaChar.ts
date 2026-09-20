// 唱歌の文字の見た目(小文字・縦幅・ずらし)の扱い。
//
// 文字を置く側(プレビュー・手付の描画)で同じ読み方をするよう、
// 調整の値から実際の大きさ・位置を出すところをここにまとめる。
import type { ShogaChar } from "../types";

/** 「小文字」にしたときの縮め方。拗音の小書き文字と同じ比率 */
export const SHOGA_SMALL_SCALE = 0.85;

/** 縦幅の倍率で動かせる範囲。極端な値で読めなくならないようにする */
export const SHOGA_HEIGHT_MIN = 0.3;
export const SHOGA_HEIGHT_MAX = 3;

/**
 * 文字の間隔の倍率で動かせる範囲。
 * 0まで詰められるようにしてあるので、重ねて書くこともできる。
 */
export const SHOGA_SPACING_MIN = 0;
export const SHOGA_SPACING_MAX = 3;

/** ずらし幅(文字の大きさに対する比)で動かせる範囲 */
export const SHOGA_SHIFT_LIMIT = 2;

/** 調整の値を、その範囲に収める */
export function clampHeightScale(value: number): number {
  return Math.min(SHOGA_HEIGHT_MAX, Math.max(SHOGA_HEIGHT_MIN, value));
}

export function clampSpacing(value: number): number {
  return Math.min(SHOGA_SPACING_MAX, Math.max(SHOGA_SPACING_MIN, value));
}

export function clampShift(value: number): number {
  return Math.min(SHOGA_SHIFT_LIMIT, Math.max(-SHOGA_SHIFT_LIMIT, value));
}

/** 何か調整が入っているか(入力欄に印を付けるのに使う) */
export function hasShogaAdjust(char: ShogaChar): boolean {
  return (
    char.small === true ||
    (char.height_scale !== undefined && char.height_scale !== 1) ||
    (char.spacing !== undefined && char.spacing !== 1) ||
    (char.dx !== undefined && char.dx !== 0) ||
    (char.dy !== undefined && char.dy !== 0)
  );
}

/** 調整を外した文字(テキストと位置はそのまま) */
export function withoutShogaAdjust(char: ShogaChar): ShogaChar {
  return { beat: char.beat, text: char.text };
}

/**
 * 既定のままの調整は持たないようにする。
 * 保存するJSONに「調整していない」という書き込みが増えないようにするため。
 */
export function tidyShogaChar(char: ShogaChar): ShogaChar {
  const tidied = withoutShogaAdjust(char);
  if (char.small) tidied.small = true;
  if (char.height_scale !== undefined && char.height_scale !== 1) {
    tidied.height_scale = char.height_scale;
  }
  if (char.spacing !== undefined && char.spacing !== 1) {
    tidied.spacing = char.spacing;
  }
  if (char.dx) tidied.dx = char.dx;
  if (char.dy) tidied.dy = char.dy;
  return tidied;
}

/** 調整を当てはめた、実際の描画の値 */
export interface ShogaCharLayout {
  fontSize: number;
  /**
   * 1音を書く高さ。長音符の棒の長さなど、文字そのものの大きさに効く。
   * 縦幅の倍率は別に掛けるので、ここには入れない。
   */
  charHeight: number;
  /** 音と音を置く間隔。文字の大きさとは別に詰めたり広げたりできる */
  step: number;
  /** 文字を置く中心。ずらしを足した後の座標 */
  cx: number;
  cy: number;
  /** 中心を軸にした縦方向の拡げ方。1なら何もしない */
  heightScale: number;
}

/**
 * 調整込みの描画の値を出す。
 * 基準の大きさ(baseFontSize / baseCharHeight)は、置く場所ごとに違ってよい。
 * ずらし幅は文字の大きさに対する比なので、小文字にすると一緒に小さくなる。
 * 間隔も文字の大きさに連れて縮むようにしてあるので、
 * 小文字にしたときに間が空きすぎることはない。
 */
export function shogaCharLayout(
  char: ShogaChar,
  cx: number,
  cy: number,
  baseFontSize: number,
  baseCharHeight: number,
): ShogaCharLayout {
  const scale = char.small ? SHOGA_SMALL_SCALE : 1;
  const fontSize = baseFontSize * scale;
  const charHeight = baseCharHeight * scale;
  return {
    fontSize,
    charHeight,
    step: charHeight * clampSpacing(char.spacing ?? 1),
    cx: cx + (char.dx ?? 0) * fontSize,
    // dy は上が+。画面のy座標は下ほど大きいので、向きを逆にして足す
    cy: cy - (char.dy ?? 0) * fontSize,
    heightScale: clampHeightScale(char.height_scale ?? 1),
  };
}

/**
 * 縦だけ拡げるための transform。中心(cy)は動かさない。
 * 1のときは何もしないので、transform 自体を付けない。
 */
export function heightScaleTransform(
  cy: number,
  heightScale: number,
): string | undefined {
  if (heightScale === 1) return undefined;
  return `translate(0 ${cy}) scale(1 ${heightScale}) translate(0 ${-cy})`;
}
