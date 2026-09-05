// 手組マスタ(te_master) — 楽器ごとのサンプルデータ
// 楽器ごとに別のマスタを持ち、その中は手組を並べた列として持つ。
// rel_pos は手組の起点からの相対位置を半拍単位で表す。
// 手組は常にクサリの1拍目(表)を起点として置かれるため、
// rel_pos: 0 が1拍の表、rel_pos: 2k が (1+k)拍の表、奇数の rel_pos はその裏。
// 置くクサリより長い手組は、続きが自動的に次のクサリに乗る。
import type { Instrument, TeMaster } from "../types";

export const kotsuzumiTeMaster: TeMaster = [
  {
    uid: "11e1ffee-4d47-4f44-b781-81400cfff4d3",
    te_id: "mitsuji",
    label: "三地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
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
          rel_pos: 2,
          timing: "on",
          te: "po",
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
    uid: "9f62be1a-4616-48f2-89c4-2c91c6f109cb",
    te_id: "kan-mitsuji",
    label: "カン三地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
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
          rel_pos: 2,
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
    uid: "d668360c-662d-4b70-9d81-8cfbf43474ec",
    te_id: "uchidashi",
    label: "打出",
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
          rel_pos: 2,
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
    uid: "d360dd5f-e705-4cbc-8207-912ce6f43222",
    te_id: "tsukedashi",
    label: "付出",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 1,
      kakegoe: [],
      hits: [
        {
          rel_pos: 2,
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
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
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
    uid: "5edf4952-b58c-4a37-8863-ce42bbd0060a",
    te_id: "kataji",
    label: "片地",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
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
          rel_pos: 2,
          timing: "on",
          te: "po",
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
    uid: "133ee617-2c18-44c8-a94a-0cb7a3b1f3bc",
    te_id: "kan-kataji",
    label: "カン片地",
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
          rel_pos: 2,
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
    uid: "5f056c85-8f1d-483f-acff-347ab302b508",
    te_id: "tori",
    label: "トリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
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
    uid: "d1c95334-7927-4cb3-a932-551ffdd0e7c1",
    te_id: "kae-tori",
    label: "替トリ",
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
    uid: "bb378896-fd5c-43d5-97a8-94fbd1ec17ac",
    te_id: "hitotsu-tori",
    label: "一トリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
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
      length: 2,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
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
      length: 3,
      kakegoe: [
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
    },
  },
  {
    uid: "158c206f-c72c-4c1b-9e07-de3f315d6cfe",
    te_id: "kan-mitsu-tori",
    label: "カン三トリ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 3,
      kakegoe: [
        {
          rel_pos: 3,
          text: "ヤ",
        },
        {
          rel_pos: 5,
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
          te: "chi",
        },
        {
          rel_pos: 6,
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
      length: 6,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 9,
          text: "ハ",
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
          te: "po",
        },
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
    },
  },
  {
    uid: "3fd3e3a6-e8c9-4d8d-82c8-c623cc1e823e",
    te_id: "kan-tsuzuke",
    label: "カンツヅケ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 9,
          text: "ハ",
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
          te: "chi",
        },
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
    },
  },
  {
    uid: "a89d1c3a-3674-4510-85fa-3d9ec268708a",
    te_id: "kata-tsuzuke",
    label: "片ツヅケ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
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
          rel_pos: 0,
          timing: "on",
          te: "chi",
        },
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
    uid: "185b4fa8-c210-4224-9249-561b235b6a91",
    te_id: "tsuzuke-hikae",
    label: "ツヅケ扣",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 5,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "po",
        },
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
        {
          rel_pos: 10,
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
      length: 5,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "chi",
        },
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
        {
          rel_pos: 10,
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
      length: 3,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
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
          te: "chi",
        },
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
        {
          rel_pos: 6,
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
      length: 6,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 9,
          text: "ハ",
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
          te: "chi",
        },
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
          te: "po",
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
    uid: "763d235e-9331-431e-a8e1-16027b27a1e4",
    te_id: "kan-tsuzuke-nakagiri",
    label: "カンツヅケ中切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 9,
          text: "ハ",
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
          te: "chi",
        },
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
          te: "po",
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
    uid: "ecddbff1-d9bf-4ff8-9a3f-127a35c4d194",
    te_id: "kata-tsuzuke-nakagiri",
    label: "片ツヅケ中切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
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
          rel_pos: 0,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 2,
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
    uid: "d4a5b4f4-9ca4-4f68-865e-bdf3973e99ca",
    te_id: "ノベ",
    label: "ノベ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 2,
      kakegoe: [],
      hits: [
        {
          rel_pos: 0,
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
    },
  },
  {
    uid: "4c03829a-cc1a-4c19-ad31-480839ac275c",
    te_id: "uchitsume",
    label: "打ツメ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 1,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
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
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 1,
          to_pos: 2,
          shape: "bent",
        },
        {
          from_pos: 5,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
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
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
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
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 5,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
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
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
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
          rel_pos: 2,
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
    uid: "d3e27de4-4e7d-448b-96c7-37f21aa4ab31",
    te_id: "guai",
    label: "グアイ",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
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
          timing: "slightly_late",
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
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 4,
          to_pos: 6,
          shape: "straight",
          from_timing: "slightly_late",
          to_timing: "on",
        },
        {
          from_pos: 6,
          to_pos: 8,
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
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
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
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
          shape: "bent",
          from_timing: "slightly_late",
        },
        {
          from_pos: 5,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
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
      length: 6,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 5,
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
          te: "chi",
        },
        {
          rel_pos: 5,
          timing: "slightly_early",
          te: "chi",
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
          from_pos: 4,
          to_pos: 6,
          shape: "straight",
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
    uid: "4a1d5062-5269-4827-bbfb-129fe095e85e",
    te_id: "kae-kizami-otoshi",
    label: "替刻落",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 5,
          timing: "slightly_early",
          te: "chi",
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
          from_pos: 4,
          to_pos: 6,
          shape: "straight",
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
    uid: "47204cb5-a250-4695-bddd-093589ff611c",
    te_id: "kake-otoshi",
    label: "掛落",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 5,
          timing: "slightly_early",
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
          from_pos: 4,
          to_pos: 6,
          shape: "straight",
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
    uid: "0b418878-ebbf-45d1-b408-124222c90431",
    te_id: "iru-te",
    label: "入手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヤ",
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
          timing: "slightly_late",
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
          from_pos: 4,
          to_pos: 6,
          shape: "bent",
          from_timing: "slightly_late",
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
    uid: "256e9082-ec64-40a8-b6af-2f4051867dc8",
    te_id: "kae-iru-te",
    label: "替入手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヤ",
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
          timing: "slightly_late",
          te: "chi",
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
          from_pos: 4,
          to_pos: 6,
          shape: "bent",
          from_timing: "slightly_late",
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
    uid: "eee1d1c2-dfdb-470a-938b-869f4a1f8865",
    te_id: "kosu-te",
    label: "コス手",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 9,
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
          rel_pos: 6,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
          timing: "slightly_late",
          te: "chi",
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
    uid: "58508097-45f0-4112-8ef2-14be212963fd",
    te_id: "kashira-hashiri1",
    label: "頭走",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
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
          rel_pos: 8,
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
      length: 3,
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
      ],
    },
  },
  {
    uid: "6ddc0a6d-1921-498a-b6b6-0ed7a82fcf6c",
    te_id: "kusedome-hashiri1",
    label: "曲止走",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 4,
          text: "ハ ア ー",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "slightly_late",
          te: "pu",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
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
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
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
      length: 3,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 4,
          text: "ハ ア ー",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "slightly_late",
          te: "pu",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
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
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
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
      length: 13,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 4,
          text: "ハ ア ー",
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
          rel_pos: 25,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "slightly_late",
          te: "pu",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
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
          rel_pos: 16,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 22,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 26,
          timing: "on",
          te: "ta",
        },
      ],
      guides: [
        {
          from_pos: 0,
          to_pos: 2,
          shape: "bent",
          from_timing: "slightly_late",
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
    uid: "1a5927b6-bcd2-43a4-979b-e590910c7456",
    te_id: "tori-ari-kusedome",
    label: "トリ有曲止",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 17,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 4,
          text: "ハ ア ー",
        },
        {
          rel_pos: 13,
          text: "ハ",
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
          rel_pos: 0,
          timing: "slightly_late",
          te: "pu",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
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
          from_pos: 0,
          to_pos: 2,
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
    uid: "8b06d805-77e4-4ba2-90ef-eeb5fd060334",
    te_id: "kae-kusedome",
    label: "替曲止",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 13,
      kakegoe: [
        {
          rel_pos: 2,
          text: "ヤ ア ー",
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
          rel_pos: 6,
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
          te: "chi",
        },
        {
          rel_pos: 16,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 18,
          timing: "on",
          te: "chi",
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
      length: 5,
      kakegoe: [
        {
          rel_pos: 6,
          text: "ヤ ア ー",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "po",
        },
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
          rel_pos: 10,
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
      length: 2,
      kakegoe: [
        {
          rel_pos: 3,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 4,
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
          rel_pos: 0,
          timing: "on",
          te: "ta",
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
    },
  },
  {
    uid: "379435b3-8182-42f7-b988-72d3fb025eb8",
    te_id: "yukigakari-kosute-gashira",
    label: "行掛コステ頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 9,
          text: "ハ",
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
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 8,
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
      guides: [],
    },
  },
  {
    uid: "32341adb-fb6a-43e5-b468-e3d0e497a3d9",
    te_id: "itsutsu-gashira",
    label: "五頭",
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
          rel_pos: 0,
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
    uid: "43b843cc-d6a7-4e56-9485-3b3fb18d2808",
    te_id: "yukigakari-itsutsu-gashira",
    label: "行掛五頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 9,
          text: "イヤ",
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
          te: "po",
        },
        {
          rel_pos: 4,
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
      length: 4,
      kakegoe: [
        {
          rel_pos: 2,
          text: "ヤ ア ー",
        },
        {
          rel_pos: 6,
          text: "ハ ア ー",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "ta",
        },
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
      ],
    },
  },
  {
    uid: "da1c8b07-e2db-4f29-9c98-1e4475048148",
    te_id: "yukigakari-irechigai",
    label: "行掛入違",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 6,
          text: "ヤ ア ー",
        },
        {
          rel_pos: 10,
          text: "ハ ア ー",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 8,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 12,
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
      length: 6,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 10,
          text: "ハ ア ー",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "po",
        },
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
        {
          rel_pos: 12,
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
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 6,
          text: "ハ ア ー",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "chi",
        },
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
        {
          rel_pos: 8,
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
      length: 4,
      kakegoe: [
        {
          rel_pos: 6,
          text: "ハ ア ー",
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
          rel_pos: 8,
          timing: "on",
          te: "ta",
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
    uid: "f36dd767-1f62-434c-ba7d-29efd1fb7859",
    te_id: "torikaeshi",
    label: "取返",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 5,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 5,
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
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 5,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
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
      length: 5,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 5,
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
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 5,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
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
      length: 5,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 5,
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
          te: "po",
        },
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 5,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
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
      length: 4,
      kakegoe: [
        {
          rel_pos: 7,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 3,
          timing: "on",
          te: "pu",
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
          from_pos: 3,
          to_pos: 4,
          shape: "straight",
        },
        {
          from_pos: 4,
          to_pos: 6,
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
      length: 6,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ハ",
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
          te: "po",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 5,
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
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
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
      length: 6,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 9,
          text: "ハ",
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
          te: "ta",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 5,
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
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
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
      length: 6,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 9,
          text: "ハ",
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
          te: "ta",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 5,
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
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
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
      length: 5,
      kakegoe: [
        {
          rel_pos: 7,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 3,
          timing: "on",
          te: "pu",
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
        {
          rel_pos: 10,
          timing: "on",
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 3,
          to_pos: 4,
          shape: "straight",
        },
        {
          from_pos: 4,
          to_pos: 6,
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
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 5,
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
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 5,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
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
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 5,
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
          te: "po",
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
      length: 4,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 5,
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
          te: "po",
        },
      ],
      guides: [
        {
          from_pos: 5,
          to_pos: 6,
          shape: "straight",
        },
        {
          from_pos: 6,
          to_pos: 8,
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
      length: 3,
      kakegoe: [],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 3,
          timing: "on",
          te: "pu",
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
          from_pos: 3,
          to_pos: 4,
          shape: "straight",
        },
        {
          from_pos: 4,
          to_pos: 6,
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
      length: 2,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
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
          te: "ta",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
      ],
      guides: [
        {
          from_pos: 2,
          to_pos: 4,
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
      length: 7,
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
          rel_pos: 0,
          timing: "on",
          te: "ta",
        },
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
    uid: "d847a3cd-a9e6-4e63-a965-8dd085497d25",
    te_id: "kataji-kashira",
    label: "片地頭",
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
          rel_pos: 0,
          timing: "on",
          te: "ta",
        },
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
    uid: "bc582205-f5b0-4619-8f2f-d566a9bfc752",
    te_id: "nakairi-gashira",
    label: "中入頭",
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
          rel_pos: 0,
          timing: "on",
          te: "ta",
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
    },
  },
  {
    uid: "b9e2108b-8667-4cbb-a549-a52962047393",
    te_id: "futatsu-gashira",
    label: "二頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 3,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
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
          te: "ta",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 6,
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
      length: 13,
      kakegoe: [
        {
          rel_pos: 1,
          text: "イヤ",
        },
        {
          rel_pos: 5,
          text: "イヤ",
        },
        {
          rel_pos: 21,
          text: "ハ",
        },
        {
          rel_pos: 25,
          text: "イヤ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 2,
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
          rel_pos: 16,
          timing: "on",
          te: "ta",
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
    uid: "245b1831-2e94-41aa-8958-f9d424f3f8d6",
    te_id: "han-dome-gashira",
    label: "半止頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 5,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
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
          te: "ta",
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
          rel_pos: 10,
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
      length: 3,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 5,
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
          rel_pos: 6,
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
      length: 3,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 5,
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
        {
          rel_pos: 6,
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
      length: 2,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
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
    uid: "8eb29a2d-a9bf-484f-9f1c-9db4604badba",
    te_id: "tuzuke-tome",
    label: "ツヅケ止",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 5,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "po",
        },
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
      length: 5,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 0,
          timing: "on",
          te: "chi",
        },
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
      length: 3,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
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
          te: "chi",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "chi",
        },
        {
          rel_pos: 6,
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
      length: 5,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "イヤ",
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
      length: 6,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
        {
          rel_pos: 3,
          text: "ホ",
        },
        {
          rel_pos: 4,
          text: "ン",
        },
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 6,
          text: "ア",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
        {
          rel_pos: 11,
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
      ],
    },
  },
  {
    uid: "3b98b31c-c900-4696-a448-1bb7b99e5875",
    te_id: "uchikiri-utaidashi-hansei",
    label: "打切謡出半声",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 5,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
        {
          rel_pos: 3,
          text: "ホ",
        },
        {
          rel_pos: 4,
          text: "ン",
        },
        {
          rel_pos: 5,
          text: "ヤ",
        },
        {
          rel_pos: 6,
          text: "ア",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 10,
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
      length: 6,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
        {
          rel_pos: 6,
          text: "ヤ ア ー",
        },
        {
          rel_pos: 9,
          text: "ハ",
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
          te: "po",
        },
        {
          rel_pos: 8,
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
    },
  },
  {
    uid: "8a00bcb0-0fb3-46f8-b6a3-39ae6fff0b78",
    te_id: "uchikiri-utaidashi-kae-no-te2",
    label: "打切謡出替手(走ノ手)",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 6,
      kakegoe: [
        {
          rel_pos: 6,
          text: "ヤ ア ー",
        },
        {
          rel_pos: 9,
          text: "ハ",
        },
        {
          rel_pos: 11,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 1,
          timing: "slightly_late",
          te: "po",
        },
        {
          rel_pos: 2,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 8,
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
    },
  },
  {
    uid: "bbd90285-8850-4e04-a3d6-e5e3897be46d",
    te_id: "uchidashi-uchikiri",
    label: "打出打切",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 3,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
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
          te: "chi",
        },
        {
          rel_pos: 6,
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
      length: 5,
      kakegoe: [
        {
          rel_pos: 5,
          text: "ハ",
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
          te: "ta",
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
          rel_pos: 10,
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
      length: 7,
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
          rel_pos: 0,
          timing: "on",
          te: "po",
        },
        {
          rel_pos: 4,
          timing: "on",
          te: "ta",
        },
        {
          rel_pos: 8,
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
      ],
    },
  },
  {
    uid: "e66b5fed-e5b1-478e-8845-7ea37845face",
    te_id: "utai-gashira",
    label: "謡頭",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 3,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
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
          te: "chi",
        },
        {
          rel_pos: 6,
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
      length: 5,
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
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "イヤ",
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
          te: "po",
        },
        {
          rel_pos: 10,
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
      length: 5,
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
        {
          rel_pos: 5,
          text: "ハ",
        },
        {
          rel_pos: 9,
          text: "イヤ",
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
          te: "po",
        },
        {
          rel_pos: 10,
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
      length: 2,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
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
    uid: "f23c3ae1-585a-42e2-875c-fe5599957007",
    te_id: "kizami-kaeshi-hansei",
    label: "刻返半声",
    instrument: "kotsuzumi",
    internal_pattern: {
      length: 1,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ハ",
        },
      ],
      hits: [
        {
          rel_pos: 2,
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
      length: 8,
      kakegoe: [
        {
          rel_pos: 1,
          text: "ヤ",
        },
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
          rel_pos: 2,
          timing: "on",
          te: "chi",
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
