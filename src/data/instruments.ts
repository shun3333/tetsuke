// 楽器ごとの表示設定(色)と、手マスタ(手のID -> 表示する図形)。
// 色は文字・記号ごとではなく楽器ごとに決める。
import type { Instrument, TeGlyphMaster } from "../types";

/** 楽器ごとの表示色。小鼓の手組は掛け声も手もすべて青。 */
export const INSTRUMENT_COLOR: Record<Instrument, string> = {
  kotsuzumi: "#2266dd",
};

/** 小鼓の手マスタ。小鼓の手はこの4種類のみ。 */
export const kotsuzumiTeGlyphs: TeGlyphMaster = {
  pu: { te: "pu", label: "プ", shape: "open_circle_barred" },
  po: { te: "po", label: "ポ", shape: "open_circle" },
  chi: { te: "chi", label: "チ", shape: "filled_small_circle" },
  ta: { te: "ta", label: "タ", shape: "open_triangle" },
};

/** 楽器ごとの手マスタ */
export const TE_GLYPH_MASTER: Record<Instrument, TeGlyphMaster> = {
  kotsuzumi: kotsuzumiTeGlyphs,
};
