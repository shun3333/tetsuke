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

/**
 * 手(打ち方)のID。楽器ごとに定義される。
 * 小鼓は プ / ポ / チ / タ の4種類。
 */
export type TeName = string;

/** 手を表す図形の種類 */
export type TeShape =
  /** 中抜きで横線を引いた丸 */
  | "open_circle_barred"
  /** 中抜きの丸 */
  | "open_circle"
  /** 中埋めの小さめの丸 */
  | "filled_small_circle"
  /** 中抜きの三角 */
  | "open_triangle";

/** 手マスタの1エントリ。手のIDと、その表示内容(図形)を対応づける。 */
export interface TeGlyph {
  te: TeName;
  /** 表示名(プ / ポ / チ / タ など) */
  label: string;
  shape: TeShape;
}

/** 楽器ごとの手マスタ(te -> 図形定義) */
export type TeGlyphMaster = Record<TeName, TeGlyph>;

/**
 * 手組内の掛け声1つ。
 * rel_beat は拍(横線)の位置、sub は表(線の上) / 裏(線と線の間)。
 * 手組の頭より前の「0拍の裏」を表す場合は rel_beat: -1, sub: "ura" とする。
 * 色は楽器ごとに決まるため、個々には持たない。
 */
export interface KakegoeEntry {
  rel_beat: number;
  text: string;
  sub?: UtaiSub;
}

/**
 * 手組内の手(打つタイミング)1つ。rel_beat/subの意味はKakegoeEntryと同じ。
 * どの図形で描くかは te から手マスタを引いて決まる。
 */
export interface HitEntry {
  rel_beat: number;
  timing: Timing;
  te: TeName;
  sub?: UtaiSub;
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
