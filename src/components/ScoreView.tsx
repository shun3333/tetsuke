// 描画ビュー: 手付をA4用紙相当のページ単位に分割して描画する。
// 1ページ = 固定8クサリ枠(データが無い枠は空白)。クサリは右→左、
// 各クサリ枠内は左に謡・右に小鼓の手組を配置し、
// 拍数の軸はページ右端に1つだけ表示する。
// 表は拍の横線の上、裏は線と線の間(半拍下)に置く。
// クサリ末尾の拍の裏は、次のクサリの1拍目の半拍前(=0拍裏)に送って描画する。
import { useMemo } from "react";
import {
  KUSARI_BEAT_COUNT,
  type Instrument,
  type SongData,
  type TeMaster,
  type TeName,
  type TeShape,
  type Timing,
  type UtaiSub,
} from "../types";
import {
  computeGlobalStarts,
  computeTeFragments,
  type TeFragment,
} from "../logic/position";
import { INSTRUMENT_COLOR, TE_GLYPH_MASTER } from "../data/instruments";

interface Props {
  song: SongData;
  teMaster: TeMaster;
}

const BEAT_HEIGHT = 32;
const HEADER_ROW_HEIGHT = 80;
const MARGIN_TOP = 16;
const MARGIN_BOTTOM = 20;
const MARGIN_LEFT = 16;
const MARGIN_RIGHT = 16;
// 1拍目の横線の上に確保する余白(半拍分の「0拍裏」+ 半拍分の余白)
const TOP_PAD = BEAT_HEIGHT;
// 最終拍の横線の下に確保する余白
const BOTTOM_PAD = BEAT_HEIGHT;
// 謡:小鼓の枠の横幅は概ね2:1
const TE_COL_WIDTH = 22;
const UTAI_COL_WIDTH = 44;
const AXIS_COL_WIDTH = 22;
const KUSARI_PER_PAGE = 8;
const GRID_TOP = MARGIN_TOP + HEADER_ROW_HEIGHT;
/** 見やすさのため太線にする拍(1始まり) */
const THICK_BEATS = new Set([1, 3, 5, 8]);

const TIMING_Y_OFFSET: Record<Timing, number> = {
  slightly_early: -BEAT_HEIGHT * 0.18,
  on: 0,
  slightly_late: BEAT_HEIGHT * 0.18,
};

interface TeMarkProps {
  cx: number;
  cy: number;
  shape: TeShape;
  color: string;
  label: string;
}

/** 手マスタで指定された図形を描く */
function TeMark({ cx, cy, shape, color, label }: TeMarkProps) {
  const title = <title>{label}</title>;
  switch (shape) {
    case "filled_small_circle":
      return (
        <circle cx={cx} cy={cy} r={2.8} fill={color}>
          {title}
        </circle>
      );
    case "open_circle":
      return (
        <circle cx={cx} cy={cy} r={4} fill="none" stroke={color} strokeWidth={1.3}>
          {title}
        </circle>
      );
    case "open_circle_barred":
      return (
        <g>
          {title}
          <circle cx={cx} cy={cy} r={4} fill="none" stroke={color} strokeWidth={1.3} />
          <line
            x1={cx - 5.5}
            x2={cx + 5.5}
            y1={cy}
            y2={cy}
            stroke={color}
            strokeWidth={1.3}
          />
        </g>
      );
    case "open_triangle": {
      const r = 4.5;
      const points = `${cx},${cy - r} ${cx + r},${cy + r * 0.8} ${cx - r},${cy + r * 0.8}`;
      return (
        <polygon points={points} fill="none" stroke={color} strokeWidth={1.3}>
          {title}
        </polygon>
      );
    }
  }
}

/** 描画用に展開した謡の1枠。beatIndexは0始まり(-1 は「0拍裏」= 1拍目の半拍前) */
interface UtaiCell {
  beatIndex: number;
  sub: UtaiSub;
  value: string;
}

