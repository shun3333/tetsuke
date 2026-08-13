// 曲データ全体を1つのstateとして持つreducer。操作をactionとして定義し、undo/redoしやすくする。
import type { BeatRef, KusariType, SongData } from "../types";

export type SongAction =
  | { type: "LOAD_SONG"; song: SongData }
  | { type: "INSERT_KUSARI"; atIndex: number; kusariType: KusariType }
  | { type: "REMOVE_KUSARI"; index: number }
  | { type: "SET_KUSARI_TYPE"; index: number; kusariType: KusariType }
  | { type: "ADD_TE_INSTANCE"; teId: string; startRef: BeatRef }
  | { type: "REMOVE_TE_INSTANCE"; instanceIndex: number }
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
      return remapRefs({ ...state, kusari_sequence: nextSeq }, index, null);
    }

    case "SET_KUSARI_TYPE": {
      const nextSeq = state.kusari_sequence.map((k, i) =>
        i === action.index ? { ...k, type: action.kusariType } : k,
      );
      return { ...state, kusari_sequence: nextSeq };
    }

    case "ADD_TE_INSTANCE": {
      const track = state.tracks.kotsuzumi ?? {
        instrument: "kotsuzumi" as const,
        te_instances: [],
      };
      return {
        ...state,
        tracks: {
          ...state.tracks,
          kotsuzumi: {
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
      const track = state.tracks.kotsuzumi;
      if (!track) return state;
      return {
        ...state,
        tracks: {
          ...state.tracks,
          kotsuzumi: {
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
  const shift = (ref: BeatRef) =>
    shiftBeatRef(ref, removedIndex, insertedAtIndex);
  const { kotsuzumi, utai } = state.tracks;

  return {
    ...state,
    tracks: {
      kotsuzumi: kotsuzumi && {
        ...kotsuzumi,
        te_instances: shiftRefsOf(kotsuzumi.te_instances, "start_ref", shift),
      },
      utai: utai && {
        ...utai,
        chars: shiftRefsOf(utai.chars, "beat_ref", shift),
      },
    },
  };
}
