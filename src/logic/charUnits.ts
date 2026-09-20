// 縦書きの文字列を「1音 = 1マス」に分ける。
//
// 謡も唱歌も、拗音や「ン」は前の文字とまとめて1音として書くため、
// 文字数と縦に並ぶ数は一致しない。描くところと数えるところで
// 同じ分け方をするよう、ここにまとめてある。

/** 拗音・促音などの小書き文字。直前の文字と合わせて1音になる */
const SMALL_KANA = new Set([
  "ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "っ", "ゃ", "ゅ", "ょ", "ゎ",
  "ァ", "ィ", "ゥ", "ェ", "ォ", "ッ", "ャ", "ュ", "ョ", "ヮ", "ヵ", "ヶ",
]);

/** 前の音にくっつけて発音する「ン」 */
const N_CHARS = new Set(["ン", "ん"]);

/** 縦書き1マス分の単位(= 1音) */
export interface CharUnit {
  base: string;
  /** 拗音などの小書き文字。親文字の右下に添える */
  small: string;
  /** 前の音にくっつけて発音する「ン」。親文字と小さくして縦に並べる */
  n: string;
}

/**
 * 文字列を「1音 = 1マス」の単位に分ける。
 * - 拗音などの小書き文字は直前の文字と合わせて1音として扱う
 * - 直前の音にくっつく「ン」も同じ1音に含める
 */
export function toCharUnits(text: string): CharUnit[] {
  const units: CharUnit[] = [];
  for (const ch of Array.from(text)) {
    const prev = units[units.length - 1];
    // 「ン」を取り込んだ後の音には、それ以上ぶら下げない
    if (prev && !prev.n && SMALL_KANA.has(ch)) {
      prev.small += ch;
    } else if (prev && !prev.n && N_CHARS.has(ch)) {
      prev.n = ch;
    } else {
      units.push({ base: ch, small: "", n: "" });
    }
  }
  return units;
}

/**
 * 縦に並ぶ音の数。
 * 拗音や「ン」は前の音にくっつくので、文字数とは一致しないことがある。
 */
export function countCharUnits(text: string): number {
  return toCharUnits(text).length;
}
