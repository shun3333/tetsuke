// サンプル曲データ(手付本体) — 設計ドキュメントの例をもとに拡張
import type { SongData } from "../types";

export const sampleSong: SongData = {
  song_id: "keisei_tetsuke",
  kusari_sequence: [
    { index: 0, type: "honji" },
    { index: 1, type: "tori" },
    { index: 2, type: "honji" },
  ],
  tracks: {
    kotsuzumi: {
      instrument: "kotsuzumi",
      te_instances: [
        { te_id: "sanchi", start_ref: { kusari_index: 0, beat: 1 } },
        { te_id: "uchikudashi", start_ref: { kusari_index: 1, beat: 1 } },
        { te_id: "tsuzuke", start_ref: { kusari_index: 2, beat: 3 } },
        { te_id: "uchikiri", start_ref: { kusari_index: 2, beat: 7 } },
      ],
    },
    utai: {
      track_type: "utai",
      chars: [
        // beat 0 の裏 = 1拍目の横線の半拍上に置かれる
        { beat_ref: { kusari_index: 0, beat: 0 }, sub: "ura", content: { type: "text", value: "エ" } },
        { beat_ref: { kusari_index: 0, beat: 1 }, sub: "omote", content: { type: "text", value: "か" } },
        { beat_ref: { kusari_index: 0, beat: 1 }, sub: "ura", content: { type: "text", value: "の" } },
        { beat_ref: { kusari_index: 0, beat: 2 }, sub: "omote", content: { type: "text", value: "え" } },
        { beat_ref: { kusari_index: 0, beat: 2 }, sub: "ura", content: null },
        { beat_ref: { kusari_index: 0, beat: 3 }, sub: "omote", content: { type: "text", value: "り" } },
        { beat_ref: { kusari_index: 0, beat: 3 }, sub: "ura", content: null },
        { beat_ref: { kusari_index: 0, beat: 5 }, sub: "omote", content: { type: "text", value: "み" } },
        { beat_ref: { kusari_index: 0, beat: 5 }, sub: "ura", content: { type: "text", value: "ち" } },
        { beat_ref: { kusari_index: 0, beat: 7 }, sub: "omote", content: { type: "text", value: "も" } },
        { beat_ref: { kusari_index: 2, beat: 1 }, sub: "omote", content: { type: "text", value: "な" } },
        { beat_ref: { kusari_index: 2, beat: 1 }, sub: "ura", content: { type: "text", value: "お" } },
        { beat_ref: { kusari_index: 2, beat: 3 }, sub: "omote", content: { type: "text", value: "いふ" } },
      ],
    },
  },
};
