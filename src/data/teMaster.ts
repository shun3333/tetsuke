// 手組マスタ(te_master) — 小鼓のサンプルデータ
// 楽器ごとに名前空間を分ける想定だが、今回は小鼓のみのためte_idをキーにフラットに持つ。
// rel_pos は手組の頭からの相対位置を半拍単位で表す(0 = 頭の拍の表、1 = その裏、-1 = 頭の半拍前)。
import type { TeMaster } from "../types";

export const kotsuzumiTeMaster: TeMaster = {
  mitsuji: {
    te_id: "mitsuji",
    label: "三地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        { rel_pos: 1, text: "ヤ" },
        { rel_pos: 5, text: "ハ" },
        { rel_pos: 7, text: "ハ" },
      ],
      hits: [
        { rel_pos: 2, timing: "on", te: "po" },
        { rel_pos: 6, timing: "on", te: "chi" },
        { rel_pos: 8, timing: "on", te: "po" },
      ]
    },
  },
  tsuzuke: {
    te_id: "tsuzuke",
    label: "ツヅケ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        { rel_pos: 9, text: "ヤ" },
        { rel_pos: 13, text: "ハ" },
        { rel_pos: 15, text: "ハ" },
      ],
      hits: [
        { rel_pos: 4, timing: "on", te: "po" },
        { rel_pos: 8, timing: "on", te: "chi" },
        { rel_pos: 10, timing: "on", te: "chi" },
        { rel_pos: 12, timing: "on", te: "po" },
        { rel_pos: 14, timing: "on", te: "po" },
        { rel_pos: 16, timing: "on", te: "po" },
      ]
    },
  },
  uchioroshi: {
    te_id: "uchioroshi",
    label: "打下",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 5,
      kakegoe: [
        { rel_pos: 1, text: "イヤ" },
        { rel_pos: 9, text: "ハ" },
      ],
      hits: [
        { rel_pos: 0, timing: "on", te: "ta" },
        { rel_pos: 2, timing: "on", te: "ta" },
        { rel_pos: 5, timing: "on", te: "pu" },
        { rel_pos: 6, timing: "on", te: "po" },
        { rel_pos: 8, timing: "on", te: "po" },
        { rel_pos: 10, timing: "on", te: "po" },
      ],
      guides: [
        { from_pos: 5, to_pos: 6, shape: "straight" },
        { from_pos: 6, to_pos: 8, shape: "bent" },
      ],
    },
  },
  uchikiri: {
    te_id: "uchikiri",
    label: "打切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [{ rel_pos: 0, text: "イヤ" }],
      hits: [
        { rel_pos: 0, timing: "on", te: "chi" },
        { rel_pos: 2, timing: "on", te: "pu" },
      ],
      guides: [{ from_pos: 0, to_pos: 2, shape: "bent" }],
    },
  },
};