/** 描画用に展開した掛け声/手の1つ。描画先のクサリと位置は解決済み。 */
interface TeRenderItem {
  key: string;
  beatIndex: number;
  sub: UtaiSub;
  kind: "kakegoe" | "hit";
  /** どの楽器の手組か(色の決定に使う) */
  instrument: Instrument;
  text?: string;
  te?: TeName;
  timing?: Timing;
}

/** 1クサリ枠 = 謡1列 + 小鼓1列(右)のセット。データが無い枠も同じ幅で確保する。 */
interface SlotLayout {
  kusariIndex: number | null;
  beatCount: number;
  /** 謡列の左端 */
  utaiColX: number;
  /** 小鼓列の左端(= 謡列の右端) */
  teColX: number;
  fragments: TeFragment[];
}

interface ScorePageProps {
  song: SongData;
  allFragments: TeFragment[];
  utaiEntriesByKusari: Map<number, UtaiCell[]>;
  teItemsByKusari: Map<number, TeRenderItem[]>;
  rowsPerPage: number;
  slotKusariIndices: (number | null)[];
  pageNumber: number;
}

function ScorePage({
  song,
  allFragments,
  utaiEntriesByKusari,
  teItemsByKusari,
  rowsPerPage,
  slotKusariIndices,
  pageNumber,
}: ScorePageProps) {
  const { slots, width, height, axisX } = useMemo(() => {
    // 全ての枠が同じ幅(謡 + 小鼓)なので、ページ幅はデータ量によらず一定
    const slotWidth = UTAI_COL_WIDTH + TE_COL_WIDTH;
    const contentWidth = slotKusariIndices.length * slotWidth;
    const svgWidth = MARGIN_LEFT + contentWidth + AXIS_COL_WIDTH + MARGIN_RIGHT;
    const svgHeight =
      GRID_TOP + TOP_PAD + (rowsPerPage - 1) * BEAT_HEIGHT + BOTTOM_PAD + MARGIN_BOTTOM;
    const axisX = svgWidth - MARGIN_RIGHT - AXIS_COL_WIDTH;

    const slots: SlotLayout[] = slotKusariIndices.map((kusariIndex, i) => {
      const teColX = axisX - (i + 1) * slotWidth + UTAI_COL_WIDTH;
      return {
        kusariIndex,
        beatCount:
          kusariIndex === null
            ? 0
            : KUSARI_BEAT_COUNT[song.kusari_sequence[kusariIndex].type],
        utaiColX: teColX - UTAI_COL_WIDTH,
        teColX,
        fragments:
          kusariIndex === null
            ? []
            : allFragments
                .filter((f) => f.kusariIndex === kusariIndex)
                .sort((a, b) => a.localStart - b.localStart),
      };
    });

    return { slots, width: svgWidth, height: svgHeight, axisX };
  }, [slotKusariIndices, allFragments, song.kusari_sequence, rowsPerPage]);

  const pageLeft = slots.length > 0 ? slots[slots.length - 1].utaiColX : MARGIN_LEFT;
  /** 拍(表)の横線のy座標。beatIndexは0始まり(0 = 1拍目) */
  const beatLineY = (beatIndex: number) => GRID_TOP + TOP_PAD + beatIndex * BEAT_HEIGHT;
  /** 表は横線の上、裏は線と線の間(半拍下) */
  const posY = (beatIndex: number, sub: UtaiSub) =>
    beatLineY(beatIndex) + (sub === "ura" ? BEAT_HEIGHT / 2 : 0);
  const gridBottom = beatLineY(rowsPerPage - 1) + BOTTOM_PAD;

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
        {/* 拍(表)の横串線。線がある位置が表、線と線の間が裏 */}
        {Array.from({ length: rowsPerPage }, (_, r) => (
          <line
            key={r}
            x1={pageLeft}
            x2={axisX}
            y1={beatLineY(r)}
            y2={beatLineY(r)}
            className={THICK_BEATS.has(r + 1) ? "skewer-line thick" : "skewer-line"}
          />
        ))}
        {/* 列の縦罫線(謡列の左端・謡と小鼓の境目。手組名の行も含めて通す) */}
        {slots.map((slot, i) => (
          <g key={i}>
            <line
              x1={slot.utaiColX}
              x2={slot.utaiColX}
              y1={MARGIN_TOP}
              y2={gridBottom}
              className="skewer-line"
            />
            <line
              x1={slot.teColX}
              x2={slot.teColX}
              y1={MARGIN_TOP}
              y2={gridBottom}
              className="skewer-line"
            />
          </g>
        ))}
        <line
          x1={axisX}
          x2={axisX}
          y1={MARGIN_TOP}
          y2={gridBottom}
          className="skewer-line"
        />
        {/* 手組名などを入れるヘッダー行(謡側は空欄) */}
        <line x1={pageLeft} x2={axisX} y1={MARGIN_TOP} y2={MARGIN_TOP} className="skewer-line" />
        <line x1={pageLeft} x2={axisX} y1={GRID_TOP} y2={GRID_TOP} className="skewer-line" />
        {/* 枠の下端 */}
        <line x1={pageLeft} x2={axisX} y1={gridBottom} y2={gridBottom} className="skewer-line" />

        {/* 拍数(ページ右端に1つだけ、横線の高さに合わせる) */}
        {Array.from({ length: rowsPerPage }, (_, r) => (
          <text
            key={r}
            x={axisX + AXIS_COL_WIDTH / 2}
            y={beatLineY(r)}
            dominantBaseline="middle"
            fontSize={11}
            textAnchor="middle"
            className="beat-axis-text"
          >
            {r + 1}
          </text>
        ))}

        {slots.map((slot) => {
          if (slot.kusariIndex === null) return null;
          const kusariIndex = slot.kusariIndex;
          const slotLeft = slot.utaiColX;
          const slotRight = slot.teColX + TE_COL_WIDTH;
          const teColCenterX = slot.teColX + TE_COL_WIDTH / 2;
          // 8拍に満たないクサリ(トリ/オクリ/片地)は、使わない拍を
          // 「最終拍の裏の太い横線」+「そこから8拍目へ下る斜めの太線」で示す
          const hasUnusedBeats = slot.beatCount < rowsPerPage;
          const lastUraY = posY(slot.beatCount - 1, "ura");
          return (
            <g key={kusariIndex}>
              {hasUnusedBeats && (
                <>
                  <line
                    x1={slotLeft}
                    x2={slotRight}
                    y1={lastUraY}
                    y2={lastUraY}
                    className="skewer-line thick"
                  />
                  <line
                    x1={slotRight}
                    y1={lastUraY}
                    x2={slotLeft}
                    y2={beatLineY(rowsPerPage - 1)}
                    className="skewer-line thick"
                  />
                </>
              )}

              {/* 謡(表は横線の上、裏は線と線の間。beatIndex -1 は1拍目の半拍前) */}
              {(utaiEntriesByKusari.get(kusariIndex) ?? []).map((entry, i) => {
                if (entry.beatIndex >= slot.beatCount) return null;
                return (
                  <text
                    key={i}
                    x={slot.utaiColX + UTAI_COL_WIDTH / 2}
                    y={posY(entry.beatIndex, entry.sub)}
                    dominantBaseline="middle"
                    fontSize={14}
                    textAnchor="middle"
                    className="utai-text"
                  >
                    {entry.value}
                  </text>
                );
              })}

              {/* 手組名(8拍の領域の上の専用の行に縦書きで並べる) */}
              {slot.fragments.map((frag, fi) => {
                if (!frag.isFirstFragment) return null;
                const namedCount = slot.fragments.filter((f) => f.isFirstFragment).length;
                const nameOrder = slot.fragments
                  .slice(0, fi)
                  .filter((f) => f.isFirstFragment).length;
                const nameBand = HEADER_ROW_HEIGHT / Math.max(1, namedCount);
                const nameAnchorY = MARGIN_TOP + (nameOrder + 1) * nameBand - 4;
                const nameFontSize = 9;
                const estimatedNameWidth = frag.teId.length * nameFontSize * 0.62;
                const maxNameWidth = nameBand - 8;
                return (
                  <text
                    key={`name-${frag.instanceIndex}`}
                    x={teColCenterX}
                    y={nameAnchorY}
                    fontSize={nameFontSize}
                    textAnchor="start"
                    className="te-instance-label"
                    transform={`rotate(-90 ${teColCenterX} ${nameAnchorY})`}
                    textLength={estimatedNameWidth > maxNameWidth ? maxNameWidth : undefined}
                    lengthAdjust="spacingAndGlyphs"
                  >
                    {frag.teId}
                  </text>
                );
              })}

              {/* 小鼓の掛け声・手(色は楽器ごとに決まる) */}
              {(teItemsByKusari.get(kusariIndex) ?? []).map((item) => {
                if (item.beatIndex >= slot.beatCount) return null;
                const color = INSTRUMENT_COLOR[item.instrument];
                if (item.kind === "kakegoe") {
                  return (
                    <text
                      key={item.key}
                      x={teColCenterX}
                      y={posY(item.beatIndex, item.sub) - BEAT_HEIGHT * 0.2}
                      dominantBaseline="middle"
                      fontSize={10}
                      textAnchor="middle"
                      fill={color}
                    >
                      {item.text}
                    </text>
                  );
                }
                const glyph = item.te
                  ? TE_GLYPH_MASTER[item.instrument]?.[item.te]
                  : undefined;
                if (!glyph) return null;
                return (
                  <TeMark
                    key={item.key}
                    cx={teColCenterX}
                    cy={posY(item.beatIndex, item.sub) + TIMING_Y_OFFSET[item.timing ?? "on"]}
                    shape={glyph.shape}
                    color={color}
                    label={glyph.label}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function ScoreView({ song, teMaster }: Props) {
  const globalStarts = useMemo(
    () => computeGlobalStarts(song.kusari_sequence),
    [song.kusari_sequence],
  );

  const allFragments = useMemo(
    () =>
      computeTeFragments(
        song.tracks.kotsuzumi?.te_instances ?? [],
        teMaster,
        song.kusari_sequence,
        globalStarts,
      ),
    [song.tracks.kotsuzumi, teMaster, song.kusari_sequence, globalStarts],
  );

  /**
   * クサリ末尾の拍の裏は、次のクサリの1拍目の半拍前(beatIndex -1)に送る。
   * 次のクサリが無い場合はその場に残す。
   */
  const resolvePosition = useMemo(() => {
    return (kusariIndex: number, beatIndex: number, sub: UtaiSub) => {
      const kusari = song.kusari_sequence[kusariIndex];
      if (!kusari) return null;
      const beatCount = KUSARI_BEAT_COUNT[kusari.type];
      if (
        sub === "ura" &&
        beatIndex === beatCount - 1 &&
        kusariIndex + 1 < song.kusari_sequence.length
      ) {
        return { kusariIndex: kusariIndex + 1, beatIndex: -1 };
      }
      return { kusariIndex, beatIndex };
    };
  }, [song.kusari_sequence]);

  const utaiEntriesByKusari = useMemo(() => {
    const map = new Map<number, UtaiCell[]>();
    (song.tracks.utai?.chars ?? []).forEach((c) => {
      if (!c.content) return;
      // beatは1始まり(0は「0拍裏」)なので0始まりに直す
      const pos = resolvePosition(c.beat_ref.kusari_index, c.beat_ref.beat - 1, c.sub);
      if (!pos) return;
      const list = map.get(pos.kusariIndex) ?? [];
      list.push({ beatIndex: pos.beatIndex, sub: c.sub, value: c.content.value });
      map.set(pos.kusariIndex, list);
    });
    return map;
  }, [song.tracks.utai, resolvePosition]);

  const teItemsByKusari = useMemo(() => {
    const map = new Map<number, TeRenderItem[]>();
    const push = (kusariIndex: number, item: TeRenderItem) => {
      const list = map.get(kusariIndex) ?? [];
      list.push(item);
      map.set(kusariIndex, list);
    };
    allFragments.forEach((frag) => {
      const def = teMaster[frag.teId];
      if (!def) return;
      const kusari = song.kusari_sequence[frag.kusariIndex];
      if (!kusari) return;
      const beatCount = KUSARI_BEAT_COUNT[kusari.type];
      /** 手組内の相対位置を、描画先のクサリ・拍に解決する(範囲外はnull) */
      const place = (relBeat: number, sub: UtaiSub) => {
        const beatIndex =
          frag.instanceGlobalStart + relBeat - globalStarts[frag.kusariIndex];
        // 手組の頭より前の「0拍裏」は先頭フラグメントに限って1拍分手前まで許容する
        const lowerBound =
          sub === "ura" && frag.isFirstFragment ? frag.localStart - 1 : frag.localStart;
        if (beatIndex < lowerBound || beatIndex >= frag.localEnd) return null;
        if (beatIndex < -1 || beatIndex >= beatCount) return null;
        return resolvePosition(frag.kusariIndex, beatIndex, sub);
      };
      const fragKey = `${frag.instanceIndex}-${frag.kusariIndex}`;
      def.internal_pattern.kakegoe.forEach((kg, ki) => {
        const sub = kg.sub ?? "omote";
        const pos = place(kg.rel_beat, sub);
        if (!pos) return;
        push(pos.kusariIndex, {
          key: `kg-${fragKey}-${ki}`,
          beatIndex: pos.beatIndex,
          sub,
          kind: "kakegoe",
          instrument: def.instrument,
          text: kg.text,
        });
      });
      def.internal_pattern.hits.forEach((hit, hi) => {
        const sub = hit.sub ?? "omote";
        const pos = place(hit.rel_beat, sub);
        if (!pos) return;
        push(pos.kusariIndex, {
          key: `hit-${fragKey}-${hi}`,
          beatIndex: pos.beatIndex,
          sub,
          kind: "hit",
          instrument: def.instrument,
          te: hit.te,
          timing: hit.timing,
        });
      });
    });
    return map;
  }, [allFragments, teMaster, song.kusari_sequence, globalStarts, resolvePosition]);

  const rowsPerPage = useMemo(() => Math.max(...Object.values(KUSARI_BEAT_COUNT)), []);

  const pages = useMemo(() => {
    const totalKusari = song.kusari_sequence.length;
    const pageCount = Math.max(1, Math.ceil(totalKusari / KUSARI_PER_PAGE));
    return Array.from({ length: pageCount }, (_, p) =>
      Array.from({ length: KUSARI_PER_PAGE }, (_, slot) => {
        const kusariIndex = p * KUSARI_PER_PAGE + slot;
        return kusariIndex < totalKusari ? kusariIndex : null;
      }),
    );
  }, [song.kusari_sequence.length]);

  return (
    <div className="score-pages">
      {pages.map((slotKusariIndices, pageIndex) => (
        <ScorePage
          key={pageIndex}
          song={song}
          allFragments={allFragments}
          utaiEntriesByKusari={utaiEntriesByKusari}
          teItemsByKusari={teItemsByKusari}
          rowsPerPage={rowsPerPage}
          slotKusariIndices={slotKusariIndices}
          pageNumber={pageIndex + 1}
        />
      ))}
    </div>
  );
}
