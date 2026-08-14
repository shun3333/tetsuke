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
 * rel_pos は手組の頭からの相対位置を「半拍単位」で表す。
 *   0 = 頭の拍の表 / 1 = その裏 / 2 = 次の拍の表 / -1 = 頭の半拍前(0拍の裏)
 * 色は楽器ごとに決まるため、個々には持たない。
 */
export interface KakegoeEntry {
  rel_pos: number;
  text: string;
}

/**
 * 手組内の手(打つタイミング)1つ。rel_pos の意味はKakegoeEntryと同じ。
 * どの図形で描くかは te から手マスタを引いて決まる。
 */
export interface HitEntry {
  rel_pos: number;
  timing: Timing;
  te: TeName;
}

/** 補助線の形 */
export type GuideShape =
  /** まっすぐな線 */
  | "straight"
  /** 途中で折れる「くの字」の線 */
  | "bent";

/**
 * 手と手の間に引く補助線。位置の意味はKakegoeEntryと同じ(半拍単位)。
 * 半拍だけの短いものから、2拍にわたる長いものまである。
 */
export interface GuideEntry {
  from_pos: number;
  to_pos: number;
  shape: GuideShape;
}

/** 手組の内部パターン(掛け声・手・補助線・長さ) */
export interface InternalPattern {
  length: number;
  kakegoe: KakegoeEntry[];
  hits: HitEntry[];
  /** 手と手の間の補助線。無い手組では省略できる */
  guides?: GuideEntry[];
}

/** 対応楽器。手組の仕組みは同じで、手マスタと色だけが楽器ごとに違う */
export type Instrument = "kotsuzumi" | "otsuzumi";

/** 楽器の表示名 */
export const INSTRUMENT_LABEL: Record<Instrument, string> = {
  otsuzumi: "大鼓",
  kotsuzumi: "小鼓",
};

/**
 * 楽器を並べる順。タイムラインではこの順に上から行を置く。
 * 手付の列は謡の右から「小鼓 → 大鼓」なので、この逆順になる。
 */
export const INSTRUMENTS: Instrument[] = ["otsuzumi", "kotsuzumi"];

/** 手組マスタの1エントリ */
export interface TeMasterEntry {
  /** 曲データから参照するためのID。表示には使わない */
  te_id: string;
  /** 画面・手付に表示する名前(日本語) */
  label: string;
  instrument: Instrument;
  internal_pattern: InternalPattern;
}

/** 楽器ごとの手組辞書(te_id -> 定義) */
export type TeMaster = Record<string, TeMasterEntry>;

/**
 * クサリ内の位置を指す参照。
 * beat は「半拍単位の枠番号」(1始まり)で、表・裏を1つの連番で表す。
 *   1 = 0拍の裏 / 2 = 1拍の表 / 3 = 1拍の裏 / 4 = 2拍の表 / … / 16 = 8拍の表
 * 有効範囲は 1 〜 (クサリの拍数 × 2)。
 * クサリ末尾の拍の裏は、次のクサリの beat: 1(0拍の裏)として表す。
 */
export interface BeatRef {
  kusari_index: number;
  beat: number;
}

/**
 * 曲データ内に配置された手組の1インスタンス。
 *
 * start_ref は手組の「起点」で、クサリのN拍目に置いた手組は
 *   beat = N * 2
 * になる(1拍目に置けば 2)。手組の中身の位置は
 *   絶対スロット = start_ref.beat + rel_pos
 * で決まる。1拍目に置いた場合、rel_pos: 0 の手は1拍目の表、
 * rel_pos: 2 の手は2拍目の表に乗る。
 */
export interface TeInstance {
  te_id: string;
  start_ref: BeatRef;
}

/** 手組トラック(楽器ごと) */
export interface TeTrack {
  instrument: Instrument;
  te_instances: TeInstance[];
}

/** 謡の1枠の内容。空欄はnullで表現。 */
export type UtaiContent = { type: "text"; value: string } | null;

/** 謡トラックの1文字枠。位置は beat_ref(半拍単位の枠番号)だけで表す。 */
export interface UtaiChar {
  beat_ref: BeatRef;
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
    /** 楽器ごとの手組トラック */
    otsuzumi?: TeTrack;
    kotsuzumi?: TeTrack;
    utai?: UtaiTrack;
  };
}
