// 描画ビュー: 手付をA4用紙相当のページ単位に分割して描画する。
// 1ページ = 固定8クサリ枠(データが無い枠は空白)。クサリは右→左、
// 各クサリ枠内は左に謡・右に小鼓の手組(専用の箱)を配置し、
// 拍数の軸はページ右端に1つだけ表示する。
import { useMemo } from "react";
import {
  KUSARI_BEAT_COUNT,
  type HitColor,
  type HitSymbol,
  type SongData,
  type TeMaster,
  type Timing,
  type UtaiSub,
} from "../types";
import {
  computeGlobalStarts,
  computeTeFragments,
  type TeFragment,
} from "../logic/position";

interface Props {
  song: SongData;
  teMaster: TeMaster;
}

const BEAT_HEIGHT = 32;
const HEADER_ROW_HEIGHT = 80;
const MARGIN_TOP = 16;
const MARGIN_BOTTOM = 20;
// 1拍目の横線の上に確保する余白(半拍分の「0拍裏」+ 半拍分の余白)
const TOP_PAD = BEAT_HEIGHT;
// 最終拍の横線の下に確保する余白(半拍分の裏 + 半拍分の余白)
const BOTTOM_PAD = BEAT_HEIGHT;
const MARGIN_LEFT = 16;
const MARGIN_RIGHT = 16;
// 謡:小鼓の枠の横幅は概ね2:1
const TE_COL_WIDTH = 22;
const UTAI_COL_WIDTH = 44;
const AXIS_COL_WIDTH = 22;
const KUSARI_PER_PAGE = 8;
/** 見やすさのため太線にする拍(1始まり) */
const THICK_BEATS = new Set([1, 3, 5, 8]);
const GRID_TOP = MARGIN_TOP + HEADER_ROW_HEIGHT;

const TIMING_Y_OFFSET: Record<Timing, number> = {
  slightly_early: -BEAT_HEIGHT * 0.18,
  on: 0,
  slightly_late: BEAT_HEIGHT * 0.18,
};

const HIT_COLOR: Record<HitColor, string> = {
  blue: "#2266dd",
  red: "#cc2222",
};

interface HitMarkProps {
  cx: number;
  cy: number;
  symbol: HitSymbol;
  color: HitColor;
}

function HitMark({ cx, cy, symbol, color }: HitMarkProps) {
  const stroke = HIT_COLOR[color];
  if (symbol === "filled_circle") {
    return <circle cx={cx} cy={cy} r={3.5} fill={stroke} />;
  }
  if (symbol === "open_circle") {
    return <circle cx={cx} cy={cy} r={3.5} fill="none" stroke={stroke} strokeWidth={1.3} />;
  }
  const r = 4.5;
  const points = `${cx},${cy - r} ${cx + r},${cy + r * 0.8} ${cx - r},${cy + r * 0.8}`;
  return <polygon points={points} fill="none" stroke={stroke} strokeWidth={1.3} />;
}

/** 描画用に展開した謡の1枠。beatは1始まり(0は「0拍裏」を表す) */
interface UtaiCell {
  beat: number;
  sub: UtaiSub;
  value: string;
}

/**
 * 掛け声/手がそのフラグメント(=クサリ内に収まる範囲)に描画されるべきかを判定する。
 * 裏は半拍下にずれるため、手組の頭より前の「0拍裏」(rel_beat: -1, sub: "ura")は
 * 手組の先頭フラグメントに限って1拍分手前まで許容する。
 */
function isVisibleInFragment(
  localBeat: number,
  sub: UtaiSub,
  frag: TeFragment,
  kusariBeatCount: number,
): boolean {
  const lowerBound =
    sub === "ura" && frag.isFirstFragment ? frag.localStart - 1 : frag.localStart;
  if (localBeat < lowerBound || localBeat >= frag.localEnd) return false;
  return localBeat >= -1 && localBeat < kusariBeatCount;
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
  teMaster: TeMaster;
  globalStarts: number[];
  allFragments: TeFragment[];
  utaiEntriesByKusari: Map<number, UtaiCell[]>;
  rowsPerPage: number;
  slotKusariIndices: (number | null)[];
  pageNumber: number;
}

