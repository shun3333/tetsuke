// 唱歌マスタ(笛) — サンプルデータ
//
// 唱歌は1クサリ単位のまとまりで、そのまとまりを繰り返し使う。
// beat は謡と同じ半拍単位の枠番号(1始まり)で、まとまりの頭から数える。
//   1 = 0拍の裏 / 2 = 1拍の表 / 3 = 1拍の裏 / … / 16 = 8拍の表
//
// 中身は画面の動きを確かめるための仮の値なので、
// 実際の唱歌に合わせて手組マスタと同じように直すこと。
import type { ShogaMaster } from "../types";

export const SHOGA_MASTER: ShogaMaster = [
  {
    uid: "s_ohyarara",
    shoga_id: "ohyarara",
    label: "ヲヒャーラー",
    length: 8,
    chars: [
      { beat: 2, text: "ヲ" },
      { beat: 4, text: "ヒ" },
      { beat: 5, text: "ャ" },
      { beat: 6, text: "ー" },
      { beat: 8, text: "ラ" },
      { beat: 10, text: "ー" },
      { beat: 12, text: "ル" },
      { beat: 14, text: "ラ" },
      { beat: 16, text: "ー" },
    ],
  },
  {
    uid: "s_hyuiya",
    shoga_id: "hyuiya",
    label: "ヒウヤ",
    length: 8,
    chars: [
      { beat: 1, text: "ヒ" },
      { beat: 2, text: "ウ" },
      { beat: 4, text: "ヤ" },
      { beat: 6, text: "ー" },
      { beat: 9, text: "ロ" },
      { beat: 10, text: "ー" },
      { beat: 12, text: "リ" },
      { beat: 16, text: "ー" },
    ],
  },
  {
    uid: "s_tome",
    shoga_id: "s_tome",
    label: "トメ",
    length: 4,
    chars: [
      { beat: 2, text: "オ" },
      { beat: 4, text: "ヒ" },
      { beat: 5, text: "ャ" },
      { beat: 8, text: "ー" },
    ],
  },
];
