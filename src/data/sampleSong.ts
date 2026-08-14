// サンプル曲データ(手付本体) — 設計ドキュメントの例をもとに拡張
// beat は半拍単位の枠番号(1 = 0拍の裏、2 = 1拍の表、3 = 1拍の裏、… 16 = 8拍の表)。
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
        { te_id: "mitsuji", start_ref: { kusari_index: 0, beat: 0 } },
        { te_id: "uchioroshi", start_ref: { kusari_index: 1, beat: 0 } },
        { te_id: "tsuzuke", start_ref: { kusari_index: 2, beat: 4 } },
        { te_id: "uchikiri", start_ref: { kusari_index: 2, beat: 12 } },
      ],
    },
    utai: {
      track_type: "utai",
      chars: [
        // beat 1 = 0拍の裏(1拍目の横線の半拍上)
        { beat_ref: { kusari_index: 0, beat: 1 }, content: { type: "text", value: "い" } },
        { beat_ref: { kusari_index: 0, beat: 3 }, content: { type: "text", value: "ろ" } },
        { beat_ref: { kusari_index: 0, beat: 4 }, content: { type: "text", value: "は" } },
        { beat_ref: { kusari_index: 0, beat: 5 }, content: { type: "text", value: "に" } },
        { beat_ref: { kusari_index: 0, beat: 7 }, content: { type: "text", value: "ほ" } },
        { beat_ref: { kusari_index: 0, beat: 8 }, content: { type: "text", value: "へ" } },
        { beat_ref: { kusari_index: 0, beat: 9 }, content: { type: "text", value: "と" } },
        { beat_ref: { kusari_index: 0, beat: 11 }, content: { type: "text", value: "ち" } },
        { beat_ref: { kusari_index: 0, beat: 12 }, content: { type: "text", value: "り" } },
        { beat_ref: { kusari_index: 0, beat: 13 }, content: { type: "text", value: "ぬ" } },
        { beat_ref: { kusari_index: 0, beat: 14 }, content: { type: "text", value: "る" } },
        { beat_ref: { kusari_index: 0, beat: 15 }, content: { type: "text", value: "を" } },
        // 本地の8拍の裏にあたる位置は、次のクサリの beat 1 として持つ
        { beat_ref: { kusari_index: 1, beat: 1 }, content: { type: "text", value: "ン" } },
        { beat_ref: { kusari_index: 2, beat: 2 }, content: { type: "text", value: "な" } },
        { beat_ref: { kusari_index: 2, beat: 3 }, content: { type: "text", value: "お" } },
        { beat_ref: { kusari_index: 2, beat: 6 }, content: { type: "text", value: "いふ" } },
      ],
    },
  },
};
