// 手組マスタ(te_master) — 楽器ごとのサンプルデータ
// 楽器ごとに別のマスタを持ち、その中は手組を並べた列として持つ。
// rel_pos は手組の起点からの相対位置を半拍単位で表す。
// 手組は、置いたクサリの1拍目(表)から1拍前にずらした位置
// (= 前のクサリの最後の拍の表)を起点として置かれる。
// つまり rel_pos: 2 が1拍の表、rel_pos: 2k が k拍の表、奇数の rel_pos はその裏。
// 置くクサリより長い手組は、続きが自動的に次のクサリに乗る。
import type { Instrument, TeMaster } from "../types";

export const kotsuzumiTeMaster: TeMaster = [
  {
    uid: "11e1ffee-4d47-4f44-b781-81400cfff4d3",
    te_id: "mitsuji",
    label: "三地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "9f62be1a-4616-48f2-89c4-2c91c6f109cb",
    te_id: "kan-mitsuji",
    label: "カン三地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "d668360c-662d-4b70-9d81-8cfbf43474ec",
    te_id: "uchidashi",
    label: "打出",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ヤ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "d360dd5f-e705-4cbc-8207-912ce6f43222",
    te_id: "tsukedashi",
    label: "付出",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [],
      hits: [
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
      ],
    },
  },
  {
    uid: "f3588e72-a9a4-468a-937b-160b84378a1d",
    te_id: "hikae",
    label: "ヒカエ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
      ],
    },
  },
  {
    uid: "5edf4952-b58c-4a37-8863-ce42bbd0060a",
    te_id: "kataji",
    label: "片地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "133ee617-2c18-44c8-a94a-0cb7a3b1f3bc",
    te_id: "kan-kataji",
    label: "カン片地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "5f056c85-8f1d-483f-acff-347ab302b508",
    te_id: "tori",
    label: "トリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 7,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "d1c95334-7927-4cb3-a932-551ffdd0e7c1",
    te_id: "kae-tori",
    label: "替トリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 7,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "bb378896-fd5c-43d5-97a8-94fbd1ec17ac",
    te_id: "hitotsu-tori",
    label: "一トリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
      ],
    },
  },
  {
    uid: "3e96c0a8-e35a-4daf-a356-caf703babcd3",
    te_id: "kae-hitotsu-tori",
    label: "替一トリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
      ],
    },
  },
  {
    uid: "dcbf320a-9a84-4e81-9073-6e555dd28065",
    te_id: "mitsu-tori",
    label: "三トリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 7,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "158c206f-c72c-4c1b-9e07-de3f315d6cfe",
    te_id: "kan-mitsu-tori",
    label: "カン三トリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 7,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "f84a2d27-6699-4d9b-aac5-fafc2cc4c7d6",
    te_id: "okuri",
    label: "オクリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "dbdc03bb-e175-4f61-82eb-52fd761ec009",
    te_id: "otsu-okuri",
    label: "乙オクリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "e25768f4-aeff-441e-bf24-f9bf7b4895cd",
    te_id: "tsuzuke",
    label: "ツヅケ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "3fd3e3a6-e8c9-4d8d-82c8-c623cc1e823e",
    te_id: "kan-tsuzuke",
    label: "カンツヅケ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "a89d1c3a-3674-4510-85fa-3d9ec268708a",
    te_id: "kata-tsuzuke",
    label: "片ツヅケ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "185b4fa8-c210-4224-9249-561b235b6a91",
    te_id: "tsuzuke-hikae",
    label: "ツヅケ扣",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "659d7bdf-5d41-4ce8-8fc3-4c676cd05d73",
    te_id: "kan-tsuzuke-hikae",
    label: "カンツヅケ扣",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "fcd0a2ea-5617-4211-8b9d-e0b63e3ed5cf",
    te_id: "kata-tsuzuke-hikae",
    label: "片ツヅケ扣",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "9527e227-95bf-403d-b2c5-b218b10f8fd6",
    te_id: "tsuzuke-nakagiri",
    label: "ツヅケ中切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "763d235e-9331-431e-a8e1-16027b27a1e4",
    te_id: "kan-tsuzuke-nakagiri",
    label: "カンツヅケ中切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "ecddbff1-d9bf-4ff8-9a3f-127a35c4d194",
    te_id: "kata-tsuzuke-nakagiri",
    label: "片ツヅケ中切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "d4a5b4f4-9ca4-4f68-865e-bdf3973e99ca",
    te_id: "nobe1",
    label: "ノベ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 10,
      kakegoe: [],
      hits: [
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "4c03829a-cc1a-4c19-ad31-480839ac275c",
    te_id: "uchitsume",
    label: "打ツメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "7e010741-f51c-44a5-926b-43d35a8a63d6",
    te_id: "odori",
    label: "ヲドリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 3,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 1,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 1,
          to_pos: 2,
          shape: "straight",
        },
        {
          from_pos: 2,
          to_pos: 4,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "29ab0c40-2795-4e9b-9af9-98a159146062",
    te_id: "odor-uchitsume",
    label: "ヲドリ打ツメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 7,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 1,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 1,
          to_pos: 2,
          shape: "straight",
        },
        {
          from_pos: 2,
          to_pos: 4,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "bce222a8-fcc2-4a86-b0b6-acc64bada8b8",
    te_id: "odor-hikae",
    label: "ヲドリ扣",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [],
      hits: [
        {
          rel_pos: 1,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 1,
          to_pos: 2,
          shape: "straight",
        },
        {
          from_pos: 2,
          to_pos: 4,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "150e5f41-31e3-42cd-8952-2fe506c8d754",
    te_id: "odor-kaeshi",
    label: "ヲドリ返",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [],
      hits: [
        {
          rel_pos: 1,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 1,
          to_pos: 2,
          shape: "straight",
        },
        {
          from_pos: 2,
          to_pos: 4,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "f191906e-d980-4e98-b918-0813a17f97f6",
    te_id: "otsu-odori",
    label: "乙ヲドリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [],
      hits: [
        {
          rel_pos: 1,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 1,
          to_pos: 2,
          shape: "straight",
        },
        {
          from_pos: 2,
          to_pos: 4,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "4b96d72a-bb44-4708-b5b0-5a8393eb2527",
    te_id: "odoru-tori",
    label: "ヲドルトリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [],
      hits: [
        {
          rel_pos: 1,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 1,
          to_pos: 2,
          shape: "straight",
        },
        {
          from_pos: 2,
          to_pos: 4,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "cbdf30f8-29f9-4bf9-9e33-c1d02f736d8a",
    te_id: "itsutsu-odori",
    label: "五ヲドリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [],
      hits: [
        {
          rel_pos: 5,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 5,
          to_pos: 6,
          shape: "bent",
        },
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "1f3920e1-a818-4712-84f0-a31059c42d71",
    te_id: "odoru-te",
    label: "ヲドル手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 13,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 13,
          to_pos: 14,
          shape: "straight",
        },
        {
          from_pos: 14,
          to_pos: 16,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "2712ae1d-a0e7-4fe6-ac01-4a2b1754f242",
    te_id: "kae-odoru-te",
    label: "替ヲドル手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "ヤ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "d3e27de4-4e7d-448b-96c7-37f21aa4ab31",
    te_id: "guai",
    label: "グアイ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "slightly_late",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 12,
          to_pos: 14,
          shape: "straight",
          from_timing: "slightly_late",
          to_timing: "on",
        },
        {
          from_pos: 14,
          to_pos: 16,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "d41060a4-98af-48a6-aaea-b4ad0f998d5f",
    te_id: "itsutsu-no-te",
    label: "五ノ手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 13,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 8,
          to_pos: 10,
          shape: "bent",
          from_timing: "slightly_late",
        },
        {
          from_pos: 13,
          to_pos: 14,
          shape: "straight",
        },
        {
          from_pos: 14,
          to_pos: 16,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "2fb74377-74fb-45b1-8547-086d21dce03d",
    te_id: "kizami-otoshi",
    label: "刻落",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 10,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 13,
          timing: "slightly_early",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 12,
          to_pos: 14,
          shape: "straight",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "4a1d5062-5269-4827-bbfb-129fe095e85e",
    te_id: "kae-kizami-otoshi",
    label: "替刻落",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 10,
      kakegoe: [
        {
          rel_pos: 9,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 13,
          timing: "slightly_early",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 12,
          to_pos: 14,
          shape: "straight",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "47204cb5-a250-4695-bddd-093589ff611c",
    te_id: "kake-otoshi",
    label: "掛落",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 10,
      kakegoe: [
        {
          rel_pos: 9,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 13,
          timing: "slightly_early",
          te: "ta",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 12,
          to_pos: 14,
          shape: "straight",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "0b418878-ebbf-45d1-b408-124222c90431",
    te_id: "iru-te",
    label: "入手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 10,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "slightly_late",
          te: "ta",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
          from_timing: "slightly_late",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "256e9082-ec64-40a8-b6af-2f4051867dc8",
    te_id: "kae-iru-te",
    label: "替入手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 10,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "slightly_late",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
          from_timing: "slightly_late",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "eee1d1c2-dfdb-470a-938b-869f4a1f8865",
    te_id: "kosu-te",
    label: "コス手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 10,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "slightly_late",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
          from_timing: "slightly_late",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "58508097-45f0-4112-8ef2-14be212963fd",
    te_id: "kashira-hashiri1",
    label: "頭走",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 13,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "4a750dde-a5c7-43eb-9fb6-1de3af199374",
    te_id: "kashira-hashiri2",
    label: "頭走",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 13,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "6ddc0a6d-1921-498a-b6b6-0ed7a82fcf6c",
    te_id: "kusedome-hashiri1",
    label: "曲止走",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 12,
          text: "ハ ア ー",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "slightly_late",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 13,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 8,
          to_pos: 10,
          shape: "bent",
          from_timing: "slightly_late",
        },
      ],
    },
  },
  {
    uid: "88eeafe1-bc47-47dc-868c-02a9abb0bd18",
    te_id: "kusedome-hashiri2",
    label: "曲止走",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 12,
          text: "ハ ア ー",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "slightly_late",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 13,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 8,
          to_pos: 10,
          shape: "bent",
          from_timing: "slightly_late",
        },
      ],
    },
  },
  {
    uid: "b8686b84-0164-46b8-b8d2-0093a8472518",
    te_id: "kusedome",
    label: "曲止",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 17,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 12,
          text: "ハ ア ー",
        },
        {
          rel_pos: 25,
          text: "イヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 33,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "slightly_late",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 13,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "ta",
        },
      ],
      guides: [
        {
          from_pos: 8,
          to_pos: 10,
          shape: "bent",
          from_timing: "slightly_late",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "1a5927b6-bcd2-43a4-979b-e590910c7456",
    te_id: "tori-ari-kusedome",
    label: "トリ有曲止",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 21,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 12,
          text: "ハ ア ー",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 33,
          text: "イヤ",
        },
        {
          rel_pos: 37,
          text: "ハ",
        },
        {
          rel_pos: 41,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "slightly_late",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 13,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 38,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 42,
          timing: "on",
          te: "ta",
        },
      ],
      guides: [
        {
          from_pos: 8,
          to_pos: 10,
          shape: "bent",
          from_timing: "slightly_late",
        },
        {
          from_pos: 25,
          to_pos: 26,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "8b06d805-77e4-4ba2-90ef-eeb5fd060334",
    te_id: "kae-kusedome",
    label: "替曲止",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 17,
      kakegoe: [
        {
          rel_pos: 10,
          text: "ヤ ア ー",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 33,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "a678f808-6765-4ec9-98f0-18e301256009",
    te_id: "yotsu-no-te",
    label: "四ノ手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 10,
          text: "ヤ ア ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "541349a6-b7b1-4146-a77e-f211ade853b7",
    te_id: "hajiki",
    label: "ハジキ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
      ],
    },
  },
  {
    uid: "83e40ad6-17bb-484f-9dac-7e7425af0f02",
    te_id: "kosute-gashira",
    label: "コステ頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "379435b3-8182-42f7-b988-72d3fb025eb8",
    te_id: "yukigakari-kosute-gashira",
    label: "行掛コステ頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [],
    },
  },
  {
    uid: "32341adb-fb6a-43e5-b468-e3d0e497a3d9",
    te_id: "itsutsu-gashira",
    label: "五頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 15,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "ta",
        },
      ],
      guides: [
        {
          from_pos: 14,
          to_pos: 16,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "43b843cc-d6a7-4e56-9485-3b3fb18d2808",
    te_id: "yukigakari-itsutsu-gashira",
    label: "行掛五頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 15,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "38ad9304-40d6-412a-b1ab-bddbc888fafa",
    te_id: "irechigai",
    label: "入違",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 10,
          text: "ヤ ア ー",
        },
        {
          rel_pos: 14,
          text: "ハ ア ー",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "da1c8b07-e2db-4f29-9c98-1e4475048148",
    te_id: "yukigakari-irechigai",
    label: "行掛入違",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 10,
          text: "ヤ ア ー",
        },
        {
          rel_pos: 14,
          text: "ハ ア ー",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "7c1b7036-ac4f-433d-999e-b27feecd7db9",
    te_id: "ji-no-kashira",
    label: "地ノ頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 14,
          text: "ハ ア ー",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "f7bbfa53-f35e-452d-86a1-3773894c3931",
    te_id: "tsukete-ji-no-kashira",
    label: "付テ地ノ頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 14,
          text: "ハ ア ー",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "334f366b-ae2f-4392-ba7d-0b071f85cd12",
    te_id: "odoru-kashira",
    label: "ヲドル頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 14,
          text: "ハ ア ー",
        },
      ],
      hits: [
        {
          rel_pos: 9,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "ta",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "f36dd767-1f62-434c-ba7d-29efd1fb7859",
    te_id: "torikaeshi",
    label: "取返",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "acd445b0-1492-47f9-84fc-9b52df2d5955",
    te_id: "kashira-torikaeshi",
    label: "頭取返",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "27df650d-3860-4a31-9110-05de817a7eed",
    te_id: "uchioroshi",
    label: "打下",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "0e3089fd-7d5a-4022-b8f1-d0d9966e613b",
    te_id: "te_1",
    label: "打出打下",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "a2070e7f-c25e-4b07-bd00-dc9e9e32d45e",
    te_id: "torikaeshi-uchitsume",
    label: "取返打ツメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "eee7bc3d-e54f-46d7-b2b3-b761af748a1c",
    te_id: "kashira-torikaeshi-uchitsume",
    label: "頭取返打ツメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "ad9a554f-77d1-43f8-a88e-ea08208bf7a5",
    te_id: "uchioroshi-uchitsume",
    label: "打下打ツメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "206f7c5a-54c2-4e83-9ae6-fb64fd3d349f",
    te_id: "uchidashi-uchioroshi-uchitsume",
    label: "打出打下打ツメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "0a5ef981-02bc-4a64-ad89-be25869c1ef8",
    te_id: "torikaeshi-hikae",
    label: "取返扣",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "35ae3c0c-2531-4ee6-9f7f-b50294235076",
    te_id: "kashira-torikaeshi-hikae",
    label: "頭取返扣",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "a73f0161-199d-4691-9228-fa9cf0a50b9b",
    te_id: "uchiorosh-hikae",
    label: "打下扣",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 5,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "ad2c334c-24f8-48e7-9c01-31a134f6af32",
    te_id: "uchidashi-uchioroshi-hikae",
    label: "打出打下扣",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "7017731a-3288-4472-acec-da571813846c",
    te_id: "tatamu-kashira",
    label: "タタム頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 5,
          text: "イヤ",
        },
        {
          rel_pos: 7,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
      ],
      guides: [
        {
          from_pos: 6,
          to_pos: 8,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "86e637c1-5bf6-40cf-bfc1-38e7ad9bb259",
    te_id: "okuri-kashira",
    label: "オクリ頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 9,
      kakegoe: [
        {
          rel_pos: 9,
          text: "イヤ",
        },
        {
          rel_pos: 17,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 13,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 13,
          to_pos: 14,
          shape: "straight",
        },
        {
          from_pos: 14,
          to_pos: 16,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "d847a3cd-a9e6-4e63-a965-8dd085497d25",
    te_id: "kataji-kashira",
    label: "片地頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 13,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 13,
          to_pos: 14,
          shape: "straight",
        },
        {
          from_pos: 14,
          to_pos: 16,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "bc582205-f5b0-4619-8f2f-d566a9bfc752",
    te_id: "nakairi-gashira",
    label: "中入頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "b9e2108b-8667-4cbb-a549-a52962047393",
    te_id: "futatsu-gashira",
    label: "二頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "7f74b7d3-f322-4857-85f3-79615ff20175",
    te_id: "tome-gashira",
    label: "止頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 17,
      kakegoe: [
        {
          rel_pos: 9,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 33,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "ta",
        },
      ],
      guides: [
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "245b1831-2e94-41aa-8958-f9d424f3f8d6",
    te_id: "han-dome-gashira",
    label: "半止頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 9,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "a97035f5-2f7f-4598-a718-576c3d5b51b5",
    te_id: "tome",
    label: "トメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "865c0925-d940-4c8e-8030-7e8fb7e22e01",
    te_id: "wakinoh-tome",
    label: "脇能トメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "4a3b18a4-db8c-43b5-8f89-45d6c8c1a66c",
    te_id: "tome-sute",
    label: "トメ捨",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "8eb29a2d-a9bf-484f-9f1c-9db4604badba",
    te_id: "tuzuke-tome",
    label: "ツヅケ止",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "61fb5737-6484-4ab1-8c40-668fa8b96fa4",
    te_id: "kan-tsuduke-tome",
    label: "カンツヅケ止",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "74950f00-419f-4382-98f0-b072923ba9b4",
    te_id: "kata-tsuzuke-tome",
    label: "片ツヅケ止",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "037e1cc0-842d-432f-bc80-94fd3fb0b441",
    te_id: "ai-gashira",
    label: "合頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 1,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "cf9743e2-9f65-4ea0-b9b0-a1a735402ff6",
    te_id: "uchikiri",
    label: "打切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 9,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "ta",
        },
      ],
      guides: [],
    },
  },
  {
    uid: "c50d852c-c5e8-4c58-84bc-b6a141d67fcc",
    te_id: "uchikiri-utaidashi",
    label: "打切謡出",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 7,
          text: "ホ",
        },
        {
          rel_pos: 8,
          text: "ン",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "3b98b31c-c900-4696-a448-1bb7b99e5875",
    te_id: "uchikiri-utaidashi-hansei",
    label: "打切謡出半声",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 7,
          text: "ホ",
        },
        {
          rel_pos: 8,
          text: "ン",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
      ],
    },
  },
  {
    uid: "ca441b68-b44f-418f-af38-24a5ede5571d",
    te_id: "uchikiri-utaidashi-kae-no-te1",
    label: "打切謡出替手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 10,
          text: "ヤ ア ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "8a00bcb0-0fb3-46f8-b6a3-39ae6fff0b78",
    te_id: "uchikiri-utaidashi-kae-no-te2",
    label: "打切謡出替手(走ノ手)",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 10,
          text: "ヤ ア ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 5,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "bbd90285-8850-4e04-a3d6-e5e3897be46d",
    te_id: "uchidashi-uchikiri",
    label: "打出打切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 9,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "74c61c2d-d158-4e3b-bcc7-faf121c69641",
    te_id: "irite-uchikiri",
    label: "入テ打切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 9,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "69c439ff-0f87-4fcf-b15c-53418df4bcd0",
    te_id: "yukigakari-irite-uchikiri",
    label: "行掛入テ打切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 9,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "e66b5fed-e5b1-478e-8845-7ea37845face",
    te_id: "utai-gashira",
    label: "謡頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 9,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "62fedf63-031f-40e2-8f46-e931675dd6e5",
    te_id: "joryaku",
    label: "上畧",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 9,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 12,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "dc98e5b9-c085-423f-8696-bed96eb33697",
    te_id: "churyaku",
    label: "中畧",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 9,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 12,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "2715aa1f-c6fd-46ad-a4f9-ce8a79fff244",
    te_id: "kizami-kaeshi",
    label: "刻返",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 7,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "f23c3ae1-585a-42e2-875c-fe5599957007",
    te_id: "kizami-kaeshi-hansei",
    label: "刻返半声",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
      ],
    },
  },
  {
    uid: "75394d6c-382e-43fd-9d20-8b3fbc486c9d",
    te_id: "uchikiri-kizami-kaeshi",
    label: "打切刻返",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 23,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "ae6d1535-db06-4378-96d6-a33c104744b6",
    te_id: "nobe2",
    label: "ノべ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 22,
          text: "ア",
        },
        {
          rel_pos: 23,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "1ade23d2-3a10-4525-af7b-c626e40683ea",
    te_id: "nobe-odori",
    label: "ノべヲドリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 25,
          to_pos: 26,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "93bc13e0-1e78-4f3e-81e0-6e0ab215a921",
    te_id: "odori-kaeshi1",
    label: "ヲドリ返",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 1,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 1,
          to_pos: 2,
          shape: "straight",
        },
        {
          from_pos: 2,
          to_pos: 4,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "a57f2f9a-0d43-49f7-9d81-b8d3002d0100",
    te_id: "odori-kaeshi2",
    label: "ヲドリ返",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [],
      hits: [
        {
          rel_pos: 1,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 1,
          to_pos: 2,
          shape: "straight",
        },
        {
          from_pos: 2,
          to_pos: 4,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "6e971736-c02e-4aee-857f-88e0ff5fd633",
    te_id: "uchitsume1",
    label: "打ツメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "9dab2171-99e4-4035-8081-7e0054ed329b",
    te_id: "uchitsume2",
    label: "打ツメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 7,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "276e2eb3-493d-42a8-a96e-e2e6e3e052d2",
    te_id: "uchi-hanashi",
    label: "打放",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "f81a12ca-a0a6-4fe9-ac6a-c52d29b7d71e",
    te_id: "musubi-kake",
    label: "結カケ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "82e86ab0-65ee-43da-904b-52135ead34fb",
    te_id: "musubi-odori-futatsu",
    label: "結ヲドリ二",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
        {
          from_pos: 25,
          to_pos: 26,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "b36ac1ed-f6ec-4e0b-a12c-53017c03eb67",
    te_id: "nuki",
    label: "ヌキ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 14,
          text: "ア",
        },
        {
          rel_pos: 15,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "48183e9b-c8c6-494f-ba3d-68ab4d2d040b",
    te_id: "nuku-tori",
    label: "ヌクトリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 6,
          text: "ア",
        },
        {
          rel_pos: 7,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "7ff5ca4e-1fb2-4321-b40c-a52c5cf1f78b",
    te_id: "han-nagaji",
    label: "半長地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "4bb001c3-3b05-41e1-ae60-7a3d7fcf1cc5",
    te_id: "nagaji",
    label: "長地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 25,
          to_pos: 26,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "f3f2d61a-3aff-476d-91a8-8ed160a693c4",
    te_id: "odorazu-nagaji",
    label: "ヲドラズ長地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
        {
          from_pos: 28,
          to_pos: 30,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "492b4951-c775-4c24-b8e6-b869115cbbfc",
    te_id: "kizami",
    label: "刻",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 4,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "3c95279e-9aa2-44bf-9740-5ef54dcf78d1",
    te_id: "kizamu-nagaji",
    label: "刻ム長地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 4,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 25,
          to_pos: 26,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "958a94d9-864d-4424-b358-46f09c5c4d6e",
    te_id: "otsu-nagaji",
    label: "乙長地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 25,
          to_pos: 26,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "58a3c76e-3cb5-429f-95d4-20010b14e3ca",
    te_id: "kashira-nagaji",
    label: "頭長地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 2,
          text: "ー",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 2,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 25,
          to_pos: 26,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "33960c82-6035-40ff-853b-3c413219fe61",
    te_id: "han-mijikaji",
    label: "半短地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "d95a27b0-7f6f-489d-a96a-83ada0d36126",
    te_id: "mijikaji",
    label: "短地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 22,
          text: "ア",
        },
        {
          rel_pos: 23,
          text: "ー",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 31,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "3c037e69-e9a4-410e-82fb-dcebe960610a",
    te_id: "otsu-mijikaji",
    label: "乙短地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 22,
          text: "ア",
        },
        {
          rel_pos: 23,
          text: "ー",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 31,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "6db6bb2e-2755-49b6-82aa-dc4bada5483e",
    te_id: "nobe-nakagiri",
    label: "ノべ中切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 22,
          text: "ア",
        },
        {
          rel_pos: 23,
          text: "ー",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 31,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "056fd626-4878-483c-8852-de01376da0d7",
    te_id: "kirazu-mijikaji",
    label: "切ラズ短地j",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 22,
          text: "ア",
        },
        {
          rel_pos: 23,
          text: "ー",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "824774c8-9350-4a9c-b934-4870720028b8",
    te_id: "musubi",
    label: "結",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "570922ec-8e48-40e7-8c98-63f10ee7d958",
    te_id: "musubi-odori-hikae",
    label: "結ヲドリ扣",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "419dd417-ec1d-4c7f-ba70-410f5fd5e84c",
    te_id: "musubi-odori-mittsu",
    label: "結ヲドリ三",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 20,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 37,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 33,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 36,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 38,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
        {
          from_pos: 25,
          to_pos: 26,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
        {
          from_pos: 33,
          to_pos: 34,
          shape: "straight",
        },
        {
          from_pos: 34,
          to_pos: 36,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "f95a30e8-09d1-47ab-8644-4795e1fd1792",
    te_id: "musubu-nagaji",
    label: "結長地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 20,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 37,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 33,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 36,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 38,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
        {
          from_pos: 28,
          to_pos: 30,
          shape: "bent",
        },
        {
          from_pos: 33,
          to_pos: 34,
          shape: "straight",
        },
        {
          from_pos: 34,
          to_pos: 36,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "e8b101be-4aae-4143-954a-ad915675700b",
    te_id: "kizamu-musubu-nagaji",
    label: "刻ム結長地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 20,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 37,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 33,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 36,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 38,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 4,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
        {
          from_pos: 28,
          to_pos: 30,
          shape: "bent",
        },
        {
          from_pos: 33,
          to_pos: 34,
          shape: "straight",
        },
        {
          from_pos: 34,
          to_pos: 36,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "8f3883c6-6093-49ec-9734-eecdb0a17d64",
    te_id: "kashira-msubu-nagaji",
    label: "頭結長地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 20,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 2,
          text: "ー",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 37,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 33,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 36,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 38,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 4,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
        {
          from_pos: 28,
          to_pos: 30,
          shape: "bent",
        },
        {
          from_pos: 33,
          to_pos: 34,
          shape: "straight",
        },
        {
          from_pos: 34,
          to_pos: 36,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "b10d0072-eb81-4279-bee1-aeafd5e55bae",
    te_id: "haya-nuku-ji",
    label: "早ヌク地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 24,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 30,
          text: "ア",
        },
        {
          rel_pos: 31,
          text: "ー",
        },
        {
          rel_pos: 37,
          text: "ハ",
        },
        {
          rel_pos: 45,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 36,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 38,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 41,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 42,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 44,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 46,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 4,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
        {
          from_pos: 41,
          to_pos: 42,
          shape: "straight",
        },
        {
          from_pos: 42,
          to_pos: 44,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "09b2f538-42d7-441c-863c-88b193800458",
    te_id: "nuku-ji",
    label: "ヌク地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 32,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 30,
          text: "ア",
        },
        {
          rel_pos: 31,
          text: "ー",
        },
        {
          rel_pos: 37,
          text: "ハ",
        },
        {
          rel_pos: 41,
          text: "ヤ",
        },
        {
          rel_pos: 45,
          text: "ハ",
        },
        {
          rel_pos: 53,
          text: "ハ",
        },
        {
          rel_pos: 61,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 36,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 38,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 42,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 44,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 46,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 49,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 50,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 52,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 54,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 57,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 58,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 60,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 62,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 4,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "straight",
        },
        {
          from_pos: 42,
          to_pos: 44,
          shape: "bent",
        },
        {
          from_pos: 44,
          to_pos: 46,
          shape: "bent",
        },
        {
          from_pos: 49,
          to_pos: 50,
          shape: "straight",
        },
        {
          from_pos: 50,
          to_pos: 52,
          shape: "bent",
        },
        {
          from_pos: 57,
          to_pos: 58,
          shape: "straight",
        },
        {
          from_pos: 58,
          to_pos: 60,
          shape: "bent",
          to_timing: "on",
        },
      ],
    },
  },
  {
    uid: "c9517179-a858-4795-8065-84c9b364b450",
    te_id: "kiru-ji",
    label: "キル地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 24,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 37,
          text: "ハ",
        },
        {
          rel_pos: 45,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 33,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 36,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 38,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 41,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 42,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 44,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 46,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
        {
          from_pos: 28,
          to_pos: 30,
          shape: "bent",
        },
        {
          from_pos: 33,
          to_pos: 34,
          shape: "straight",
        },
        {
          from_pos: 34,
          to_pos: 36,
          shape: "bent",
        },
        {
          from_pos: 41,
          to_pos: 42,
          shape: "straight",
        },
        {
          from_pos: 42,
          to_pos: 44,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "eaa28050-3692-48fa-a565-8c30c9394688",
    te_id: "kasaneru-ji",
    label: "重ル地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 24,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 17,
          text: "ヤ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 37,
          text: "ハ",
        },
        {
          rel_pos: 45,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 33,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 36,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 38,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 41,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 42,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 44,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 46,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 4,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
        {
          from_pos: 20,
          to_pos: 22,
          shape: "bent",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
        {
          from_pos: 28,
          to_pos: 30,
          shape: "bent",
        },
        {
          from_pos: 33,
          to_pos: 34,
          shape: "straight",
        },
        {
          from_pos: 34,
          to_pos: 36,
          shape: "bent",
        },
        {
          from_pos: 41,
          to_pos: 42,
          shape: "straight",
        },
        {
          from_pos: 42,
          to_pos: 44,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "7c479bd4-6fe6-41dd-af7a-39984828b2da",
    te_id: "yotsu-no-te",
    label: "四ノ手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "b4a797ca-5bd6-4de7-91b6-c9f74e94e4c2",
    te_id: "otsu",
    label: "オツ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "ec79f5f1-da8b-46fb-b456-995bb00f6845",
    te_id: "nidanme-kashira",
    label: "二段メ頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "a36d0819-9c0b-4cbe-978f-4b70bc5aae09",
    te_id: "dan-gashira",
    label: "段頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 14,
          text: "ア",
        },
        {
          rel_pos: 15,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 12,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "42b32764-aac5-4058-9c7f-af3b11ab7097",
    te_id: "nanatsu-gashira",
    label: "七頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 14,
          text: "ア",
        },
        {
          rel_pos: 15,
          text: "ー",
        },
        {
          rel_pos: 21,
          text: "イヤ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 26,
          text: "ア",
        },
        {
          rel_pos: 27,
          text: "ー",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 30,
          text: "ア",
        },
        {
          rel_pos: 31,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 12,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "8d888827-4b97-4dbc-80a0-1c4f86dc0272",
    te_id: "irechigai",
    label: "入違",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 14,
          text: "ア",
        },
        {
          rel_pos: 15,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "9f6ee965-9a58-4e78-980d-c9e3b75e13cc",
    te_id: "jigashira",
    label: "地頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 21,
          text: "イヤ",
        },
        {
          rel_pos: 29,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 14,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "d09cd312-3c9f-4dd7-80f6-cb99afeaeee3",
    te_id: "hitotsu-no-jigashira",
    label: "一ツノ地頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 13,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 14,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "21e82e10-2259-4944-bfce-9ae8c69d341a",
    te_id: "te_2",
    label: "ヲドル頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [],
      hits: [],
    },
  },
  {
    uid: "0327392a-becb-4a4e-90dd-1b47bfcd208c",
    te_id: "uke",
    label: "ウケ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "efc01ff3-35c6-4fe0-b39d-3d82fd2b8358",
    te_id: "mitsu-uke",
    label: "三ウケ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 14,
          text: "ア",
        },
        {
          rel_pos: 15,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "8bb8395f-4827-4aba-a81b-a9c509701756",
    te_id: "kae-no-mitsu-uke",
    label: "替三ウケ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "d70ee313-2b0b-41dc-b694-4fe53da0bf9b",
    te_id: "uke-hashiri1",
    label: "ウケ走",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
        {
          rel_pos: 12,
          text: "ア",
        },
        {
          rel_pos: 13,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 13,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "ce108e0c-d466-42d3-b734-9e5de0d867c0",
    te_id: "uke-hashiri2",
    label: "ウケ走",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
        {
          rel_pos: 12,
          text: "ア",
        },
        {
          rel_pos: 13,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 13,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "bb170c56-d359-4f47-a254-e0fca530118e",
    te_id: "noru-uchioroshi",
    label: "ノル打下",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "f7417dd0-e8e3-4eda-9a6e-6bbbc600ecdf",
    te_id: "uchioroshi-uchitsume",
    label: "打下打ツメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "a8f83b44-c091-4b40-be76-41655a0e1166",
    te_id: "uchioroshi-odori-kaeshi1",
    label: "打下ヲドリ返",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 5,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "07e65dec-44a8-4c3d-aaf3-c55378489e7f",
    te_id: "uchioroshi-odori-kaeshi2",
    label: "打下ヲドリ返",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 5,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "bc5cdc03-ff64-4079-bbc7-2cdc2fb44aa3",
    te_id: "kae-no-uchioroshi",
    label: "替打下",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "614a6f10-f1b1-42a4-b92d-4ed60c953761",
    te_id: "taiko-uchikomi",
    label: "太コ打込",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "bent",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "fd0720c8-8078-4ddd-9277-e5563f0edf33",
    te_id: "taiko-uchikomi-uchikaeshi",
    label: "太コ打込打返",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 24,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 31,
          text: "ハ",
        },
        {
          rel_pos: 41,
          text: "ヤ",
        },
        {
          rel_pos: 42,
          text: "ア",
        },
        {
          rel_pos: 43,
          text: "ー",
        },
        {
          rel_pos: 45,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 9,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 36,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 44,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 46,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 9,
          to_pos: 10,
          shape: "bent",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "65dfade8-f6cd-46fe-8b11-4ecf4dea49bf",
    te_id: "daisho-uchikomi",
    label: "大小打込",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 20,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 26,
          text: "ア",
        },
        {
          rel_pos: 27,
          text: "ー",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 33,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "ta",
        },
      ],
      guides: [
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "40db72e2-3fda-4649-ae40-e6c9cb6e3fb6",
    te_id: "tome-no-uchikomi",
    label: "止ノ打込",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 17,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 33,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "6d53a8a3-4c14-4f52-b3dc-f1729a345479",
    te_id: "uchiage-dangashira",
    label: "打上段頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 14,
          text: "ア",
        },
        {
          rel_pos: 15,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "200f2500-cb0f-4e56-b6fc-afdbfd01eb54",
    te_id: "uchiage-aigashira",
    label: "打上合頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 11,
          text: "ヤ",
        },
        {
          rel_pos: 12,
          text: "ア",
        },
        {
          rel_pos: 13,
          text: "ー",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
        {
          rel_pos: 19,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "83f102f4-3bbc-45c6-88d3-48106be33fea",
    te_id: "uchiage-otsu-mittsu",
    label: "打上乙三",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "313d3862-2a24-44a2-b27c-62d31b89b108",
    te_id: "uchiage-otsu-mittsu-kae-no-te",
    label: "打上乙三替手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "6ed94f8e-dea5-4e03-aa1a-2b439fa85d8d",
    te_id: "uchiage-utai-gashira",
    label: "打上謡頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 23,
          text: "ホ",
        },
        {
          rel_pos: 24,
          text: "ン",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 26,
          text: "ア",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 31,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "5118678d-dc21-4a42-a8f4-ffe1a5540dbc",
    te_id: "mijikaji-sute",
    label: "短地捨",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハン",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 22,
          text: "ア",
        },
        {
          rel_pos: 23,
          text: "ー",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "884f04a7-b1c1-489e-ad2f-0a741bb5f0ef",
    te_id: "tsuzuke-sute",
    label: "ツヅケ捨",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "808a7db0-94a7-4852-a2eb-3c525233fac9",
    te_id: "kata-tsuzuke-sute",
    label: "片ツヅケ捨",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "642897b8-b4ab-489b-b05d-11ec796379a8",
    te_id: "koiai",
    label: "コイ合",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "495e8a16-fb44-4bb4-9c6d-f721f0a13e15",
    te_id: "kan-koiai",
    label: "カンコイ合",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "3f9e2312-844e-4fbb-b749-4d61f7d48414",
    te_id: "noru-uchidashi",
    label: "ノル打出",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ヤ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "8de1ad57-bcd7-4d8b-a382-7f34653c539f",
    te_id: "norikake",
    label: "ノリカケ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "0dc26c7d-9bfa-4585-bd98-a03532d777d0",
    te_id: "musubu-koi-ai",
    label: "結コイ合",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 31,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "252f1a69-2c55-4b3a-89ed-2566517f97f0",
    te_id: "musubu-odori-mittsu-koiai",
    label: "結ヲドリ三コイ合",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 24,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 41,
          text: "ヤ",
        },
        {
          rel_pos: 45,
          text: "ハ",
        },
        {
          rel_pos: 47,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 33,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 36,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 38,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 42,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 46,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 48,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
        {
          from_pos: 25,
          to_pos: 26,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
        {
          from_pos: 33,
          to_pos: 34,
          shape: "straight",
        },
        {
          from_pos: 34,
          to_pos: 36,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "84440a8d-2e3d-42f5-a1b9-1d2605c52105",
    te_id: "otsu-hashiri",
    label: "乙走",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ハ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
        {
          rel_pos: 12,
          text: "ア",
        },
        {
          rel_pos: 13,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 13,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "937efb7e-3712-4023-b1b3-754755fb403f",
    te_id: "uke-kashira",
    label: "ウケ頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 13,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "85c673e5-47cd-4ce8-9769-aac007cff184",
    te_id: "iru-kashira",
    label: "入頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 13,
          timing: "slightly_early",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 13,
          to_pos: 14,
          shape: "bent",
          from_timing: "slightly_early",
        },
      ],
    },
  },
  {
    uid: "97c14b1e-2194-497b-be63-380b4e545c30",
    te_id: "musubi-kashira-otoshi",
    label: "結頭オトシ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
        },
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
        {
          from_pos: 24,
          to_pos: 26,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "3742dc1c-aff6-4f83-85e2-16834bdbdc65",
    te_id: "musubi-han-otoshi",
    label: "結半オトシ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 14,
          to_pos: 16,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "5750217d-634c-4d4d-8b90-63441f938e92",
    te_id: "shin-no-uchikiri",
    label: "真ノ打切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "94f0bcfd-0858-4112-a8d2-0a20bc18f1e4",
    te_id: "notto-uchidashi",
    label: "ノツト打出",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 24,
      kakegoe: [
        {
          rel_pos: 4,
          text: "ツ",
        },
        {
          rel_pos: 41,
          text: "ヤ",
        },
        {
          rel_pos: 45,
          text: "ハ",
        },
        {
          rel_pos: 47,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 36,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 38,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 40,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 42,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 44,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 46,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 48,
          timing: "on",
          te: "pu",
        },
      ],
    },
  },
  {
    uid: "20caf553-75c1-4e5c-a875-f736c6f09f8d",
    te_id: "notto-uchidashi-koe-ari",
    label: "ノツト打出声有",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 4,
          text: "ツ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "pu",
        },
      ],
    },
  },
  {
    uid: "54d00008-547e-4c1b-b309-4da4f7f3b39c",
    te_id: "notto-uchiyuki",
    label: "ノツト打行",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 31,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "pu",
        },
      ],
    },
  },
  {
    uid: "4d4fc701-bef5-4f5a-b46f-7de02cdaaff6",
    te_id: "notto-uchitsume",
    label: "ノツト打ツメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "14d5cea1-4444-4f3b-976a-99b3f23a15f7",
    te_id: "notto-uchisute",
    label: "ノツト打捨",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "ddd28e58-0d47-4890-86ee-6eac998e1faf",
    te_id: "notto-yori-odori-koiai",
    label: "ノツトヨリヲドリコイ合",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 31,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "299d7e5e-a004-4c2c-b9dd-17074861ab7f",
    te_id: "notto-yori-odori-hikae",
    label: "ノツトヨリヲドリ扣",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 17,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 17,
          to_pos: 18,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "6e8cdd68-18b9-4bee-bd16-75958b6d6bf8",
    te_id: "azusa-uchidashi",
    label: "アズサ打出",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "pu",
        },
      ],
    },
  },
  {
    uid: "6a302c95-083f-46d3-8157-2b3e157fd5a1",
    te_id: "kagura-uchidashi",
    label: "カグラ打出",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "pu",
        },
      ],
    },
  },
  {
    uid: "31b2df24-a725-4c9f-ba8d-b0327714d0fe",
    te_id: "notto-yori-uchikomi",
    label: "ノツトヨリ打込",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 29,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "ta",
        },
      ],
      guides: [
        {
          from_pos: 25,
          to_pos: 26,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "c549b55b-599a-43a9-9bee-d75bf03680de",
    te_id: "te_3",
    label: "打込ヨリノツト",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 31,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "pu",
        },
      ],
    },
  },
  {
    uid: "03ca4390-6583-4260-9997-2aa1b500bd90",
    te_id: "sashi-uchidashi",
    label: "サシ打出",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "bdce54d7-6fac-40e2-a57b-7563d8edeea0",
    te_id: "sashi-uchidashi-koe-ari",
    label: "サシ打出声有",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 13,
          text: "ヤ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "618bd552-3072-4a2f-a2b3-f57897894403",
    te_id: "ヨセ",
    label: "ヨセ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 31,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 18,
          to_pos: 20,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "4fc7d700-ed77-4ef1-9976-739e14604130",
    te_id: "oki",
    label: "オキ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 13,
          text: "ハー",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "bd2b9ad0-a856-460f-b8a4-7bd94ee516d6",
    te_id: "sashi-uchikiri",
    label: "サシ打切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 9,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "ta",
        },
      ],
    },
  },
  {
    uid: "0df059a7-a62e-41e4-a9cf-ac2e027b2243",
    te_id: "tsuzuke-otoshi1",
    label: "ツヅケオトシ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "c44d5e6c-7a88-42d8-bfa9-5a0c2f8ae33c",
    te_id: "tsuzuke-otoshi2",
    label: "ツヅケオトシ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 14,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "45156a5b-0956-42df-b6cf-b697ee21c8c8",
    te_id: "han-otoshi",
    label: "半オトシ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "09aaf644-7e1e-4156-8633-9e205599c19a",
    te_id: "kuri-nagaji",
    label: "クリ長地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 31,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 25,
          to_pos: 26,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "e691abae-fb22-4953-bcd2-9fe7e1eb121c",
    te_id: "kashira-kuri-nagaji",
    label: "頭クリ長地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 9,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 31,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 25,
          to_pos: 26,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "a2083a91-d39c-4dcb-a596-66827220f934",
    te_id: "kuri-gashira",
    label: "クリ頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "straight",
        },
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "22bb6246-e548-40f2-94a2-96042b8d0420",
    te_id: "hazusu-te",
    label: "外ス手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 15,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "21327af3-0fdf-4c0b-9b77-daf06ab297dc",
    te_id: "nidan-oroshi",
    label: "二段オロシ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 13,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 4,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 13,
          to_pos: 14,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "8c33e283-0d30-414f-b046-baa66fb67bc1",
    te_id: "sandan-oroshi",
    label: "三段",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ア",
        },
        {
          rel_pos: 11,
          text: "ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 14,
          text: "ア",
        },
        {
          rel_pos: 15,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "21249935-fd60-464f-b71b-102c70b57337",
    te_id: "kashira-shodan-oroshi",
    label: "頭初段オロシ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "74dbaef8-2b0a-4869-b6c7-bb424e658bbd",
    te_id: "kan-shodan-oroshi",
    label: "カン初段オロシ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 12,
          to_pos: 14,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "b779f555-b3d8-44f0-9b84-fc2e0db0f2b4",
    te_id: "jo-no-mai-no-oroshi",
    label: "序之舞ノオロシ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 2,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "50601918-ecc6-418f-ab66-c56eb259e187",
    te_id: "gaku-no-oroshi",
    label: "楽ノオロシ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 30,
          text: "ア",
        },
        {
          rel_pos: 31,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 13,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 21,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 2,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 13,
          to_pos: 14,
          shape: "bent",
        },
        {
          from_pos: 21,
          to_pos: 22,
          shape: "bent",
        },
        {
          from_pos: 25,
          to_pos: 26,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "078714a1-ad36-4927-be0e-3abd397107ab",
    te_id: "kataji-tome",
    label: "片地トメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
      ],
    },
  },
  {
    uid: "63c03006-e227-4e5c-8cf7-f856047237e2",
    te_id: "kae-nagaji",
    label: "替長地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 29,
          text: "ハ",
        },
        {
          rel_pos: 31,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 25,
          timing: "on",
          te: "pu",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 32,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 2,
          to_pos: 10,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 25,
          to_pos: 26,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "bent",
        },
      ],
    },
  },
];

