// 曲データ全体を1つのstateとして持つreducer。操作をactionとして定義し、undo/redoしやすくする。
import {
  INSTRUMENTS,
  type BeatRef,
  type Instrument,
  type KusariType,
  type SongData,
  type TeMaster,
} from "../types";
import {
  computeGlobalStarts,
  isBeatRefValid,
  teInstanceStartBeat,
  teInstanceStartRef,
  totalBeats,
} from "../logic/position";
import { findTe } from "../logic/tePattern";

// クサリが短くなると、配置済みの手組が収まらなくなることがある。
// 収まらなくなった手組を落とすために、手組の長さ(手組マスタ)を受け取る。
export type SongAction =
  | { type: "LOAD_SONG"; song: SongData }
  | { type: "INSERT_KUSARI"; atIndex: number; kusariType: KusariType }
  | { type: "REMOVE_KUSARI"; index: number; teMaster: Record<Instrument, TeMaster> }
  | {
      type: "MOVE_KUSARI";
      from: number;
      to: number;
      teMaster: Record<Instrument, TeMaster>;
    }
  | {
      type: "SET_KUSARI_TYPE";
      index: number;
      kusariType: KusariType;
      teMaster: Record<Instrument, TeMaster>;
    }
  | { type: "ADD_TE_INSTANCE"; instrument: Instrument; teId: string; kusariIndex: number }
  | { type: "REMOVE_TE_INSTANCE"; instrument: Instrument; instanceIndex: number }
  | {
      type: "SET_UTAI_CHAR";
      beatRef: BeatRef;
      value: string | null;
    };

function reindexKusari(sequence: SongData["kusari_sequence"]) {
  return sequence.map((k, i) => ({ ...k, index: i }));
}

/** クサリindexの挿入・削除に伴い、参照先を追従させる。消滅した場合はnull */
function shiftKusariIndex(
  kusariIndex: number,
  removedIndex: number | null,
  insertedAtIndex: number | null,
): number | null {
  let i = kusariIndex;
  if (removedIndex !== null) {
    if (i === removedIndex) return null; // 削除されたクサリを参照 → 消滅
    if (i > removedIndex) i -= 1;
  }
  if (insertedAtIndex !== null && i >= insertedAtIndex) {
    i += 1;
  }
  return i;
}

/** kusari_indexの付け替え規則を、beat_ref向けに包む */
function beatRefShifterFrom(
  shiftIndex: (kusariIndex: number) => number | null,
): (ref: BeatRef) => BeatRef | null {
  return (ref) => {
    const next = shiftIndex(ref.kusari_index);
    if (next === null) return null;
    return next === ref.kusari_index ? ref : { ...ref, kusari_index: next };
  };
}

export function songReducer(state: SongData, action: SongAction): SongData {
  switch (action.type) {
    case "LOAD_SONG":
      return action.song;

    case "INSERT_KUSARI": {
      const { atIndex, kusariType } = action;
      const nextSeq = reindexKusari([
        ...state.kusari_sequence.slice(0, atIndex),
        { index: 0, type: kusariType },
        ...state.kusari_sequence.slice(atIndex),
      ]);
      return remapRefs(
        { ...state, kusari_sequence: nextSeq },
        null,
        atIndex,
      );
    }

    case "REMOVE_KUSARI": {
      const { index } = action;
      if (state.kusari_sequence.length <= 1) return state;
      const nextSeq = reindexKusari(
        state.kusari_sequence.filter((_, i) => i !== index),
      );
      return dropUnfittableTe(
        remapRefs({ ...state, kusari_sequence: nextSeq }, index, null),
        action.teMaster,
      );
    }

    case "MOVE_KUSARI": {
      const { from, to } = action;
      const seq = state.kusari_sequence;
      if (from === to || !seq[from] || !seq[to]) return state;

      // 並べ替えと同じ操作を「元のindexの列」にも施し、移動先を割り出す
      const order = seq.map((_, i) => i);
      const nextSeq = [...seq];
      order.splice(to, 0, ...order.splice(from, 1));
      nextSeq.splice(to, 0, ...nextSeq.splice(from, 1));

      const movedTo = new Map(order.map((oldIndex, i) => [oldIndex, i]));
      // クサリと一緒に中身も動くよう、参照のkusari_indexを付け替える
      const moved = remapAllRefs(
        { ...state, kusari_sequence: reindexKusari(nextSeq) },
        (kusariIndex) => movedTo.get(kusariIndex) ?? null,
      );
      // 並び順が変わると曲の終わりをはみ出す手組が出ることがある
      return dropUnfittableTe(moved, action.teMaster);
    }

    case "SET_KUSARI_TYPE": {
      const nextSeq = state.kusari_sequence.map((k, i) =>
        i === action.index ? { ...k, type: action.kusariType } : k,
      );
      // 拍数が減った場合、収まらなくなった手組はここで取り除かれる
      return dropUnfittableTe(
        { ...state, kusari_sequence: nextSeq },
        action.teMaster,
      );
    }

    case "ADD_TE_INSTANCE": {
      const track = state.tracks[action.instrument] ?? {
        instrument: action.instrument,
        te_instances: [],
      };
      return {
        ...state,
        tracks: {
          ...state.tracks,
          [action.instrument]: {
            ...track,
            te_instances: [
              ...track.te_instances,
              { te_id: action.teId, kusari_index: action.kusariIndex },
            ],
          },
        },
      };
    }

    case "REMOVE_TE_INSTANCE": {
      const track = state.tracks[action.instrument];
      if (!track) return state;
      return {
        ...state,
        tracks: {
          ...state.tracks,
          [action.instrument]: {
            ...track,
            te_instances: track.te_instances.filter(
              (_, i) => i !== action.instanceIndex,
            ),
          },
        },
      };
    }

    case "SET_UTAI_CHAR": {
      const track = state.tracks.utai ?? {
        track_type: "utai" as const,
        chars: [],
      };
      const { beatRef, value } = action;
      const idx = track.chars.findIndex(
        (c) =>
          c.beat_ref.kusari_index === beatRef.kusari_index &&
          c.beat_ref.beat === beatRef.beat,
      );
      const content = value === null || value === "" ? null : { type: "text" as const, value };
      const nextChars = [...track.chars];
      if (idx >= 0) {
        nextChars[idx] = { ...nextChars[idx], content };
      } else {
        nextChars.push({ beat_ref: beatRef, content });
      }
      return {
        ...state,
        tracks: { ...state.tracks, utai: { ...track, chars: nextChars } },
      };
    }

    default:
      return state;
  }
}

