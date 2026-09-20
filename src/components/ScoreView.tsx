// 描画ビュー: 手付をA4用紙相当のページ単位に分割して描画する。
// 1ページ = 固定8クサリ枠(データが無い枠は空白)。クサリは右→左、
// 各クサリ枠内は左に謡(または唱歌)・右に楽器ごとの手組の列(小鼓 → 大鼓)を
// 配置し、拍数の軸はページ右端に1つだけ表示する。
//
// 謡と唱歌は同じ列に書く。曲ごとにどちらを書くかが決まっていて、
// 同時に出ることはない。
//
// 曲データ → クサリごとの描画アイテムへの展開は logic/scoreItems.ts が担い、
// ここではそれを座標に落として組み立てるだけにしている。
import { useMemo } from "react";
import {
  INSTRUMENTS,
  KUSARI_BEAT_COUNT,
  type Instrument,
  type KusariEntry,
  type Masters,
  TIMINGS,
  type SongData,
  type Timing,
} from "../types";
import { computeGlobalStarts } from "../logic/position";
import {
  buildScoreItems,
  emptyInstrumentItems,
  type GuideRenderItem,
  type InstrumentItems,
  type ScoreItems,
  type ShogaCell,
  type TeLabel,
  type UtaiCell,
} from "../logic/scoreItems";
import { INSTRUMENT_COLOR, TE_GLYPH_MASTER } from "../data/instruments";
import { VerticalText } from "./score/VerticalText";
import { ShogaGlyph } from "./score/ShogaGlyph";
import { TeMark } from "./score/TeMark";
import { GuideMark } from "./score/GuideMark";
import { timingOffsetY } from "../logic/timing";
import {
  AXIS_FONT_SIZE,
  INK_COLOR,
  KAKEGOE_CHAR_HEIGHT,
  KAKEGOE_FONT_SIZE,
  LABEL_CHAR_HEIGHT,
  LABEL_FONT_SIZE,
  PAGE_NUMBER_FONT_SIZE,
  SHOGA_CHAR_HEIGHT,
  SHOGA_FONT_SIZE,
  TITLE_CHAR_HEIGHT,
  TITLE_FONT_SIZE,
  UTAI_CHAR_HEIGHT,
  UTAI_FONT_SIZE,
} from "./score/metrics";
import { countCharUnits } from "../logic/charUnits";

