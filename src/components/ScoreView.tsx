// 描画ビュー: 手付をA4用紙相当のページ単位に分割して描画する。
// 1ページ = 固定8クサリ枠(データが無い枠は空白)。クサリは右→左、
// 各クサリ枠内は左に謡・右に楽器ごとの手組の列(小鼓 → 大鼓)を配置し、
// 拍数の軸はページ右端に1つだけ表示する。
//
// 曲データ → クサリごとの描画アイテムへの展開は logic/scoreItems.ts が担い、
// ここではそれを座標に落として組み立てるだけにしている。
import { useMemo } from "react";
import {
  INSTRUMENTS,
  KUSARI_BEAT_COUNT,
  type Instrument,
  type KusariEntry,
  type SongData,
  type TeMaster,
  type Timing,
} from "../types";
import { computeGlobalStarts } from "../logic/position";
import {
  buildScoreItems,
  emptyInstrumentItems,
  type GuideRenderItem,
  type InstrumentItems,
  type ScoreItems,
  type TeLabel,
  type UtaiCell,
} from "../logic/scoreItems";
import { INSTRUMENT_COLOR, TE_GLYPH_MASTER } from "../data/instruments";
import { VerticalText } from "./score/VerticalText";
import { TeMark } from "./score/TeMark";
import { GuideMark } from "./score/GuideMark";

interface Props {
  song: SongData;
  teMaster: Record<Instrument, TeMaster>;
}

// --- レイアウト定数 ---
const HEADER_ROW_HEIGHT = 80;
const MARGIN_TOP = 16;
const MARGIN_BOTTOM = 20;
const MARGIN_LEFT = 16;
const MARGIN_RIGHT = 16;
/** 謡:楽器1つの枠の横幅は概ね2:1 */
const TE_COL_WIDTH = 22;
const UTAI_COL_WIDTH = 44;
const AXIS_COL_WIDTH = 22;
/** 手付の列は謡の右から「小鼓 → 大鼓」の順に置く */
const SCORE_INSTRUMENTS = [...INSTRUMENTS].reverse();
const SLOT_WIDTH = UTAI_COL_WIDTH + TE_COL_WIDTH * SCORE_INSTRUMENTS.length;
const KUSARI_PER_PAGE = 8;
const GRID_TOP = MARGIN_TOP + HEADER_ROW_HEIGHT;
/** 1ページに引く拍の横線の数(一番拍数の多いクサリに合わせる) */
const ROWS_PER_PAGE = Math.max(...Object.values(KUSARI_BEAT_COUNT));
/** 見やすさのため太線にする拍(1始まり) */
const THICK_BEATS = new Set([1, 3, 5, 8]);

/** 1ページの横幅。クサリ枠の数と列の幅だけで決まる */
const PAGE_WIDTH =
  MARGIN_LEFT + KUSARI_PER_PAGE * SLOT_WIDTH + AXIS_COL_WIDTH + MARGIN_RIGHT;

/**
 * 印刷する紙(A4横、余白10mm)の内側の縦横比。index.css の @page と揃える。
 * 楽器の列が増えると手付は横に伸びるので、紙の形に合うよう
 * 1拍の高さ(= 手付の縦の伸び)をここから逆算する。
 */
const PAPER_ASPECT_RATIO = 277 / 190;

/**
 * 1拍の高さ。紙の縦横比に合う高さになるよう、横幅から決める。
 *   高さ = MARGIN_TOP + HEADER_ROW_HEIGHT + MARGIN_BOTTOM
 *        + BEAT_HEIGHT * (拍の数 + 上下の余白1拍ずつ)
 */
const BEAT_HEIGHT = Math.round(
  (PAGE_WIDTH / PAPER_ASPECT_RATIO -
    (MARGIN_TOP + HEADER_ROW_HEIGHT + MARGIN_BOTTOM)) /
    (ROWS_PER_PAGE + 1),
);

/** 1拍目の横線の上に確保する余白(半拍分の「0拍裏」+ 半拍分の余白) */
const TOP_PAD = BEAT_HEIGHT;
/** 最終拍の横線の下に確保する余白 */
const BOTTOM_PAD = BEAT_HEIGHT;

