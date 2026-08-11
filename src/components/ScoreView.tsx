// 描画ビュー: 座標計算レイヤー(logic/position)を使い、SVGで縦書き風に手付を描画する
import { useMemo } from "react";
import {
  KUSARI_LABEL,
  type SongData,
  type TeMaster,
  type Timing,
} from "../types";
import {
  computeGlobalStarts,
  isBeatRefValid,
  totalBeats,
} from "../logic/position";
import { VerticalLabel } from "./VerticalLabel";

interface Props {
  song: SongData;
  teMaster: TeMaster;
}

const BEAT_HEIGHT = 32;
const MARGIN_TOP = 30;
const MARGIN_BOTTOM = 30;
const MARGIN_LEFT = 24;
const KOTSUZUMI_COL_WIDTH = 170;
const GAP = 30;
const UTAI_COL_WIDTH = 60;
const AXIS_WIDTH = 60;
const MARGIN_RIGHT = 16;

const TIMING_Y_OFFSET: Record<Timing, number> = {
  slightly_early: -7,
  on: 0,
  slightly_late: 7,
};

export function ScoreView({ song, teMaster }: Props) {
  const globalStarts = useMemo(
    () => computeGlobalStarts(song.kusari_sequence),
    [song.kusari_sequence],
  );
  const total = useMemo(
    () => totalBeats(song.kusari_sequence),
    [song.kusari_sequence],
  );

  const kotsuzumiColX = MARGIN_LEFT;
  const utaiColX = kotsuzumiColX + KOTSUZUMI_COL_WIDTH + GAP;
  const axisX = utaiColX + UTAI_COL_WIDTH + 6;

  const width = axisX + AXIS_WIDTH + MARGIN_RIGHT;
  const height = MARGIN_TOP + total * BEAT_HEIGHT + MARGIN_BOTTOM;

  const yOfGlobalBeat = (b: number) => MARGIN_TOP + b * BEAT_HEIGHT;

  const utaiChars = song.tracks.utai?.chars ?? [];
  const teInstances = song.tracks.kotsuzumi?.te_instances ?? [];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className="score-view"
      role="img"
      aria-label={`${song.song_id} 手付譜`}
    >
      {/* クサリ境界線・ラベル(右端の軸) */}
      {song.kusari_sequence.map((k, i) => {
        const start = globalStarts[i];
        const yTop = yOfGlobalBeat(start);
        const len =
          i + 1 < globalStarts.length
            ? globalStarts[i + 1] - start
            : total - start;
        const yMid = yOfGlobalBeat(start + len / 2);
        return (
          <g key={k.index}>
            <line
              x1={kotsuzumiColX}
              x2={axisX + AXIS_WIDTH - 20}
              y1={yTop}
              y2={yTop}
              stroke="var(--kusari-line)"
              strokeDasharray="2 3"
            />
            <VerticalLabel
              text={KUSARI_LABEL[k.type]}
              x={axisX + 14}
              y={yMid - 6}
              fontSize={12}
              charHeight={14}
              className="kusari-label"
            />
          </g>
        );
      })}
      {/* 曲全体の下端線 */}
      <line
        x1={kotsuzumiColX}
        x2={axisX + AXIS_WIDTH - 20}
        y1={yOfGlobalBeat(total)}
        y2={yOfGlobalBeat(total)}
        stroke="var(--kusari-line)"
      />

      {/* 謡トラック(表/裏) */}
      <line
        x1={utaiColX + UTAI_COL_WIDTH / 2}
        x2={utaiColX + UTAI_COL_WIDTH / 2}
        y1={MARGIN_TOP}
        y2={yOfGlobalBeat(total)}
        stroke="var(--track-guide)"
      />
      {utaiChars.map((c, i) => {
        if (!isBeatRefValid(c.beat_ref, song.kusari_sequence) || !c.content) {
          return null;
        }
        const g = globalStarts[c.beat_ref.kusari_index] + (c.beat_ref.beat - 1);
        const y = yOfGlobalBeat(g) + BEAT_HEIGHT / 2 + 4;
        const x =
          c.sub === "omote"
            ? utaiColX + UTAI_COL_WIDTH / 2 + 14
            : utaiColX + UTAI_COL_WIDTH / 2 - 14;
        return (
          <text
            key={i}
            x={x}
            y={y}
            fontSize={16}
            textAnchor="middle"
            className={c.sub === "omote" ? "utai-omote" : "utai-ura"}
          >
            {c.content.value}
          </text>
        );
      })}

      {/* 小鼓 手組トラック */}
      {teInstances.map((ti, i) => {
        const def = teMaster[ti.te_id];
        if (!def) return null;
        if (!isBeatRefValid(ti.start_ref, song.kusari_sequence)) return null;
        const startGlobal =
          globalStarts[ti.start_ref.kusari_index] + (ti.start_ref.beat - 1);
        const endGlobal = startGlobal + def.internal_pattern.length;
        const yTop = yOfGlobalBeat(startGlobal);
        const yBottom = yOfGlobalBeat(endGlobal);
        const colCenter = kotsuzumiColX + KOTSUZUMI_COL_WIDTH / 2;
        return (
          <g key={i}>
            <rect
              x={kotsuzumiColX}
              y={yTop + 2}
              width={KOTSUZUMI_COL_WIDTH}
              height={yBottom - yTop - 4}
              rx={4}
              className="te-instance-box"
            />
            <text
              x={kotsuzumiColX + KOTSUZUMI_COL_WIDTH - 6}
              y={yTop - 5}
              fontSize={11}
              textAnchor="end"
              className="te-instance-label"
            >
              {ti.te_id}
            </text>
            {def.internal_pattern.kakegoe.map((kg, ki) => {
              const y = yOfGlobalBeat(startGlobal + kg.rel_beat) + 14;
              return (
                <text
                  key={`kg-${ki}`}
                  x={colCenter + 30}
                  y={y}
                  fontSize={13}
                  textAnchor="middle"
                  className="kakegoe-text"
                >
                  {kg.text}
                </text>
              );
            })}
            {def.internal_pattern.hits.map((hit, hi) => {
              const y =
                yOfGlobalBeat(startGlobal + hit.rel_beat) +
                BEAT_HEIGHT / 2 +
                TIMING_Y_OFFSET[hit.timing];
              return (
                <circle
                  key={`hit-${hi}`}
                  cx={colCenter - 40}
                  cy={y}
                  r={4}
                  className="hit-mark"
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
