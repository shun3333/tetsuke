// 手組マスタ(te_master) — 小鼓のサンプルデータ
// 楽器ごとに名前空間を分ける想定だが、今回は小鼓のみのためte_idをキーにフラットに持つ。
import type { TeMaster } from "../types";

export const kotsuzumiTeMaster: TeMaster = {
  sanchi: {
    te_id: "sanchi",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        { rel_beat: 0, text: "ヤ" },
        { rel_beat: 2, text: "ホ" },
        { rel_beat: 5, text: "イヤ" },
      ],
      hits: [
        { rel_beat: 0, timing: "on" },
        { rel_beat: 4, timing: "slightly_late" },
        { rel_beat: 7, timing: "on" },
      ],
    },
  },
  uchikudashi: {
    te_id: "uchikudashi",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        { rel_beat: 0, text: "ヤ" },
        { rel_beat: 1, text: "ハ" },
      ],
      hits: [
        { rel_beat: 0, timing: "on" },
        { rel_beat: 3, timing: "slightly_late" },
      ],
    },
  },
  tsuzuke: {
    te_id: "tsuzuke",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [{ rel_beat: 0, text: "ヤ" }],
      hits: [
        { rel_beat: 0, timing: "on" },
        { rel_beat: 2, timing: "slightly_early" },
      ],
    },
  },
  uchikiri: {
    te_id: "uchikiri",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [{ rel_beat: 0, text: "イヤ" }],
      hits: [
        { rel_beat: 0, timing: "on" },
        { rel_beat: 1, timing: "on" },
      ],
    },
  },
};
