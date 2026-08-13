// 手組マスタ(te_master) — 小鼓のサンプルデータ
// 楽器ごとに名前空間を分ける想定だが、今回は小鼓のみのためte_idをキーにフラットに持つ。
// rel_pos は手組の頭からの相対位置を半拍単位で表す(0 = 頭の拍の表、1 = その裏、-1 = 頭の半拍前)。
import type { TeMaster } from "../types";

export const kotsuzumiTeMaster: TeMaster = {
  sanchi: {
    te_id: "sanchi",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        // 手組の頭より前(半拍前)に置く掛け声。1拍目の線の上に出る
        { rel_pos: -1, text: "イヤ" },
        { rel_pos: 0, text: "ヤ" },
        { rel_pos: 4, text: "ホ" },
        { rel_pos: 11, text: "イヤ" },
      ],
      hits: [
        { rel_pos: 0, timing: "on", te: "chi" },
        { rel_pos: 8, timing: "slightly_late", te: "po" },
        { rel_pos: 14, timing: "on", te: "ta" },
      ],
    },
  },
  uchikudashi: {
    te_id: "uchikudashi",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        { rel_pos: 0, text: "ヤ" },
        { rel_pos: 2, text: "ハ" },
      ],
      hits: [
        { rel_pos: 0, timing: "on", te: "chi" },
        // 4拍目の裏。トリに置くと次のクサリの1拍目の半拍前に出る
        { rel_pos: 7, timing: "on", te: "po" },
      ],
    },
  },
  tsuzuke: {
    te_id: "tsuzuke",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [{ rel_pos: 0, text: "ヤ" }],
      hits: [
        { rel_pos: 0, timing: "on", te: "ta" },
        { rel_pos: 4, timing: "slightly_early", te: "pu" },
      ],
    },
  },
  uchikiri: {
    te_id: "uchikiri",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [{ rel_pos: 0, text: "イヤ" }],
      hits: [
        { rel_pos: 0, timing: "on", te: "chi" },
        { rel_pos: 2, timing: "on", te: "pu" },
      ],
    },
  },
};
