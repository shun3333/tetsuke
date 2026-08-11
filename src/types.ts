// 能楽 手付アプリ データモデル型定義
// 設計ドキュメント(nogakutetsukedesign.md)に基づく

/** クサリ(拍子の単位)の種類。拍数はtypeから一意に決まる。 */
export type KusariType = "honji" | "okuri" | "tori" | "kataji";

/** 拍子タイプごとの拍数(コード側の固定値、曲データには持たない) */
export const KUSARI_BEAT_COUNT: Record<KusariType, number> = {
  honji: 8,
  okuri: 2,
  tori: 4,
  kataji: 6,
};

/** クサリ種別の表示名 */
export const KUSARI_LABEL: Record<KusariType, string> = {
  honji: "本地",
  okuri: "オクリ",
  tori: "トリ",
  kataji: "片地",
};

export const KUSARI_TYPES: KusariType[] = ["honji", "okuri", "tori", "kataji"];

/** クサリ列の1エントリ */
export interface KusariEntry {
  index: number;
  type: KusariType;
}

/** hitsの微妙なタイミングを表す質的タグ */
export type Timing = "on" | "slightly_early" | "slightly_late";

export const TIMING_LABEL: Record<Timing, string> = {
  on: "オン",
  slightly_early: "やや早め",
  slightly_late: "やや遅め",
};

/** 手組内の掛け声1つ */
export interface KakegoeEntry {
  rel_beat: number;
  text: string;
}

/** 手組内の手(打つタイミング)1つ */
export interface HitEntry {
  rel_beat: number;
  timing: Timing;
}

/** 手組の内部パターン(掛け声・手・長さ) */
export interface InternalPattern {
  length: number;
  kakegoe: KakegoeEntry[];
  hits: HitEntry[];
}

/** 対応楽器(今回は小鼓のみ) */
export type Instrument = "kotsuzumi";

/** 手組マスタの1エントリ */
export interface TeMasterEntry {
  te_id: string;
  instrument: Instrument;
  internal_pattern: InternalPattern;
}

/** 楽器ごとの手組辞書(te_id -> 定義) */
export type TeMaster = Record<string, TeMasterEntry>;

/** クサリ内の位置を指す参照(1-indexed beat) */
export interface BeatRef {
  kusari_index: number;
  beat: number;
}

/** 曲データ内に配置された手組の1インスタンス */
export interface TeInstance {
  te_id: string;
  start_ref: BeatRef;
}

/** 手組トラック(楽器ごと) */
export interface TeTrack {
  instrument: Instrument;
  te_instances: TeInstance[];
}

/** 謡の表/裏 */
export type UtaiSub = "omote" | "ura";

export const UTAI_SUB_LABEL: Record<UtaiSub, string> = {
  omote: "表",
  ura: "裏",
};

/** 謡の1枠の内容。空欄はnullで表現。 */
export type UtaiContent = { type: "text"; value: string } | null;

/** 謡トラックの1文字枠 */
export interface UtaiChar {
  beat_ref: BeatRef;
  sub: UtaiSub;
  content: UtaiContent;
}

/** 謡トラック */
export interface UtaiTrack {
  track_type: "utai";
  chars: UtaiChar[];
}

/** 曲データ(手付本体) */
export interface SongData {
  song_id: string;
  kusari_sequence: KusariEntry[];
  tracks: {
    kotsuzumi?: TeTrack;
    utai?: UtaiTrack;
  };
}
