// 手組の内部パターンを扱う小さな道具。
import type { HitEntry, InternalPattern, KakegoeEntry } from "../types";

/** 掛け声・手のうち、枠に収まらないものを取り除く(長さを縮めたとき用) */
export function clampToLength(
  pattern: InternalPattern,
  length: number,
): Pick<InternalPattern, "kakegoe" | "hits"> {
  const last = length * 2;
  const inRange = (pos: number) => pos >= 0 && pos <= last;
  return {
    kakegoe: pattern.kakegoe.filter((k: KakegoeEntry) => inRange(k.rel_pos)),
    hits: pattern.hits.filter((h: HitEntry) => inRange(h.rel_pos)),
  };
}
