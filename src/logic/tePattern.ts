// 手組マスタと、その内部パターンを扱う小さな道具。
import type {
  GuideEntry,
  HitEntry,
  InternalPattern,
  KakegoeEntry,
  TeMaster,
  TeMasterEntry,
} from "../types";

/** 手組1つ分の内部ID。他とぶつからなければよく、中身に意味はない */
export function newUid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // 安全なコンテキストでない場合の控え
  return `u-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * IDから手組を探す。IDは重複してもよいので、先に並んでいるものを使う。
 * 空のIDは曲データから参照できないため、見つからない扱いにする。
 */
export function findTe(
  master: TeMaster,
  teId: string,
): TeMasterEntry | undefined {
  if (teId === "") return undefined;
  return master.find((te) => te.te_id === teId);
}

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

/**
 * 手・掛け声・補助線の位置(rel_pos / from_pos / to_pos)を、
 * まとめて半拍単位でずらす(delta は半拍数。負で左、正で右)。
 * 枠からはみ出す位置になってもそのまま持たせる(編集欄には出なくなるが、
 * 長さを伸ばせば編集できる)。
 */
export function shiftPattern(
  pattern: InternalPattern,
  delta: number,
): Pick<InternalPattern, "kakegoe" | "hits" | "guides"> {
  return {
    kakegoe: pattern.kakegoe.map((k: KakegoeEntry) => ({
      ...k,
      rel_pos: k.rel_pos + delta,
    })),
    hits: pattern.hits.map((h: HitEntry) => ({
      ...h,
      rel_pos: h.rel_pos + delta,
    })),
    guides: pattern.guides?.map((g: GuideEntry) => ({
      ...g,
      from_pos: g.from_pos + delta,
      to_pos: g.to_pos + delta,
    })),
  };
}
