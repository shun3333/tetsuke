// 曲データを「クサリごとの描画アイテム」に展開する。
// 座標は持たず、クサリ内の拍単位オフセット(0 = 1拍目の横線、-0.5 = 0拍の裏)
// までを解決する。実際のx/y座標への変換は描画側(ScoreView)が行う。
import type { Instrument, SongData, TeMaster, TeName, Timing } from "../types";
import {
  beatRefToGlobalPos,
  globalPosToBeatRef,
  isBeatRefValid,
  slotToLocalOffset,
} from "./position";

/** 謡の1枠 */
export interface UtaiCell {
  offset: number;
  value: string;
}

/** 掛け声または手の1つ。描画先のクサリと位置は解決済み */
export interface TeRenderItem {
  key: string;
  offset: number;
  /** どの楽器の手組か(色の決定に使う) */
  instrument: Instrument;
  text?: string;
  te?: TeName;
  timing?: Timing;
}

/** クサリ枠のヘッダー行に表示する手組名 */
export interface TeLabel {
  key: string;
  /** 表示する名前(手組マスタのlabel) */
  text: string;
  instrument: Instrument;
}

export interface ScoreItems {
  utaiByKusari: Map<number, UtaiCell[]>;
  kakegoeByKusari: Map<number, TeRenderItem[]>;
  hitsByKusari: Map<number, TeRenderItem[]>;
  labelsByKusari: Map<number, TeLabel[]>;
}

/** Mapの配列にひとつ追加する */
function pushTo<T>(map: Map<number, T[]>, key: number, value: T): void {
  const list = map.get(key);
  if (list) list.push(value);
  else map.set(key, [value]);
}

/** 謡トラックをクサリごとの描画アイテムに展開する */
function buildUtaiItems(song: SongData): Map<number, UtaiCell[]> {
  const map = new Map<number, UtaiCell[]>();
  for (const c of song.tracks.utai?.chars ?? []) {
    if (!c.content) continue;
    if (!isBeatRefValid(c.beat_ref, song.kusari_sequence)) continue;
    pushTo(map, c.beat_ref.kusari_index, {
      offset: slotToLocalOffset(c.beat_ref.beat),
      value: c.content.value,
    });
  }
  return map;
}

/**
 * 小鼓トラックをクサリごとの描画アイテムに展開する。
 * 手組がクサリをまたぐ場合、掛け声・手は位置に応じて自動的に
 * 次のクサリの枠へ振り分けられる。
 */
function buildTeItems(
  song: SongData,
  teMaster: TeMaster,
  globalStarts: number[],
): Pick<ScoreItems, "kakegoeByKusari" | "hitsByKusari" | "labelsByKusari"> {
  const kakegoeByKusari = new Map<number, TeRenderItem[]>();
  const hitsByKusari = new Map<number, TeRenderItem[]>();
  const labelsByKusari = new Map<number, TeLabel[]>();

  (song.tracks.kotsuzumi?.te_instances ?? []).forEach((ti, instanceIndex) => {
    const def = teMaster[ti.te_id];
    if (!def || !isBeatRefValid(ti.start_ref, song.kusari_sequence)) return;
    const startGlobalPos = beatRefToGlobalPos(ti.start_ref, globalStarts);

    // 手組名は、その手組が始まるクサリの枠に表示する
    pushTo(labelsByKusari, ti.start_ref.kusari_index, {
      key: `label-${instanceIndex}`,
      text: def.label,
      instrument: def.instrument,
    });

    /** 手組内の相対位置(半拍単位)を、描画先のクサリと拍単位オフセットに解決する */
    const place = (relPos: number) => {
      const ref = globalPosToBeatRef(
        startGlobalPos + relPos / 2,
        song.kusari_sequence,
        globalStarts,
      );
      if (!ref) return null;
      return {
        kusariIndex: ref.kusari_index,
        offset: slotToLocalOffset(ref.beat),
      };
    };

    def.internal_pattern.kakegoe.forEach((kg, i) => {
      const pos = place(kg.rel_pos);
      if (!pos) return;
      pushTo(kakegoeByKusari, pos.kusariIndex, {
        key: `kg-${instanceIndex}-${i}`,
        offset: pos.offset,
        instrument: def.instrument,
        text: kg.text,
      });
    });

    def.internal_pattern.hits.forEach((hit, i) => {
      const pos = place(hit.rel_pos);
      if (!pos) return;
      pushTo(hitsByKusari, pos.kusariIndex, {
        key: `hit-${instanceIndex}-${i}`,
        offset: pos.offset,
        instrument: def.instrument,
        te: hit.te,
        timing: hit.timing,
      });
    });
  });

  return { kakegoeByKusari, hitsByKusari, labelsByKusari };
}

/** 曲データ全体を、クサリごとの描画アイテムに展開する */
export function buildScoreItems(
  song: SongData,
  teMaster: TeMaster,
  globalStarts: number[],
): ScoreItems {
  return {
    utaiByKusari: buildUtaiItems(song),
    ...buildTeItems(song, teMaster, globalStarts),
  };
}
