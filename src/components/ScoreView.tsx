// 描画ビュー: 手付をA4用紙相当のページ単位に分割して描画する。
// 1ページ = 固定8クサリ枠(データが無い枠は空白)。クサリは右→左、
// 各クサリ枠内は左に謡・右に小鼓の手組を配置し、
// 拍数の軸はページ右端に1つだけ表示する。
//
// 曲データ → クサリごとの描画アイテムへの展開は logic/scoreItems.ts が担い、
// ここではそれを座標に落として組み立てるだけにしている。
import { useMemo } from "react";
import {
  KUSARI_BEAT_COUNT,
  type KusariEntry,
  type SongData,
  type TeMaster,
  type Timing,
} from "../types";
import { computeGlobalStarts } from "../logic/position";
import {
  buildScoreItems,
  type ScoreItems,
  type TeLabel,
  type TeRenderItem,
  type UtaiCell,
} from "../logic/scoreItems";
import { INSTRUMENT_COLOR, TE_GLYPH_MASTER } from "../data/instruments";
import { VerticalText } from "./score/VerticalText";
import { TeMark } from "./score/TeMark";

interface Props {
  song: SongData;
  teMaster: TeMaster;
}

// --- レイアウト定数 ---
const BEAT_HEIGHT = 32;
const HEADER_ROW_HEIGHT = 80;
const MARGIN_TOP = 16;
const MARGIN_BOTTOM = 20;
const MARGIN_LEFT = 16;
const MARGIN_RIGHT = 16;
/** 1拍目の横線の上に確保する余白(半拍分の「0拍裏」+ 半拍分の余白) */
const TOP_PAD = BEAT_HEIGHT;
/** 最終拍の横線の下に確保する余白 */
const BOTTOM_PAD = BEAT_HEIGHT;
/** 謡:小鼓の枠の横幅は概ね2:1 */
const TE_COL_WIDTH = 22;
const UTAI_COL_WIDTH = 44;
const AXIS_COL_WIDTH = 22;
const SLOT_WIDTH = UTAI_COL_WIDTH + TE_COL_WIDTH;
const KUSARI_PER_PAGE = 8;
const GRID_TOP = MARGIN_TOP + HEADER_ROW_HEIGHT;
/** 1ページに引く拍の横線の数(一番拍数の多いクサリに合わせる) */
const ROWS_PER_PAGE = Math.max(...Object.values(KUSARI_BEAT_COUNT));
/** 見やすさのため太線にする拍(1始まり) */
const THICK_BEATS = new Set([1, 3, 5, 8]);

// --- 文字の大きさ ---
const INK_COLOR = "#000000";
const KAKEGOE_FONT_SIZE = 10;
const KAKEGOE_CHAR_HEIGHT = 11;
const UTAI_FONT_SIZE = 14;
const UTAI_CHAR_HEIGHT = 15;
const AXIS_FONT_SIZE = 11;
const TE_LABEL_FONT_SIZE = 9;
/** 手組名を縦書きにしたときの、1文字あたりのおおよその高さの比 */
const TE_LABEL_CHAR_RATIO = 0.62;

const TIMING_Y_OFFSET: Record<Timing, number> = {
  slightly_early: -BEAT_HEIGHT * 0.18,
  on: 0,
  slightly_late: BEAT_HEIGHT * 0.18,
};

/** 拍単位オフセット(0 = 1拍目の横線)→ y座標 */
const offsetY = (offset: number) => GRID_TOP + TOP_PAD + offset * BEAT_HEIGHT;
const GRID_BOTTOM = offsetY(ROWS_PER_PAGE - 1) + BOTTOM_PAD;

/** 1クサリ枠 = 謡1列 + 小鼓1列(右)のセット。データが無い枠も同じ幅で確保する。 */
interface SlotLayout {
  kusariIndex: number | null;
  beatCount: number;
  /** 謡列の左端 */
  utaiColX: number;
  /** 小鼓列の左端(= 謡列の右端) */
  teColX: number;
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
    const teColX = axisX - (i + 1) * SLOT_WIDTH + UTAI_COL_WIDTH;
    return {
      kusariIndex,
      beatCount:
        kusariIndex === null ? 0 : KUSARI_BEAT_COUNT[kusariSequence[kusariIndex].type],
      utaiColX: teColX - UTAI_COL_WIDTH,
      teColX,
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
          <line
            x1={slot.utaiColX}
            x2={slot.utaiColX}
            y1={MARGIN_TOP}
            y2={GRID_BOTTOM}
            className="skewer-line"
          />
          <line
            x1={slot.teColX}
            x2={slot.teColX}
            y1={MARGIN_TOP}
            y2={GRID_BOTTOM}
            className="skewer-line"
          />
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
  const right = slot.teColX + TE_COL_WIDTH;
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

/** 手組名(8拍の領域の上の専用の行に縦書きで並べる) */
function TeLabels({ labels, cx }: { labels: TeLabel[]; cx: number }) {
  const band = HEADER_ROW_HEIGHT / Math.max(1, labels.length);
  const maxWidth = band - 8;
  return (
    <>
      {labels.map((label, i) => {
        const anchorY = MARGIN_TOP + (i + 1) * band - 4;
        const estimatedWidth =
          label.teId.length * TE_LABEL_FONT_SIZE * TE_LABEL_CHAR_RATIO;
        return (
          <text
            key={label.key}
            x={cx}
            y={anchorY}
            fontSize={TE_LABEL_FONT_SIZE}
            textAnchor="start"
            fill={INSTRUMENT_COLOR[label.instrument]}
            transform={`rotate(-90 ${cx} ${anchorY})`}
            textLength={estimatedWidth > maxWidth ? maxWidth : undefined}
            lengthAdjust="spacingAndGlyphs"
          >
            {label.teId}
          </text>
        );
      })}
    </>
  );
}

/** 1クサリ枠の中身(謡・手組名・掛け声・手) */
function KusariSlot({
  slot,
  utai,
  kakegoe,
  hits,
  labels,
}: {
  slot: SlotLayout;
  utai: UtaiCell[];
  kakegoe: TeRenderItem[];
  hits: TeRenderItem[];
  labels: TeLabel[];
}) {
  const utaiCx = slot.utaiColX + UTAI_COL_WIDTH / 2;
  const teCx = slot.teColX + TE_COL_WIDTH / 2;
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

      <TeLabels labels={labels} cx={teCx} />

      {/* 掛け声・手(色は楽器ごとに決まる) */}
      {kakegoe.map((item) => (
        <VerticalText
          key={item.key}
          cx={teCx}
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
            cx={teCx}
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
              utai={items.utaiByKusari.get(slot.kusariIndex) ?? []}
              kakegoe={items.kakegoeByKusari.get(slot.kusariIndex) ?? []}
              hits={items.hitsByKusari.get(slot.kusariIndex) ?? []}
              labels={items.labelsByKusari.get(slot.kusariIndex) ?? []}
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