interface Props {
  song: SongData;
  masters: Masters;
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

/** 名前(手組名・唱歌の名前)の上下に空ける余白 */
const LABEL_BAND_PAD = 6;

/** 掛け声を列の中心から右にずらす量(補助線と重ならないように) */
const KAKEGOE_DX = 6;

const TIMING_Y_OFFSET: Record<Timing, number> = Object.fromEntries(
  TIMINGS.map((t) => [t, timingOffsetY(t, BEAT_HEIGHT)]),
) as Record<Timing, number>;

/** 拍単位オフセット(0 = 1拍目の横線)→ y座標 */
const offsetY = (offset: number) => GRID_TOP + TOP_PAD + offset * BEAT_HEIGHT;
const GRID_BOTTOM = offsetY(ROWS_PER_PAGE - 1) + BOTTOM_PAD;

/**
 * 1つの枠の中身。
 * 曲名は1列目(一番右)の枠を丸ごと使う。クサリの入らない枠は空白。
 */
type SlotContent =
  | { kind: "title" }
  | { kind: "kusari"; index: number }
  | { kind: "empty" };

/** 1クサリ枠 = 謡1列 + 楽器の列(右)のセット。データが無い枠も同じ幅で確保する。 */
interface SlotLayout {
  content: SlotContent;
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
  slotContents: SlotContent[],
  kusariSequence: KusariEntry[],
) {
  const width =
    MARGIN_LEFT + slotContents.length * SLOT_WIDTH + AXIS_COL_WIDTH + MARGIN_RIGHT;
  const height = GRID_BOTTOM + MARGIN_BOTTOM;
  const axisX = width - MARGIN_RIGHT - AXIS_COL_WIDTH;

  const slots: SlotLayout[] = slotContents.map((content, i) => {
    // 枠は右から左へ並ぶ
    const utaiColX = axisX - (i + 1) * SLOT_WIDTH;
    return {
      content,
      beatCount:
        content.kind === "kusari"
          ? KUSARI_BEAT_COUNT[kusariSequence[content.index].type]
          : 0,
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
      {/* 列の縦罫線(謡列の左端・謡と小鼓の境目)。手組名の行も含めて通す。
          曲名の枠は中を区切らないので、枠の左端だけ引く */}
      {slots.map((slot, i) => (
        <g key={i}>
          {(slot.content.kind === "title"
            ? [slot.utaiColX]
            : [slot.utaiColX, ...slot.teColX]
          ).map((x, j) => (
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

/**
 * ページ番号。紙の下の余白の中央に置く。
 * 手付そのものの一部として描くので、PDFにもそのまま出る。
 */
function PageNumber({
  width,
  height,
  pageNumber,
}: {
  width: number;
  height: number;
  pageNumber: number;
}) {
  return (
    <text
      x={width / 2}
      y={height - MARGIN_BOTTOM / 2}
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize={PAGE_NUMBER_FONT_SIZE}
      className="page-number-text"
    >
      {pageNumber}
    </text>
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
 * 手組名の行(8拍の領域の上の専用の行)。色は楽器ごとに決まる。
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
          LABEL_CHAR_HEIGHT,
          (band - LABEL_BAND_PAD) / chars.length,
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
                fontSize={LABEL_FONT_SIZE}
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
          // 掛け声は補助線の有無にかかわらず、少し右に寄せる
          cx={cx + KAKEGOE_DX}
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

/**
 * 唱歌の列の中身。
 * 1枠分の描き方はマスタ編集画面のプレビューと同じ ShogaGlyph に任せて
 * いるので、文字ごとの調整(○・小文字・縦幅・字間・ずらし)の見え方は
 * そちらと一致する。
 */
function ShogaColumn({ cells, cx }: { cells: ShogaCell[]; cx: number }) {
  return (
    <>
      {cells.map((cell) => (
        <ShogaGlyph
          key={cell.key}
          char={cell.char}
          cx={cx}
          cy={offsetY(cell.offset)}
          fontSize={SHOGA_FONT_SIZE}
          charHeight={SHOGA_CHAR_HEIGHT}
          color={INK_COLOR}
        />
      ))}
    </>
  );
}

/**
 * 曲名の列。手付の1列目(一番右)の枠を丸ごと使い、
 * 拍の枠の一番上から縦書きで書き下ろす。
 */
function TitleColumn({ slot, title }: { slot: SlotLayout; title: string }) {
  const chars = countCharUnits(title);
  return (
    <VerticalText
      cx={slot.utaiColX + SLOT_WIDTH / 2}
      // 1音目が一番上の拍の線に来るよう、全体の中心をずらす
      cy={offsetY(0) + ((chars - 1) * TITLE_CHAR_HEIGHT) / 2}
      text={title}
      color={INK_COLOR}
      fontSize={TITLE_FONT_SIZE}
      charHeight={TITLE_CHAR_HEIGHT}
    />
  );
}

/** 1クサリ枠の中身(謡または唱歌 + 楽器ごとの列) */
function KusariSlot({
  slot,
  kusariIndex,
  utai,
  shoga,
  byInstrument,
}: {
  slot: SlotLayout;
  kusariIndex: number;
  utai: UtaiCell[];
  shoga: ShogaCell[];
  byInstrument: Record<Instrument, InstrumentItems>;
}) {
  const utaiCx = slot.utaiColX + UTAI_COL_WIDTH / 2;
  return (
    <g>
      {slot.beatCount < ROWS_PER_PAGE && <UnusedBeatsMark slot={slot} />}

      {/* 謡(表は横線の上、裏は線と線の間)。唱歌を選んだ曲では空になる */}
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

      {/* 唱歌。謡と同じ列に、同じ大きさで書く。
          手組と違い、まとまりの名前はヘッダー行には出さない */}
      <ShogaColumn cells={shoga} cx={utaiCx} />

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
  slotContents: SlotContent[];
  title: string;
  pageNumber: number;
}

function ScorePage({
  kusariSequence,
  items,
  slotContents,
  title,
  pageNumber,
}: ScorePageProps) {
  const { slots, width, height, axisX, left } = useMemo(
    () => computePageLayout(slotContents, kusariSequence),
    [slotContents, kusariSequence],
  );

  return (
    <div className="score-page">
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
        {slots.map((slot, i) => {
          if (slot.content.kind === "title") {
            return <TitleColumn key="title" slot={slot} title={title} />;
          }
          if (slot.content.kind === "empty") return null;
          const kusariIndex = slot.content.index;
          return (
            <KusariSlot
              key={i}
              slot={slot}
              kusariIndex={kusariIndex}
              utai={items.utaiByKusari.get(kusariIndex) ?? []}
              shoga={items.shogaByKusari.get(kusariIndex) ?? []}
              byInstrument={items.byInstrument}
            />
          );
        })}
        <PageNumber width={width} height={height} pageNumber={pageNumber} />
      </svg>
    </div>
  );
}

export function ScoreView({ song, masters }: Props) {
  const items = useMemo(() => {
    const globalStarts = computeGlobalStarts(song.kusari_sequence);
    return buildScoreItems(song, masters, globalStarts);
  }, [song, masters]);

  const title = (song.title ?? "").trim();

  /**
   * クサリをページごとに分ける。足りない枠は空白で埋める。
   * 曲名があるときは、1ページ目の1列目(一番右)を曲名に使うので、
   * そのページに入るクサリが1つ減る。
   */
  const pages = useMemo(() => {
    const total = song.kusari_sequence.length;
    const firstPageSlots = KUSARI_PER_PAGE - (title === "" ? 0 : 1);
    const result: SlotContent[][] = [];

    let next = 0;
    // 最後のクサリを置き終わるまでページを作る(0クサリでも1ページは出す)
    do {
      const isFirst = result.length === 0;
      const kusariSlots = isFirst ? firstPageSlots : KUSARI_PER_PAGE;
      const slots: SlotContent[] = isFirst && title !== "" ? [{ kind: "title" }] : [];
      for (let i = 0; i < kusariSlots; i++, next++) {
        slots.push(next < total ? { kind: "kusari", index: next } : { kind: "empty" });
      }
      result.push(slots);
    } while (next < total);

    return result;
  }, [song.kusari_sequence.length, title]);

  return (
    <div className="score-pages">
      {pages.map((slotContents, i) => (
        <ScorePage
          key={i}
          kusariSequence={song.kusari_sequence}
          items={items}
          slotContents={slotContents}
          title={title}
          pageNumber={i + 1}
        />
      ))}
    </div>
  );
}