// --- 文字の大きさ ---
const INK_COLOR = "#000000";
const KAKEGOE_FONT_SIZE = 10;
const KAKEGOE_CHAR_HEIGHT = 11;
const UTAI_FONT_SIZE = 14;
const UTAI_CHAR_HEIGHT = 15;
const AXIS_FONT_SIZE = 11;
const TE_LABEL_FONT_SIZE = 9;
/** 手組名を縦書きにしたときの1文字あたりの高さ */
const TE_LABEL_CHAR_HEIGHT = 10;
/** 手組名の上下に空ける余白 */
const TE_LABEL_BAND_PAD = 6;

/** 補助線と重なる掛け声を、右にずらす量 */
const KAKEGOE_GUIDE_DX = 6;

const TIMING_Y_OFFSET: Record<Timing, number> = {
  slightly_early: -BEAT_HEIGHT * 0.18,
  on: 0,
  slightly_late: BEAT_HEIGHT * 0.18,
};

/** 拍単位オフセット(0 = 1拍目の横線)→ y座標 */
const offsetY = (offset: number) => GRID_TOP + TOP_PAD + offset * BEAT_HEIGHT;
const GRID_BOTTOM = offsetY(ROWS_PER_PAGE - 1) + BOTTOM_PAD;

/** 1クサリ枠 = 謡1列 + 楽器の列(右)のセット。データが無い枠も同じ幅で確保する。 */
interface SlotLayout {
  kusariIndex: number | null;
  beatCount: number;
  /** 謡列の左端(= 枠の左端) */
  utaiColX: number;
  /** 楽器の列の左端。SCORE_INSTRUMENTS と同じ並び */
  teColX: number[];
  /** 枠の右端 */
  rightX: number;
}

/** 1ページ分のレイアウトを計算する */
function computePageLayout(
  slotKusariIndices: (number | null)[],
  kusariSequence: KusariEntry[],
) {
  const width =
    MARGIN_LEFT + slotKusariIndices.length * SLOT_WIDTH + AXIS_COL_WIDTH + MARGIN_RIGHT;
  const height = GRID_BOTTOM + MARGIN_BOTTOM;
  const axisX = width - MARGIN_RIGHT - AXIS_COL_WIDTH;

  const slots: SlotLayout[] = slotKusariIndices.map((kusariIndex, i) => {
    // クサリは右から左へ並ぶ
    const utaiColX = axisX - (i + 1) * SLOT_WIDTH;
    return {
      kusariIndex,
      beatCount:
        kusariIndex === null ? 0 : KUSARI_BEAT_COUNT[kusariSequence[kusariIndex].type],
      utaiColX,
      teColX: SCORE_INSTRUMENTS.map(
        (_, j) => utaiColX + UTAI_COL_WIDTH + j * TE_COL_WIDTH,
      ),
      rightX: utaiColX + SLOT_WIDTH,
    };
  });

  const left = slots.length > 0 ? slots[slots.length - 1].utaiColX : MARGIN_LEFT;
  return { slots, width, height, axisX, left };
}

/** ページの罫線(拍の横線・列の縦線・ヘッダー行・外枠) */
function PageGrid({
  slots,
  left,
  axisX,
}: {
  slots: SlotLayout[];
  left: number;
  axisX: number;
}) {
  return (
    <>
      {/* 拍(表)の横串線。線がある位置が表、線と線の間が裏 */}
      {Array.from({ length: ROWS_PER_PAGE }, (_, r) => (
        <line
          key={r}
          x1={left}
          x2={axisX}
          y1={offsetY(r)}
          y2={offsetY(r)}
          className={THICK_BEATS.has(r + 1) ? "skewer-line thick" : "skewer-line"}
        />
      ))}
      {/* 列の縦罫線(謡列の左端・謡と小鼓の境目)。手組名の行も含めて通す */}
      {slots.map((slot, i) => (
        <g key={i}>
          {[slot.utaiColX, ...slot.teColX].map((x, j) => (
            <line
              key={j}
              x1={x}
              x2={x}
              y1={MARGIN_TOP}
              y2={GRID_BOTTOM}
              className="skewer-line"
            />
          ))}
        </g>
      ))}
      <line x1={axisX} x2={axisX} y1={MARGIN_TOP} y2={GRID_BOTTOM} className="skewer-line" />
      {/* 手組名などを入れるヘッダー行(謡側は空欄) */}
      <line x1={left} x2={axisX} y1={MARGIN_TOP} y2={MARGIN_TOP} className="skewer-line" />
      <line x1={left} x2={axisX} y1={GRID_TOP} y2={GRID_TOP} className="skewer-line" />
      {/* 枠の下端 */}
      <line x1={left} x2={axisX} y1={GRID_BOTTOM} y2={GRID_BOTTOM} className="skewer-line" />
    </>
  );
}

