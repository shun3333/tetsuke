// 手(打ち方)の記号。どの図形を描くかは手マスタの shape で決まる。
import type { TeShape } from "../../types";
import { PAPER_COLOR } from "./paper";

const RADIUS = 4.5;
const SMALL_RADIUS = 2.8;
const STROKE_WIDTH = 1.3;

interface Props {
  cx: number;
  cy: number;
  shape: TeShape;
  color: string;
  /** ツールチップに出す手の名前(プ / ポ / チ / タ) */
  label: string;
}

/**
 * 手マスタで指定された図形を描く。
 * 中抜きの図形は白で塗りつぶし、下に重なる罫線が透けないようにする。
 */
export function TeMark({ cx, cy, shape, color, label }: Props) {
  const title = <title>{label}</title>;
  switch (shape) {
    case "filled_small_circle":
      return (
        <circle cx={cx} cy={cy} r={SMALL_RADIUS} fill={color}>
          {title}
        </circle>
      );

    case "open_circle":
      return (
        <circle
          cx={cx}
          cy={cy}
          r={RADIUS}
          fill={PAPER_COLOR}
          stroke={color}
          strokeWidth={STROKE_WIDTH}
        >
          {title}
        </circle>
      );

    case "open_circle_barred":
      // 横線は丸からはみ出さないよう、丸と同じ横幅にする
      return (
        <g>
          {title}
          <circle
            cx={cx}
            cy={cy}
            r={RADIUS}
            fill={PAPER_COLOR}
            stroke={color}
            strokeWidth={STROKE_WIDTH}
          />
          <line
            x1={cx - RADIUS}
            x2={cx + RADIUS}
            y1={cy}
            y2={cy}
            stroke={color}
            strokeWidth={STROKE_WIDTH}
          />
        </g>
      );

    case "open_triangle": {
      const points = [
        `${cx},${cy - RADIUS}`,
        `${cx + RADIUS},${cy + RADIUS * 0.8}`,
        `${cx - RADIUS},${cy + RADIUS * 0.8}`,
      ].join(" ");
      return (
        <polygon points={points} fill={PAPER_COLOR} stroke={color} strokeWidth={STROKE_WIDTH}>
          {title}
        </polygon>
      );
    }
  }
}
