// 曲データを「クサリごとの描画アイテム」に展開する。
// 座標は持たず、クサリ内の拍単位オフセット(0 = 1拍目の横線、-0.5 = 0拍の裏)
// までを解決する。実際のx/y座標への変換は描画側(ScoreView)が行う。
import {
  INSTRUMENTS,
  type GuideShape,
  type Instrument,
  type SongData,
  type TeMaster,
  type TeName,
  type Timing,
} from "../types";
import {
  beatCountOf,
  beatRefToGlobalPos,
  globalPosToBeatRef,
  isBeatRefValid,
  slotToLocalOffset,
  teInstanceStartRef,
} from "./position";
import { TIMING_OFFSET_RATIO } from "./timing";
import { findTe } from "./tePattern";

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

/** 手と手の間の補助線1本。描画先のクサリと位置は解決済み */
export interface GuideRenderItem {
  key: string;
  fromOffset: number;
  toOffset: number;
  shape: GuideShape;
  instrument: Instrument;
}

/** クサリ枠のヘッダー行に表示する手組名 */
export interface TeLabel {
  key: string;
  /** 表示する名前(手組マスタのlabel) */
  text: string;
  instrument: Instrument;
}

/** 1つの楽器の列に描くもの(クサリごと) */
export interface InstrumentItems {
  kakegoeByKusari: Map<number, TeRenderItem[]>;
  hitsByKusari: Map<number, TeRenderItem[]>;
  guidesByKusari: Map<number, GuideRenderItem[]>;
  labelsByKusari: Map<number, TeLabel[]>;
}

export interface ScoreItems {
  utaiByKusari: Map<number, UtaiCell[]>;
  /** 楽器ごとの列の中身 */
  byInstrument: Record<Instrument, InstrumentItems>;
}

/** 中身が空の状態 */
export function emptyInstrumentItems(): InstrumentItems {
  return {
    kakegoeByKusari: new Map(),
    hitsByKusari: new Map(),
    guidesByKusari: new Map(),
    labelsByKusari: new Map(),
  };
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
 * 1つの楽器の手組トラックを、クサリごとの描画アイテムに展開する。
 * 手組がクサリをまたぐ場合、掛け声・手は位置に応じて自動的に
 * 次のクサリの枠へ振り分けられる。
 */
function buildTeItems(
  song: SongData,
  instrument: Instrument,
  teMaster: TeMaster,
  globalStarts: number[],
): InstrumentItems {
  const { kakegoeByKusari, hitsByKusari, guidesByKusari, labelsByKusari } =
    emptyInstrumentItems();

  (song.tracks[instrument]?.te_instances ?? []).forEach((ti, instanceIndex) => {
    const def = findTe(teMaster, ti.te_id);
    if (!def || !song.kusari_sequence[ti.kusari_index]) return;
    const startRef = teInstanceStartRef(ti.kusari_index);
    const startGlobalPos = beatRefToGlobalPos(startRef, globalStarts);

    // 手組名は、その手組が始まるクサリの枠に表示する
    pushTo(labelsByKusari, ti.kusari_index, {
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

    (def.internal_pattern.guides ?? []).forEach((guide, i) => {
      const from = place(guide.from_pos);
      const to = place(guide.to_pos);
      if (!from || !to) return;
      const key = `guide-${instanceIndex}-${i}`;
      // 端のずらしは拍単位のオフセットに足しておく。こうすると
      // クサリの境目で切る処理にも、そのまま乗る
      const ends = {
        from: { ...from, offset: from.offset + timingOffset(guide.from_timing) },
        to: { ...to, offset: to.offset + timingOffset(guide.to_timing) },
      };
      for (const seg of splitAcrossKusari(ends.from, ends.to, song)) {
        pushTo(guidesByKusari, seg.kusariIndex, {
          key: `${key}-${seg.kusariIndex}`,
          fromOffset: seg.fromOffset,
          toOffset: seg.toOffset,
          shape: guide.shape,
          instrument: def.instrument,
        });
      }
    });
  });

  return { kakegoeByKusari, hitsByKusari, guidesByKusari, labelsByKusari };
}

/** 打ち方による上下のずれ。拍単位のオフセットと同じ単位で返す */
function timingOffset(timing: Timing | undefined): number {
  return TIMING_OFFSET_RATIO[timing ?? "on"];
}

/** 補助線1本分の、1つのクサリの枠に収まる区間 */
interface GuideSegment {
  kusariIndex: number;
  fromOffset: number;
  toOffset: number;
}

/** クサリ枠の一番上(0拍の裏)の拍単位オフセット */
const FRAME_TOP_OFFSET = -0.5;

/**
 * 補助線をクサリの枠ごとの区間に分ける。
 * 手組はクサリをまたぐことがあり、その場合は補助線も境目で切って
 * それぞれの枠に引く(枠をはみ出して描かないようにする)。
 */
function splitAcrossKusari(
  from: { kusariIndex: number; offset: number },
  to: { kusariIndex: number; offset: number },
  song: SongData,
): GuideSegment[] {
  if (from.kusariIndex === to.kusariIndex) {
    return [
      {
        kusariIndex: from.kusariIndex,
        fromOffset: from.offset,
        toOffset: to.offset,
      },
    ];
  }

  const segments: GuideSegment[] = [];
  // 始まりのクサリは、その最終拍まで引く
  for (let k = from.kusariIndex; k <= to.kusariIndex; k++) {
    const entry = song.kusari_sequence[k];
    if (!entry) continue;
    segments.push({
      kusariIndex: k,
      fromOffset: k === from.kusariIndex ? from.offset : FRAME_TOP_OFFSET,
      toOffset: k === to.kusariIndex ? to.offset : beatCountOf(entry.type) - 1,
    });
  }
  return segments;
}

/** 曲データ全体を、クサリごとの描画アイテムに展開する */
export function buildScoreItems(
  song: SongData,
  teMaster: Record<Instrument, TeMaster>,
  globalStarts: number[],
): ScoreItems {
  const byInstrument = {} as Record<Instrument, InstrumentItems>;
  for (const instrument of INSTRUMENTS) {
    byInstrument[instrument] = buildTeItems(
      song,
      instrument,
      teMaster[instrument],
      globalStarts,
    );
  }
  return { utaiByKusari: buildUtaiItems(song), byInstrument };
}