/** 拍数の軸(ページ右端に1つだけ、横線の高さに合わせる) */
function BeatAxis({ axisX }: { axisX: number }) {
  return (
    <>
      {Array.from({ length: ROWS_PER_PAGE }, (_, r) => (
        <text
          key={r}
          x={axisX + AXIS_COL_WIDTH / 2}
          y={offsetY(r)}
          dominantBaseline="middle"
          fontSize={AXIS_FONT_SIZE}
          textAnchor="middle"
          className="beat-axis-text"
        >
          {r + 1}
        </text>
      ))}
    </>
  );
}

/**
 * 8拍に満たないクサリ(トリ/オクリ/片地)で、使わない拍を示す印。
 * 最終拍の裏に太い横線を引き、そこから8拍目へ斜めの太線を下ろす。
 */
function UnusedBeatsMark({ slot }: { slot: SlotLayout }) {
  const y = offsetY(slot.beatCount - 1 + 0.5);
  const left = slot.utaiColX;
  const right = slot.rightX;
  return (
    <>
      <line x1={left} x2={right} y1={y} y2={y} className="skewer-line thick" />
      <line
        x1={right}
        y1={y}
        x2={left}
        y2={offsetY(ROWS_PER_PAGE - 1)}
        className="skewer-line thick"
      />
    </>
  );
}

/**
 * 手組名(8拍の領域の上の専用の行)。
 * 日本語なので文字を回転させず、1文字ずつ上から縦に積む。
 */
function TeLabels({ labels, cx }: { labels: TeLabel[]; cx: number }) {
  const band = HEADER_ROW_HEIGHT / Math.max(1, labels.length);
  return (
    <>
      {labels.map((label, i) => {
        const chars = Array.from(label.text);
        // 帯に収まらない長い名前は行間を詰める
        const charHeight = Math.min(
          TE_LABEL_CHAR_HEIGHT,
          (band - TE_LABEL_BAND_PAD) / chars.length,
        );
        const centerY = MARGIN_TOP + (i + 0.5) * band;
        const firstY = centerY - ((chars.length - 1) * charHeight) / 2;
        return (
          <g key={label.key}>
            {chars.map((ch, c) => (
              <text
                key={c}
                x={cx}
                y={firstY + c * charHeight}
                fontSize={TE_LABEL_FONT_SIZE}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={INSTRUMENT_COLOR[label.instrument]}
              >
                {ch}
              </text>
            ))}
          </g>
        );
      })}
    </>
  );
}

/** クサリ枠の中の補助線。手より先に描くことで、手と重なる部分は手の下に隠れる */
function Guides({ guides, cx }: { guides: GuideRenderItem[]; cx: number }) {
  return (
    <>
      {guides.map((guide) => (
        <GuideMark
          key={guide.key}
          cx={cx}
          y1={offsetY(guide.fromOffset)}
          y2={offsetY(guide.toOffset)}
          shape={guide.shape}
          color={INSTRUMENT_COLOR[guide.instrument]}
        />
      ))}
    </>
  );
}

/** 1つの楽器の列の中身(手組名・補助線・掛け声・手) */
function InstrumentColumn({
  items,
  kusariIndex,
  cx,
}: {
  items: InstrumentItems;
  kusariIndex: number;
  cx: number;
}) {
  const kakegoe = items.kakegoeByKusari.get(kusariIndex) ?? [];
  const hits = items.hitsByKusari.get(kusariIndex) ?? [];
  return (
    <g>
      <TeLabels labels={items.labelsByKusari.get(kusariIndex) ?? []} cx={cx} />

      {/* 補助線は手より先に描き、手と重なる部分は手の下に隠す */}
      <Guides guides={items.guidesByKusari.get(kusariIndex) ?? []} cx={cx} />

      {/* 掛け声・手(色は楽器ごとに決まる) */}
      {kakegoe.map((item) => (
        <VerticalText
          key={item.key}
          // 補助線と重なる掛け声は、少し右にずらして避ける
          cx={cx + (item.avoidsGuide ? KAKEGOE_GUIDE_DX : 0)}
          cy={offsetY(item.offset)}
          text={item.text ?? ""}
          color={INSTRUMENT_COLOR[item.instrument]}
          fontSize={KAKEGOE_FONT_SIZE}
          charHeight={KAKEGOE_CHAR_HEIGHT}
        />
      ))}
      {hits.map((item) => {
        const glyph = item.te ? TE_GLYPH_MASTER[item.instrument]?.[item.te] : undefined;
        if (!glyph) return null;
        return (
          <TeMark
            key={item.key}
            cx={cx}
            cy={offsetY(item.offset) + TIMING_Y_OFFSET[item.timing ?? "on"]}
            shape={glyph.shape}
            color={INSTRUMENT_COLOR[item.instrument]}
            label={glyph.label}
          />
        );
      })}
    </g>
  );
}

