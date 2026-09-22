// 曲データ全体を1つのstateとして持つreducer。操作をactionとして定義し、undo/redoしやすくする。
import {
  INSTRUMENTS,
  type BeatRef,
  type Instrument,
  type KusariType,
  type Masters,
  type SongData,
  type TextTrackKind,
} from "../types";
import {
  computeGlobalStarts,
  shogaInstanceStartGlobalPos,
  teInstanceStartGlobalPos,
  totalBeats,
} from "../logic/position";
import { findTe } from "../logic/tePattern";
import { findShoga } from "../logic/shogaChar";

// クサリが短くなると、配置済みの手組・唱歌が収まらなくなることがある。
// 収まらなくなったものを落とすために、長さの分かるマスタ一式を受け取る。
export type SongAction =
  | { type: "LOAD_SONG"; song: SongData }
  /** count を省くと1つだけ足す */
  | {
      type: "INSERT_KUSARI";
      atIndex: number;
      kusariType: KusariType;
      count?: number;
    }
  | { type: "REMOVE_KUSARI"; index: number; masters: Masters }
  | { type: "MOVE_KUSARI"; from: number; to: number; masters: Masters }
  | {
      type: "SET_KUSARI_TYPE";
      index: number;
      kusariType: KusariType;
      masters: Masters;
    }
  | { type: "ADD_TE_INSTANCE"; instrument: Instrument; teId: string; kusariIndex: number }
  | { type: "REMOVE_TE_INSTANCE"; instrument: Instrument; instanceIndex: number }
  | { type: "ADD_SHOGA_INSTANCE"; shogaId: string; kusariIndex: number }
  | { type: "REMOVE_SHOGA_INSTANCE"; instanceIndex: number }
  | { type: "SET_TEXT_TRACK"; textTrack: TextTrackKind }
  | { type: "SET_TITLE"; title: string }
  | { type: "ADD_MEMO"; beforeKusari: number }
  | { type: "SET_MEMO"; index: number; text: string }
  | { type: "REMOVE_MEMO"; index: number }
  | {
      type: "SET_UTAI_CHAR";
      beatRef: BeatRef;
      value: string | null;
    };

/** まとめて足せるクサリの数の上限。打ち間違いで極端に増えないようにする */
export const KUSARI_INSERT_MAX = 64;

/** まとめて足す数を、扱える範囲に収める */
function clampInsertCount(count: number | undefined): number {
  if (count === undefined || !Number.isFinite(count)) return 1;
  return Math.min(KUSARI_INSERT_MAX, Math.max(1, Math.floor(count)));
}

function reindexKusari(sequence: SongData["kusari_sequence"]) {
  return sequence.map((k, i) => ({ ...k, index: i }));
}

