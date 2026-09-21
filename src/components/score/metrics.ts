// 手付に書く文字の大きさ。
//
// 手付(ScoreView)と、手組・唱歌のプレビューで同じ見た目になるよう、
// 基準の大きさはここだけで決める。プレビューは手付と同じ座標で組み、
// 最後にまとめて拡大するので、この値をそのまま使えばよい。
//
// FONT_SIZE がグリフの大きさ、CHAR_HEIGHT が縦書き1音あたりの高さ。

/** 墨で書くもの(謡・唱歌)の色 */
export const INK_COLOR = "#000000";

/** 掛け声 */
export const KAKEGOE_FONT_SIZE = 10;
export const KAKEGOE_CHAR_HEIGHT = 11;

/** 謡 */
export const UTAI_FONT_SIZE = 16;
export const UTAI_CHAR_HEIGHT = 15;

/** 唱歌(笛)。謡と同じ列に書くので、大きさも謡に合わせる */
export const SHOGA_FONT_SIZE = UTAI_FONT_SIZE;
export const SHOGA_CHAR_HEIGHT = UTAI_CHAR_HEIGHT;

/** 拍数の軸 */
export const AXIS_FONT_SIZE = 11;

/** 紙の下に入れるページ番号 */
export const PAGE_NUMBER_FONT_SIZE = 10;

/** 曲名(手付の1列目に縦書きで入れる)。謡より一回り大きく書く */
export const TITLE_FONT_SIZE = 22;
export const TITLE_CHAR_HEIGHT = 24;

/** 手付に挟む覚え書き。本文なので、曲名より小さく謡と同じくらいにする */
export const MEMO_FONT_SIZE = UTAI_FONT_SIZE;
export const MEMO_CHAR_HEIGHT = 18;

/** クサリ枠のヘッダー行に入れる名前(手組名・唱歌の名前) */
export const LABEL_FONT_SIZE = 9;
/** 名前を縦書きにしたときの1文字あたりの高さ */
export const LABEL_CHAR_HEIGHT = 10;
