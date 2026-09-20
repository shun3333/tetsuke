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

/** クサリ枠のヘッダー行に入れる名前(手組名・唱歌の名前) */
export const LABEL_FONT_SIZE = 9;
/** 名前を縦書きにしたときの1文字あたりの高さ */
export const LABEL_CHAR_HEIGHT = 10;
