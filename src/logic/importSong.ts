// JSONファイルから曲データ(手付本体)を読み込む。
//
// 外から来たデータをそのまま state に入れると、形が違ったときに
// 描画側で落ちる。ここで形を確かめてから渡す。
import {
  KUSARI_TYPES,
  type BeatRef,
  type KusariEntry,
  type KusariType,
  type SongData,
  type TeInstance,
  type UtaiChar,
  type UtaiContent,
} from "../types";

export type ImportResult =
  | { ok: true; song: SongData }
  | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readInteger(value: unknown, where: string): number {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    throw new Error(`${where} が整数ではありません`);
  }
  return value;
}

function readBeatRef(value: unknown, where: string): BeatRef {
  if (!isRecord(value)) throw new Error(`${where} がオブジェクトではありません`);
  return {
    kusari_index: readInteger(value.kusari_index, `${where}.kusari_index`),
    beat: readInteger(value.beat, `${where}.beat`),
  };
}

function readKusariSequence(value: unknown): KusariEntry[] {
  if (!Array.isArray(value)) throw new Error("kusari_sequence が配列ではありません");
  if (value.length === 0) throw new Error("kusari_sequence が空です");
  return value.map((entry, i) => {
    if (!isRecord(entry)) {
      throw new Error(`kusari_sequence[${i}] がオブジェクトではありません`);
    }
    if (!KUSARI_TYPES.includes(entry.type as KusariType)) {
      throw new Error(
        `kusari_sequence[${i}].type が不正です(${KUSARI_TYPES.join(" / ")} のいずれか)`,
      );
    }
    // indexは並び順から決まる導出値なので、ここで振り直す
    return { index: i, type: entry.type as KusariType };
  });
}

function readTeInstances(value: unknown): TeInstance[] {
  if (!Array.isArray(value)) throw new Error("te_instances が配列ではありません");
  return value.map((entry, i) => {
    if (!isRecord(entry)) {
      throw new Error(`te_instances[${i}] がオブジェクトではありません`);
    }
    if (typeof entry.te_id !== "string" || entry.te_id === "") {
      throw new Error(`te_instances[${i}].te_id が文字列ではありません`);
    }
    return {
      te_id: entry.te_id,
      start_ref: readBeatRef(entry.start_ref, `te_instances[${i}].start_ref`),
    };
  });
}

function readUtaiContent(value: unknown, where: string): UtaiContent {
  if (value === null || value === undefined) return null;
  if (!isRecord(value)) throw new Error(`${where} がオブジェクトではありません`);
  if (value.type !== "text" || typeof value.value !== "string") {
    throw new Error(`${where} の形が不正です({ type: "text", value: "..." })`);
  }
  return { type: "text", value: value.value };
}

function readUtaiChars(value: unknown): UtaiChar[] {
  if (!Array.isArray(value)) throw new Error("chars が配列ではありません");
  return value.map((entry, i) => {
    if (!isRecord(entry)) {
      throw new Error(`chars[${i}] がオブジェクトではありません`);
    }
    return {
      beat_ref: readBeatRef(entry.beat_ref, `chars[${i}].beat_ref`),
      content: readUtaiContent(entry.content, `chars[${i}].content`),
    };
  });
}

function readTracks(value: unknown): SongData["tracks"] {
  if (!isRecord(value)) throw new Error("tracks がオブジェクトではありません");

  const kotsuzumi = isRecord(value.kotsuzumi)
    ? {
        instrument: "kotsuzumi" as const,
        te_instances: readTeInstances(value.kotsuzumi.te_instances),
      }
    : undefined;

  const utai = isRecord(value.utai)
    ? {
        track_type: "utai" as const,
        chars: readUtaiChars(value.utai.chars),
      }
    : undefined;

  return { kotsuzumi, utai };
}

/**
 * JSONの文字列を曲データとして読み込む。
 * 形が合わない場合は、どこが問題かを添えて返す。
 */
export function parseSongJson(text: string): ImportResult {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: "JSONとして読めませんでした" };
  }

  try {
    if (!isRecord(raw)) throw new Error("中身がオブジェクトではありません");
    if (typeof raw.song_id !== "string" || raw.song_id === "") {
      throw new Error("song_id が文字列ではありません");
    }
    return {
      ok: true,
      song: {
        song_id: raw.song_id,
        kusari_sequence: readKusariSequence(raw.kusari_sequence),
        tracks: readTracks(raw.tracks),
      },
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