// 大鼓の手組マスタ。大鼓の手は チョン(chon) / ドン(don) の2種類のみ。
// 中身は動きを確認するための仮の値なので、実際の手組に合わせて直すこと。
export const otsuzumiTeMaster: TeMaster = [
  {
    uid: "d8a67002-4b23-4e86-81ec-94a8acbe98fa",
    te_id: "uchidashi",
    label: "打出",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
      ],
    },
  },
  {
    uid: "45af26f9-ecd8-4e7f-92bd-3261b61ed85e",
    te_id: "koiai",
    label: "コイ合",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
      ],
    },
  },
  {
    uid: "b0c9efb7-497d-4229-8160-6480df314282",
    te_id: "mu-kashira-koiai",
    label: "ム頭コイ合",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
      ],
    },
  },
  {
    uid: "40881cf9-81c2-4ad4-9ea3-82a05d3356fd",
    te_id: "tsuzuke",
    label: "ツヅケ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 6,
          text: "ハ ア  ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 6,
          to_pos: 12,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "b5852c43-b74a-40ef-824d-859a61c8c607",
    te_id: "ha-no-tsuzuke",
    label: "ハノツヅケ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 6,
          text: "ハ ア  ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 6,
          to_pos: 12,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "83f02262-91bc-4757-8bd1-230cb0a1e23f",
    te_id: "yoseru-tsuzuke",
    label: "ヨセルツヅケ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 14,
          text: "ハ ア  ",
        },
        {
          rel_pos: 17,
          text: "ヤ",
        },
        {
          rel_pos: 18,
          text: "ア",
        },
        {
          rel_pos: 19,
          text: "ー",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 27,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 14,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 12,
          to_pos: 22,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "164f4e80-03ce-47e3-b14e-5a28ef47a2ae",
    te_id: "kakeru-tsuzuke",
    label: "カケルツヅケ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "d3559e37-ed54-403a-8789-ee122727b3ca",
    te_id: "kiku",
    label: "キク",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 8,
          to_pos: 12,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "8635c363-057d-49ff-b77d-afecb1f25f20",
    te_id: "kiku-ya-tome",
    label: "キクヤ止",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
      ],
    },
  },
  {
    uid: "f550db90-201b-458b-9ef1-7b96f2b65d1f",
    te_id: "kiku-oroshi",
    label: "キクヲロシ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
          shape: "straight",
        },
        {
          from_pos: 8,
          to_pos: 12,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "a0e9a798-29ff-42f7-8e7d-c8259c14cbc6",
    te_id: "kashira-kiku-oroshi",
    label: "頭キクヲロシ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 8,
          to_pos: 12,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "1617dcc8-f9b6-404e-b073-b655d1db274d",
    te_id: "ji-no-kashira",
    label: "地ノ頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 9,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 4,
          text: "ン",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 6,
          text: "ア",
        },
        {
          rel_pos: 9,
          text: "ヨ",
        },
        {
          rel_pos: 10,
          text: "ー",
        },
        {
          rel_pos: 11,
          text: "イ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 6,
          to_pos: 10,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "80be1d43-4902-4d44-9cf5-b3c38c297df7",
    te_id: "kiku-tsuzuke",
    label: "キクツヅケ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
      ],
    },
  },
  {
    uid: "72b6b49f-5636-4128-b2a6-1b76dc4c5882",
    te_id: "kae-no-kiku-tsuzuke",
    label: "カエノキクツヅケ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "don",
        },
      ],
      guides: [
        {
          from_pos: 10,
          to_pos: 12,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "602467d1-ba21-42d8-91d4-eded7eb37ae2",
    te_id: "kizami",
    label: "刻",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 6,
          text: "ア",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 2,
          to_pos: 8,
          shape: "straight",
        },
        {
          from_pos: 8,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "b1d37692-71a7-4635-822e-99270b57325d",
    te_id: "osaeru-kizami",
    label: "押エル刻",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 6,
          text: "ア",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
          shape: "straight",
        },
        {
          from_pos: 8,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "178d1566-12a9-4bde-9fc0-e42d0a345116",
    te_id: "kashira-kizami",
    label: "頭刻",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 6,
          text: "ア",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 6,
          to_pos: 8,
          shape: "straight",
        },
        {
          from_pos: 8,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "96b9f8d7-9cc7-4059-beaa-282b79c07656",
    te_id: "kusedome",
    label: "クセ止",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
          shape: "straight",
        },
        {
          from_pos: 8,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "93c772d0-5002-45b6-80e1-cb646265c636",
    te_id: "kae-no-kusedome",
    label: "カエノクセ止",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 9,
          text: "イヤ",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "don",
        },
      ],
    },
  },
  {
    uid: "1efe77bb-b05b-4ba8-9017-7bb23bba0e10",
    te_id: "kashira-futatsu",
    label: "頭二",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 5,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
      ],
    },
  },
  {
    uid: "2d4c3fd8-a117-41c5-aea0-1192986e6221",
    te_id: "uchi-sute",
    label: "打ステ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 5,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "6d2f8999-16fb-4fe3-8574-9712d8609540",
    te_id: "uchi-kaeshi",
    label: "打返",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 9,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "chon",
        },
      ],
    },
  },
  {
    uid: "4afd9586-8f29-45f1-af34-c3a02b720db8",
    te_id: "ataru-kashira",
    label: "当ル頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 6,
          text: "ア",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 4,
          shape: "straight",
        },
        {
          from_pos: 8,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "ac2b70de-d45c-4a60-aeee-3b300a2a39c9",
    te_id: "kae-no-ataru-kashira1",
    label: "カエノ当ル頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "7b3a1710-697f-48ff-8306-1e492f734962",
    te_id: "kae-no-ataru-kashira2",
    label: "カエノ当ル頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "8a2dc515-a0ef-40d0-8bf2-d17d61e6002e",
    te_id: "kosu-kashira",
    label: "コス頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 6,
          text: "ア",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 8,
          to_pos: 12,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "eb59ae44-51e3-4ffd-8629-a5d8ae94e77c",
    te_id: "haa-kosu",
    label: "ハアコス",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 6,
          text: "ア",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 8,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
    },
  },
  {
    uid: "200c0355-5776-4e0c-bd61-9899608554d4",
    te_id: "hikae",
    label: "扣",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 6,
          text: "ア",
        },
        {
          rel_pos: 7,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
      ],
    },
  },
  {
    uid: "7eae7269-cb96-4294-b4d0-2fcb45b8d6e9",
    te_id: "tori-no-te",
    label: "トリノ手",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "bd90d5b1-f5d7-4894-b7c3-f0286cb51dd8",
    te_id: "kake-kiri",
    label: "カケ切",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "2642485b-ba2a-4cf1-a7cc-44afc453da2b",
    te_id: "tsukusu-ma",
    label: "ツクスマ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "4edf4100-8b96-4318-aa94-4710bdf0d818",
    te_id: "okuri",
    label: "ヲクリ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
      ],
    },
  },
  {
    uid: "f1c9d9e2-39e3-4320-88a7-abd29a5e7d07",
    te_id: "ya-dori",
    label: "ヤドリ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "6e02f7cf-bd4b-4c36-9246-4a033b60265b",
    te_id: "tori",
    label: "トリ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "996d0d04-9ce9-4e53-abb2-1389097a158d",
    te_id: "hitotsu-tori",
    label: "一ツトリ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
      ],
    },
  },
  {
    uid: "1b3343e9-c02c-43cb-ba86-67b47bed902d",
    te_id: "futatsu-tori",
    label: "二ツトリ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 2,
          to_pos: 4,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "3ad0e80b-df81-469a-ac86-610af3461879",
    te_id: "futatsu-tori-kae",
    label: "二ツトリカエ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
      ],
      guides: [
        {
          from_pos: 2,
          to_pos: 4,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "6a402146-78b4-4049-9cc0-47483dcc7ed7",
    te_id: "mitsu-tori",
    label: "三ツトリ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 4,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "089d62c4-2334-48eb-9fcc-53bf510b4126",
    te_id: "kae-no-tori",
    label: "カエノトリ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "912a751d-3957-47e1-8483-b9457cca69f8",
    te_id: "kashira-haa",
    label: "頭・ハア",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 6,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
      ],
    },
  },
  {
    uid: "5683c889-3a7d-42ec-98e5-e6456d168ff4",
    te_id: "kosu-tori1",
    label: "コストリ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 4,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "176be287-f758-496d-be92-534432d27189",
    te_id: "kosu-tori2",
    label: "コストリ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 4,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "ec354ca3-ffb4-4eb7-ba0a-63af6af45153",
    te_id: "tori-kashira",
    label: "トリ頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 2,
          to_pos: 4,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "19829627-60cb-4dd9-bacc-b759d91b8107",
    te_id: "tori-kashira-mitsu",
    label: "トリ頭三ツ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 9,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chon",
        },
      ],
    },
  },
  {
    uid: "13ba1a5d-63dc-484e-af72-0427ef93db26",
    te_id: "kataji",
    label: "片地",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 7,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "1d0cda67-f691-4ead-adce-3b191fccf1a4",
    te_id: "kae-no-kataji1",
    label: "カエノ片地",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 2,
          text: "ア",
        },
        {
          rel_pos: 3,
          text: "ー",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "1eef2362-bc7b-4abd-918f-58781c0b3845",
    te_id: "kae-no-kataji2",
    label: "カエノ片地",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
      ],
    },
  },
  {
    uid: "c3acec88-20e2-4c1f-95b8-d3e9264dfde6",
    te_id: "kae-no-kataji3",
    label: "カエノ片地",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
      ],
    },
  },
  {
    uid: "88c771c9-8651-4e17-bb2c-2ddffcd6cb38",
    te_id: "kae-no-kataji4",
    label: "カエノ片地",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 7,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 6,
          to_pos: 8,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "dcade60a-e1c4-4e94-ba9e-5887f4c4af63",
    te_id: "kae-no-kataji5",
    label: "カエノ片地",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 7,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 6,
          to_pos: 8,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "29df7d7a-feaa-4c0a-932b-4032b72cbb17",
    te_id: "uchikake-kashira",
    label: "打カケ頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 9,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "e364cefd-5f93-4259-84f9-9dad031917cb",
    te_id: "uchikake-tatamu",
    label: "打カケタタム",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 10,
          to_pos: 12,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "2e2fb096-5382-4c81-964a-28b796621b6d",
    te_id: "uchikake-kashira-tori-kashira",
    label: "打カケ頭トリ頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 9,
          text: "イヤ",
        },
        {
          rel_pos: 17,
          text: "ヤ",
        },
        {
          rel_pos: 19,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "c2fc88ea-7158-402a-a065-5fbed268ac3d",
    te_id: "uchikake-kae-no-tori-kashira",
    label: "打カケカエノトリ頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 12,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 17,
          text: "ヤ",
        },
        {
          rel_pos: 19,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "246fcc3e-2556-430c-9bd5-106c941260ce",
    te_id: "uchikake",
    label: "打カケ",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "8d61d3fe-f7b9-4db5-9d9d-b7058650a550",
    te_id: "uchikake-kataji-kashira",
    label: "打カケ片地",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 14,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 17,
          text: "ヤ",
        },
        {
          rel_pos: 19,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "29656bcb-d31e-40da-b311-0012d8d7be1e",
    te_id: "uchikake-ni-no-kashira",
    label: "打カケ二ノ頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 9,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "6edaa9b3-7898-40b4-8e73-ca80747b931c",
    te_id: "uchikake-go-no-kashira",
    label: "打カケ五ノ頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 17,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
        {
          rel_pos: 21,
          text: "ヨ",
        },
        {
          rel_pos: 22,
          text: "ー",
        },
        {
          rel_pos: 23,
          text: "イ",
        },
        {
          rel_pos: 29,
          text: "イヤ",
        },
        {
          rel_pos: 33,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "e5531250-de95-4434-a10e-6d8edc529b35",
    te_id: "uchikake-osaeru-kashira",
    label: "打カケ押エル頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 17,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 17,
          text: "ヤ",
        },
        {
          rel_pos: 19,
          text: "ア",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 22,
          text: "ア",
        },
        {
          rel_pos: 29,
          text: "イヤ",
        },
        {
          rel_pos: 33,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "95288994-3dea-4720-bb75-7d94ae48d467",
    te_id: "uchikake-tatamu-kashira",
    label: "打カケタタム頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 13,
          text: "ヤ",
        },
        {
          rel_pos: 17,
          text: "ヤ",
        },
        {
          rel_pos: 19,
          text: "ア",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 22,
          text: "ア",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 27,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 20,
          shape: "straight",
        },
        {
          from_pos: 26,
          to_pos: 28,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "10249bc0-167a-46bb-9d69-084286d56d09",
    te_id: "uchikake-uchiorosu-kashira",
    label: "打カケ打下ス頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 13,
          text: "ヤ",
        },
        {
          rel_pos: 17,
          text: "ヤ",
        },
        {
          rel_pos: 19,
          text: "ア",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 22,
          text: "ア",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 27,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 18,
          to_pos: 24,
          shape: "straight",
        },
        {
          from_pos: 24,
          to_pos: 28,
          shape: "bent",
        },
      ],
    },
  },
  {
    uid: "5889dd9f-b4a7-408e-b883-4fd536410a38",
    te_id: "uchikake-nuku-kashira",
    label: "打カケヌク頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 17,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 13,
          text: "イヤ",
        },
        {
          rel_pos: 17,
          text: "ヤ",
        },
        {
          rel_pos: 18,
          text: "ア",
        },
        {
          rel_pos: 19,
          text: "ー",
        },
        {
          rel_pos: 29,
          text: "イヤ",
        },
        {
          rel_pos: 33,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "f9f86f02-3f69-4783-ba24-b100bb611910",
    te_id: "uchikake-iru-kashira",
    label: "打カケ入ル頭",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 17,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 9,
          text: "ヤ",
        },
        {
          rel_pos: 11,
          text: "ア",
        },
        {
          rel_pos: 17,
          text: "イヤ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 22,
          text: "ア",
        },
        {
          rel_pos: 29,
          text: "イヤ",
        },
        {
          rel_pos: 33,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 12,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 30,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 34,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 8,
          shape: "straight",
        },
        {
          from_pos: 8,
          to_pos: 12,
          shape: "bent",
        },
        {
          from_pos: 24,
          to_pos: 26,
          shape: "straight",
        },
      ],
    },
  },
  {
    uid: "6693c0d5-dcd9-4f3c-b42a-a053a9ec530a",
    te_id: "uchikake-kashira-sandanme",
    label: "打カケ頭三段目",
    instrument: "otsuzumi",
    internal_pattern: {
      length: 16,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 3,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヨ",
        },
        {
          rel_pos: 6,
          text: "ー",
        },
        {
          rel_pos: 7,
          text: "イ",
        },
        {
          rel_pos: 9,
          text: "イヤ",
        },
        {
          rel_pos: 13,
          text: "ハ",
        },
        {
          rel_pos: 14,
          text: "ア",
        },
        {
          rel_pos: 17,
          text: "ヤ",
        },
        {
          rel_pos: 19,
          text: "ア",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 22,
          text: "ア",
        },
        {
          rel_pos: 25,
          text: "ヤ",
        },
        {
          rel_pos: 27,
          text: "ア",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 6,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 14,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 20,
          timing: "on",
          te: "chon",
        },
        {
          rel_pos: 24,
          timing: "on",
          te: "don",
        },
        {
          rel_pos: 28,
          timing: "on",
          te: "chon",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 14,
          to_pos: 16,
          shape: "straight",
        },
        {
          from_pos: 16,
          to_pos: 20,
          shape: "bent",
        },
        {
          from_pos: 24,
          to_pos: 28,
          shape: "bent",
        },
      ],
    },
  },
];

/** 楽器ごとの手組マスタ */
export const TE_MASTER: Record<Instrument, TeMaster> = {
  kotsuzumi: kotsuzumiTeMaster,
  otsuzumi: otsuzumiTeMaster,
};