/** 1クサリ枠の中身(謡 + 楽器ごとの列) */
function KusariSlot({
  slot,
  kusariIndex,
  utai,
  byInstrument,
}: {
  slot: SlotLayout;
  kusariIndex: number;
  utai: UtaiCell[];
  byInstrument: Record<Instrument, InstrumentItems>;
}) {
  const utaiCx = slot.utaiColX + UTAI_COL_WIDTH / 2;
  return (
    <g>
      {slot.beatCount < ROWS_PER_PAGE && <UnusedBeatsMark slot={slot} />}

      {/* 謡(表は横線の上、裏は線と線の間) */}
      {utai.map((cell, i) => (
        <VerticalText
          key={i}
          cx={utaiCx}
          cy={offsetY(cell.offset)}
          text={cell.value}
          color={INK_COLOR}
          fontSize={UTAI_FONT_SIZE}
          charHeight={UTAI_CHAR_HEIGHT}
        />
      ))}

      {SCORE_INSTRUMENTS.map((instrument, j) => (
        <InstrumentColumn
          key={instrument}
          items={byInstrument[instrument] ?? emptyInstrumentItems()}
          kusariIndex={kusariIndex}
          cx={slot.teColX[j] + TE_COL_WIDTH / 2}
        />
      ))}
    </g>
  );
}

interface ScorePageProps {
  kusariSequence: KusariEntry[];
  items: ScoreItems;
  slotKusariIndices: (number | null)[];
  pageNumber: number;
}

function ScorePage({
  kusariSequence,
  items,
  slotKusariIndices,
  pageNumber,
}: ScorePageProps) {
  const { slots, width, height, axisX, left } = useMemo(
    () => computePageLayout(slotKusariIndices, kusariSequence),
    [slotKusariIndices, kusariSequence],
  );

  return (
    <div className="score-page">
      <div className="score-page-label">{pageNumber}</div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="score-view"
        role="img"
        aria-label={`手付譜 ${pageNumber}ページ目`}
      >
        <PageGrid slots={slots} left={left} axisX={axisX} />
        <BeatAxis axisX={axisX} />
        {slots.map((slot) =>
          slot.kusariIndex === null ? null : (
            <KusariSlot
              key={slot.kusariIndex}
              slot={slot}
              kusariIndex={slot.kusariIndex}
              utai={items.utaiByKusari.get(slot.kusariIndex) ?? []}
              byInstrument={items.byInstrument}
            />
          ),
        )}
      </svg>
    </div>
  );
}

export function ScoreView({ song, teMaster }: Props) {
  const items = useMemo(() => {
    const globalStarts = computeGlobalStarts(song.kusari_sequence);
    return buildScoreItems(song, teMaster, globalStarts);
  }, [song, teMaster]);

  /** クサリをページごとに分ける。足りない枠はnull(空欄)で埋める */
  const pages = useMemo(() => {
    const total = song.kusari_sequence.length;
    const pageCount = Math.max(1, Math.ceil(total / KUSARI_PER_PAGE));
    return Array.from({ length: pageCount }, (_, p) =>
      Array.from({ length: KUSARI_PER_PAGE }, (_, i) => {
        const kusariIndex = p * KUSARI_PER_PAGE + i;
        return kusariIndex < total ? kusariIndex : null;
      }),
    );
  }, [song.kusari_sequence.length]);

  return (
    <div className="score-pages">
      {pages.map((slotKusariIndices, i) => (
        <ScorePage
          key={i}
          kusariSequence={song.kusari_sequence}
          items={items}
          slotKusariIndices={slotKusariIndices}
          pageNumber={i + 1}
        />
      ))}
    </div>
  );
}