/** クサリindexの挿入・削除に伴い、参照先を追従させる。消滅した場合はnull */
function shiftKusariIndex(
  kusariIndex: number,
  removedIndex: number | null,
  insertedAtIndex: number | null,
  insertedCount: number,
): number | null {
  let i = kusariIndex;
  if (removedIndex !== null) {
    if (i === removedIndex) return null; // 削除されたクサリを参照 → 消滅
    if (i > removedIndex) i -= 1;
  }
  if (insertedAtIndex !== null && i >= insertedAtIndex) {
    i += insertedCount;
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
      const count = clampInsertCount(action.count);
      const added = Array.from({ length: count }, () => ({
        index: 0,
        type: kusariType,
      }));
      const nextSeq = reindexKusari([
        ...state.kusari_sequence.slice(0, atIndex),
        ...added,
        ...state.kusari_sequence.slice(atIndex),
      ]);
      return remapRefs({ ...state, kusari_sequence: nextSeq }, null, atIndex, count);
    }

    case "REMOVE_KUSARI": {
      const { index } = action;
      if (state.kusari_sequence.length <= 1) return state;
      const nextSeq = reindexKusari(
        state.kusari_sequence.filter((_, i) => i !== index),
      );
      return dropUnfittable(
        remapRefs({ ...state, kusari_sequence: nextSeq }, index, null),
        action.masters,
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
      // 並び順が変わると曲の終わりをはみ出す手組・唱歌が出ることがある。
      // メモはクサリに紐づかないので、位置はそのままにしておく
      return dropUnfittable(clampMemos(moved), action.masters);
    }

    case "SET_KUSARI_TYPE": {
      const nextSeq = state.kusari_sequence.map((k, i) =>
        i === action.index ? { ...k, type: action.kusariType } : k,
      );
      // 拍数が減った場合、収まらなくなった手組・唱歌はここで取り除かれる
      return dropUnfittable(
        { ...state, kusari_sequence: nextSeq },
        action.masters,
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

    case "ADD_SHOGA_INSTANCE": {
      const track = state.tracks.shoga ?? {
        track_type: "shoga" as const,
        instances: [],
      };
      return {
        ...state,
        tracks: {
          ...state.tracks,
          shoga: {
            ...track,
            instances: [
              ...track.instances,
              { shoga_id: action.shogaId, kusari_index: action.kusariIndex },
            ],
          },
        },
      };
    }

    case "REMOVE_SHOGA_INSTANCE": {
      const track = state.tracks.shoga;
      if (!track) return state;
      return {
        ...state,
        tracks: {
          ...state.tracks,
          shoga: {
            ...track,
            instances: track.instances.filter(
              (_, i) => i !== action.instanceIndex,
            ),
          },
        },
      };
    }

    case "SET_TITLE":
      return { ...state, title: action.title };

    case "ADD_MEMO":
      return {
        ...state,
        memos: [
          ...(state.memos ?? []),
          { before_kusari: action.beforeKusari, text: "" },
        ],
      };

    case "SET_MEMO":
      return {
        ...state,
        memos: (state.memos ?? []).map((m, i) =>
          i === action.index ? { ...m, text: action.text } : m,
        ),
      };

    case "REMOVE_MEMO":
      return {
        ...state,
        memos: (state.memos ?? []).filter((_, i) => i !== action.index),
      };

    case "SET_TEXT_TRACK":
      // 書かないほうの中身は消さずに残す(戻したときにそのまま使える)
      return { ...state, text_track: action.textTrack };

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
 * クサリが短くなった結果、収まらなくなった手組・唱歌を取り除く。
 * 「開始位置がクサリの拍数を超えた」「末尾が曲の終わりをはみ出した」の2つを見る。
 */
function dropUnfittable(state: SongData, masters: Masters): SongData {
  const globalStarts = computeGlobalStarts(state.kusari_sequence);
  const total = totalBeats(state.kusari_sequence);
  const tracks = { ...state.tracks };
  let changed = false;

  for (const instrument of INSTRUMENTS) {
    const track = tracks[instrument];
    if (!track) continue;
    const kept = track.te_instances.filter((ti) => {
      if (!state.kusari_sequence[ti.kusari_index]) return false;
      const def = findTe(masters.te[instrument], ti.te_id);
      // マスタに無い手組は長さが分からないので、判断せずそのまま残す
      if (!def) return true;
      const start = teInstanceStartGlobalPos(ti.kusari_index, globalStarts);
      return start + def.internal_pattern.length <= total;
    });
    if (kept.length === track.te_instances.length) continue;
    tracks[instrument] = { ...track, te_instances: kept };
    changed = true;
  }

  const shoga = tracks.shoga;
  if (shoga) {
    const kept = shoga.instances.filter((si) => {
      if (!state.kusari_sequence[si.kusari_index]) return false;
      const def = findShoga(masters.shoga, si.shoga_id);
      if (!def) return true;
      const start = shogaInstanceStartGlobalPos(si.kusari_index, globalStarts);
      return start + def.length <= total;
    });
    if (kept.length !== shoga.instances.length) {
      tracks.shoga = { ...shoga, instances: kept };
      changed = true;
    }
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
  insertedCount = 1,
): SongData {
  const shifted = remapAllRefs(state, (kusariIndex) =>
    shiftKusariIndex(kusariIndex, removedIndex, insertedAtIndex, insertedCount),
  );
  return clampMemos(
    shiftMemos(shifted, removedIndex, insertedAtIndex, insertedCount),
  );
}

/**
 * クサリの挿入・削除に合わせて、メモの入る位置を動かす。
 * メモは手前のクサリにくっついていると考えるので、挿し込んだ位置と
 * 同じところにあるメモは、挿し込んだクサリの手前に残す。
 */
function shiftMemos(
  state: SongData,
  removedIndex: number | null,
  insertedAtIndex: number | null,
  insertedCount: number,
): SongData {
  if (!state.memos?.length) return state;
  return {
    ...state,
    memos: state.memos.map((m) => {
      let pos = m.before_kusari;
      if (removedIndex !== null && pos > removedIndex) pos -= 1;
      if (insertedAtIndex !== null && pos > insertedAtIndex) pos += insertedCount;
      return pos === m.before_kusari ? m : { ...m, before_kusari: pos };
    }),
  };
}

/**
 * メモの位置を、クサリの数に収める。
 * 並べ替えのようにクサリの対応が付けられない操作の後に通す。
 */
function clampMemos(state: SongData): SongData {
  if (!state.memos?.length) return state;
  const max = state.kusari_sequence.length;
  let changed = false;
  const memos = state.memos.map((m) => {
    const pos = Math.min(max, Math.max(0, m.before_kusari));
    if (pos === m.before_kusari) return m;
    changed = true;
    return { ...m, before_kusari: pos };
  });
  return changed ? { ...state, memos } : state;
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
  const shoga = state.tracks.shoga;
  const tracks: SongData["tracks"] = {
    utai: utai && {
      ...utai,
      chars: shiftRefsOf(utai.chars, "beat_ref", beatRefShifterFrom(shiftIndex)),
    },
  };

  // 唱歌は手組と同じく、クサリそのものを指している
  if (shoga) {
    const kept: typeof shoga.instances = [];
    for (const si of shoga.instances) {
      const next = shiftIndex(si.kusari_index);
      if (next !== null) {
        kept.push(next === si.kusari_index ? si : { ...si, kusari_index: next });
      }
    }
    tracks.shoga = { ...shoga, instances: kept };
  }

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
