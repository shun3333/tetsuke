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
  totalBeats,
} from "../logic/position";

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
  | { type: "ADD_TE_INSTANCE"; instrument: Instrument; teId: string; startRef: BeatRef }
  | { type: "REMOVE_TE_INSTANCE"; instrument: Instrument; instanceIndex: number }
  | {
      type: "SET_UTAI_CHAR";
      beatRef: BeatRef;
      value: string | null;
    };

function reindexKusari(sequence: SongData["kusari_sequence"]) {
  return sequence.map((k, i) => ({ ...k, index: i }));
}

/** クサリindexの挿入・削除に伴い、beat_refのkusari_indexを追従させる */
function shiftBeatRef(
  ref: BeatRef,
  removedIndex: number | null,
  insertedAtIndex: number | null,
): BeatRef | null {
  let kusariIndex = ref.kusari_index;
  if (removedIndex !== null) {
    if (kusariIndex === removedIndex) return null; // 削除されたクサリを参照 → 消滅
    if (kusariIndex > removedIndex) kusariIndex -= 1;
  }
  if (insertedAtIndex !== null && kusariIndex >= insertedAtIndex) {
    kusariIndex += 1;
  }
  return kusariIndex === ref.kusari_index
    ? ref
    : { ...ref, kusari_index: kusariIndex };
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
        (ref) => {
          const next = movedTo.get(ref.kusari_index);
          if (next === undefined) return null;
          return next === ref.kusari_index ? ref : { ...ref, kusari_index: next };
        },
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
              { te_id: action.teId, start_ref: action.startRef },
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
      if (!isBeatRefValid(ti.start_ref, state.kusari_sequence)) return false;
      const def = teMaster[instrument][ti.te_id];
      // マスタに無い手組は長さが分からないので、判断せずそのまま残す
      if (!def) return true;
      const start = teInstanceStartBeat(ti.start_ref, globalStarts);
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

/** クサリの挿入/削除後、各トラックのbeat_ref/start_refを追従させ、消滅した参照を除去する */
function remapRefs(
  state: SongData,
  removedIndex: number | null,
  insertedAtIndex: number | null,
): SongData {
  return remapAllRefs(state, (ref) =>
    shiftBeatRef(ref, removedIndex, insertedAtIndex),
  );
}

/** 全トラックの参照を付け替える。shiftがnullを返した参照は取り除く */
function remapAllRefs(
  state: SongData,
  shift: (ref: BeatRef) => BeatRef | null,
): SongData {
  const utai = state.tracks.utai;
  const tracks: SongData["tracks"] = {
    utai: utai && {
      ...utai,
      chars: shiftRefsOf(utai.chars, "beat_ref", shift),
    },
  };

  for (const instrument of INSTRUMENTS) {
    const track = state.tracks[instrument];
    if (!track) continue;
    tracks[instrument] = {
      ...track,
      te_instances: shiftRefsOf(track.te_instances, "start_ref", shift),
    };
  }

  return { ...state, tracks };
}