function ScorePage({
  song,
  teMaster,
  globalStarts,
  allFragments,
  utaiEntriesByKusari,
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
              {/* 謡(表は横線の上、裏は線と線の間。beat 0 の裏は1拍目の線の上に出る) */}
              {(utaiEntriesByKusari.get(kusariIndex) ?? []).map((entry: UtaiCell, i: number) => {
                // beatは1始まり、0は「0拍裏」(1拍目の線の半拍上)
                const beatIndex = entry.beat - 1;
                if (beatIndex >= slot.beatCount) return null;
                return (
                  <text
                    key={i}
                    x={slot.utaiColX + UTAI_COL_WIDTH / 2}
                    y={posY(beatIndex, entry.sub)}
                    dominantBaseline="middle"
                    fontSize={14}
                    textAnchor="middle"
                    className="utai-text"
                  >
                    {entry.value}
                  </text>
                );
              })}

              {/* 小鼓 手組(クサリごとに1列、右側) */}
              {slot.fragments.map((frag, fi) => {
                const def = teMaster[frag.teId];
                if (!def) return null;
                const colX = slot.teColX + TE_COL_WIDTH / 2;
                // 手組名はヘッダー行を「名前を表示する手組の数」で分割して縦書きで並べる
                // (前のクサリから続くフラグメントは名前を出さないので数に含めない)
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
                  <g key={`${frag.instanceIndex}-${frag.kusariIndex}`}>
                    {frag.isFirstFragment && (
                      <text
                        x={colX}
                        y={nameAnchorY}
                        fontSize={nameFontSize}
                        textAnchor="start"
                        className="te-instance-label"
                        transform={`rotate(-90 ${colX} ${nameAnchorY})`}
                        textLength={
                          estimatedNameWidth > maxNameWidth ? maxNameWidth : undefined
                        }
                        lengthAdjust="spacingAndGlyphs"
                      >
                        {frag.teId}
                      </text>
                    )}
                    {def.internal_pattern.kakegoe.map((kg, ki) => {
                      const sub = kg.sub ?? "omote";
                      const localBeat =
                        frag.instanceGlobalStart + kg.rel_beat - globalStarts[kusariIndex];
                      if (!isVisibleInFragment(localBeat, sub, frag, slot.beatCount)) return null;
                      return (
                        <text
                          key={`kg-${ki}`}
                          x={colX}
                          y={posY(localBeat, sub) - BEAT_HEIGHT * 0.2}
                          dominantBaseline="middle"
                          fontSize={10}
                          textAnchor="middle"
                          className="kakegoe-text"
                          fill={kg.color ? HIT_COLOR[kg.color] : undefined}
                        >
                          {kg.text}
                        </text>
                      );
                    })}
                    {def.internal_pattern.hits.map((hit, hi) => {
                      const sub = hit.sub ?? "omote";
                      const localBeat =
                        frag.instanceGlobalStart + hit.rel_beat - globalStarts[kusariIndex];
                      if (!isVisibleInFragment(localBeat, sub, frag, slot.beatCount)) return null;
                      return (
                        <HitMark
                          key={`hit-${hi}`}
                          cx={colX}
                          cy={posY(localBeat, sub) + TIMING_Y_OFFSET[hit.timing]}
                          symbol={hit.symbol}
                          color={hit.color ?? "blue"}
                        />
                      );
                    })}
                  </g>
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

  const utaiEntriesByKusari = useMemo(() => {
    const map = new Map<number, UtaiCell[]>();
    (song.tracks.utai?.chars ?? []).forEach((c) => {
      if (!c.content) return;
      const list = map.get(c.beat_ref.kusari_index) ?? [];
      list.push({ beat: c.beat_ref.beat, sub: c.sub, value: c.content.value });
      map.set(c.beat_ref.kusari_index, list);
    });
    return map;
  }, [song.tracks.utai]);

  const rowsPerPage = useMemo(
    () => Math.max(...Object.values(KUSARI_BEAT_COUNT)),
    [],
  );

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
          teMaster={teMaster}
          globalStarts={globalStarts}
          allFragments={allFragments}
          utaiEntriesByKusari={utaiEntriesByKusari}
          rowsPerPage={rowsPerPage}
          slotKusariIndices={slotKusariIndices}
          pageNumber={pageIndex + 1}
        />
      ))}
    </div>
  );
}
