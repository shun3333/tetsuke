// JSONファイルから曲データ(手付本体)を読み込む。
//
// 外から来たデータをそのまま state に入れると、形が違ったときに
// 描画側で落ちる。ここで形を確かめてから渡す。
import {
  INSTRUMENTS,
  KUSARI_TYPES,
  type BeatRef,
  type Instrument,
  type KusariEntry,
  type KusariType,
  type SongData,
  type TeInstance,
  type UtaiChar,
  type UtaiContent,
} from "../types";
import {
  isRecord,
  parseJson,
  readArray,
  readInteger,
  readString,
  type ParseResult,
} from "./jsonRead";

export type ImportResult = ParseResult<SongData>;

function readBeatRef(value: unknown, where: string): BeatRef {
  if (!isRecord(value)) throw new Error(`${where} がオブジェクトではありません`);
  return {
    kusari_index: readInteger(value.kusari_index, `${where}.kusari_index`),
    beat: readInteger(value.beat, `${where}.beat`),
  };
}

function readKusariSequence(value: unknown): KusariEntry[] {
  const list = readArray(value, "kusari_sequence");
  if (list.length === 0) throw new Error("kusari_sequence が空です");
  return list.map((entry, i) => {
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

function readTeInstances(value: unknown, where: Instrument): TeInstance[] {
  return readArray(value, `${where}.te_instances`).map((entry, i) => {
    const at = `${where}.te_instances[${i}]`;
    if (!isRecord(entry)) throw new Error(`${at} がオブジェクトではありません`);
    return {
      te_id: readString(entry.te_id, `${at}.te_id`),
      start_ref: readBeatRef(entry.start_ref, `${at}.start_ref`),
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
  return readArray(value, "chars").map((entry, i) => {
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

  const tracks: SongData["tracks"] = {
    utai: isRecord(value.utai)
      ? { track_type: "utai", chars: readUtaiChars(value.utai.chars) }
      : undefined,
  };

  // 楽器のトラックは、あるものだけ読む
  for (const instrument of INSTRUMENTS) {
    const track: unknown = value[instrument];
    if (!isRecord(track)) continue;
    tracks[instrument] = {
      instrument,
      te_instances: readTeInstances(track.te_instances, instrument),
    };
  }
  return tracks;
}

/**
 * JSONの文字列を曲データとして読み込む。
 * 形が合わない場合は、どこが問題かを添えて返す。
 */
export function parseSongJson(text: string): ImportResult {
  return parseJson(text, (raw) => {
    if (!isRecord(raw)) throw new Error("中身がオブジェクトではありません");
    return {
      song_id: readString(raw.song_id, "song_id"),
      kusari_sequence: readKusariSequence(raw.kusari_sequence),
      tracks: readTracks(raw.tracks),
    };
  });
}
