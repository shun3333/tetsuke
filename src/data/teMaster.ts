// 手組マスタ(te_master) — 楽器ごとのサンプルデータ
// 楽器ごとに別のマスタを持ち、その中は手組を並べた列として持つ。
// rel_pos は手組の起点からの相対位置を半拍単位で表す。
// 手付の上の位置は「絶対スロット = start_ref.beat + rel_pos」で決まり、
// クサリのN拍目に置いた手組では start_ref.beat = N*2 になる。
// つまり手組をN拍目に置くと rel_pos: 0 が N拍の表、rel_pos: 2k が (N+k)拍の表、
// 奇数の rel_pos はその裏。
import type { Instrument, TeMaster } from "../types";

export const kotsuzumiTeMaster: TeMaster = [
  {
    uid: "u_mitsuji",
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
  {
    uid: "u_tsuzuke",
    te_id: "tsuzuke",
    label: "ツヅケ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        { rel_pos: 5, text: "ヤ" },
        { rel_pos: 9, text: "ハ" },
        { rel_pos: 11, text: "ハ" },
      ],
      hits: [
        { rel_pos: 0, timing: "on", te: "po" },
        { rel_pos: 4, timing: "on", te: "chi" },
        { rel_pos: 6, timing: "on", te: "chi" },
        { rel_pos: 8, timing: "on", te: "po" },
        { rel_pos: 10, timing: "on", te: "po" },
        { rel_pos: 12, timing: "on", te: "po" },
      ]
    },
  },
  {
    uid: "u_uchioroshi",
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
  {
    uid: "u_uchikiri",
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
];

// 大鼓の手組マスタ。大鼓の手は チョン(chon) / ドン(don) の2種類のみ。
// 中身は動きを確認するための仮の値なので、実際の手組に合わせて直すこと。
export const otsuzumiTeMaster: TeMaster = [
  {
    uid: "u_o_mitsuji",
    te_id: "o_mitsuji",
    label: "三地",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        { rel_pos: 1, text: "ヤ" },
        { rel_pos: 5, text: "ハ" },
      ],
      hits: [
        { rel_pos: 2, timing: "on", te: "chon" },
        { rel_pos: 6, timing: "on", te: "don" },
        { rel_pos: 8, timing: "on", te: "chon" },
      ],
    },
  },
  {
    uid: "u_o_tsuzuke",
    te_id: "o_tsuzuke",
    label: "ツヅケ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        { rel_pos: 5, text: "ヤ" },
        { rel_pos: 9, text: "ハ" },
      ],
      hits: [
        { rel_pos: 0, timing: "on", te: "chon" },
        { rel_pos: 4, timing: "on", te: "don" },
        { rel_pos: 8, timing: "on", te: "don" },
        { rel_pos: 12, timing: "on", te: "chon" },
      ],
    },
  },
  {
    uid: "u_o_uchikiri",
    te_id: "o_uchikiri",
    label: "打切",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [{ rel_pos: 0, text: "イヤ" }],
      hits: [
        { rel_pos: 0, timing: "on", te: "don" },
        { rel_pos: 2, timing: "on", te: "chon" },
      ],
      guides: [{ from_pos: 0, to_pos: 2, shape: "bent" }],
    },
  },
];

/** 楽器ごとの手組マスタ */
export const TE_MASTER: Record<Instrument, TeMaster> = {
  kotsuzumi: kotsuzumiTeMaster,
  otsuzumi: otsuzumiTeMaster,
};