/**
 * クサリが短くなった結果、収まらなくなった手組を取り除く。
 * 「開始位置がクサリの拍数を超えた」「末尾が曲の終わりをはみ出した」の2つを見る。
 */
function dropUnfittableTe(
  state: SongData,
  teMaster: Record<Instrument, TeMaster>,
): SongData {
  const globalStarts = computeGlobalStarts(state.kusari_sequence);
  const total = totalBeats(state.kusari_sequence);
  const tracks = { ...state.tracks };
  let changed = false;

  for (const instrument of INSTRUMENTS) {
    const track = tracks[instrument];
    if (!track) continue;
    const kept = track.te_instances.filter((ti) => {
      if (!state.kusari_sequence[ti.kusari_index]) return false;
      const def = findTe(teMaster[instrument], ti.te_id);
      // マスタに無い手組は長さが分からないので、判断せずそのまま残す
      if (!def) return true;
      // 配置拍が未設定になった手組は置けない
      if (def.start_beat === null) return false;
      const startRef = teInstanceStartRef(ti.kusari_index, def.start_beat);
      if (!isBeatRefValid(startRef, state.kusari_sequence)) return false;
      const start = teInstanceStartBeat(startRef, globalStarts);
      return start + def.internal_pattern.length <= total;
    });
    if (kept.length === track.te_instances.length) continue;
    tracks[instrument] = { ...track, te_instances: kept };
    changed = true;
  }

  return changed ? { ...state, tracks } : state;
}

/**
 * beat_refを持つ要素の配列を作り直す。
 * 参照が追従できたものだけを残し、消滅したものは取り除く。
 */
function shiftRefsOf<K extends string, T extends Record<K, BeatRef>>(
  items: T[],
  refKey: K,
  shift: (ref: BeatRef) => BeatRef | null,
): T[] {
  const result: T[] = [];
  for (const item of items) {
    const nextRef = shift(item[refKey]);
    if (nextRef) result.push({ ...item, [refKey]: nextRef });
  }
  return result;
}

/** クサリの挿入/削除後、各トラックのbeat_ref/kusari_indexを追従させ、消滅した参照を除去する */
function remapRefs(
  state: SongData,
  removedIndex: number | null,
  insertedAtIndex: number | null,
): SongData {
  return remapAllRefs(state, (kusariIndex) =>
    shiftKusariIndex(kusariIndex, removedIndex, insertedAtIndex),
  );
}

/**
 * 全トラックの参照を付け替える。shiftIndexは古いkusari_indexから新しい
 * kusari_indexを返す(消えた場合はnull)。utaiはbeat_ref、手組トラックは
 * kusari_indexそのものを持つため、それぞれに合わせて適用する。
 */
function remapAllRefs(
  state: SongData,
  shiftIndex: (kusariIndex: number) => number | null,
): SongData {
  const utai = state.tracks.utai;
  const tracks: SongData["tracks"] = {
    utai: utai && {
      ...utai,
      chars: shiftRefsOf(utai.chars, "beat_ref", beatRefShifterFrom(shiftIndex)),
    },
  };

  for (const instrument of INSTRUMENTS) {
    const track = state.tracks[instrument];
    if (!track) continue;
    const kept: typeof track.te_instances = [];
    for (const ti of track.te_instances) {
      const next = shiftIndex(ti.kusari_index);
      if (next !== null) {
        kept.push(next === ti.kusari_index ? ti : { ...ti, kusari_index: next });
      }
    }
    tracks[instrument] = { ...track, te_instances: kept };
  }

  return { ...state, tracks };
}
