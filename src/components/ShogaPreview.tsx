// 唱歌1まとまり分のプレビュー。
//
// 手付の出力画面と同じ描き方で、白地に表拍の横線を引き、
// その上に唱歌の文字を縦に並べる。横線は謡の列と同じく1拍から拍数分まで
// (一番上の枠である0拍の裏は、1拍の線の半拍上に来る)。
import type { ShogaChar } from "../types";
import { VerticalText } from "./score/VerticalText";

interface Props {
  length: number;
  chars: ShogaChar[];
}

/**
 * 描画は手付と同じ大きさの座標で組み、最後にまとめて拡大する。
 * こうすると文字と線の太さの比率が手付とそのまま同じになる。
 */
const SCALE = 1.8;

const BEAT_HEIGHT = 44;
const COL_WIDTH = 44;
const AXIS_WIDTH = 22;
const MARGIN_X = 10;
/** 1拍の線の上に空ける余白。0拍の裏(半拍上)の文字が入るだけ取る */
const PAD_TOP = BEAT_HEIGHT;
/** 一番下の線の下に空ける余白(半拍分) */
const PAD_BOTTOM = BEAT_HEIGHT / 2;

const FONT_SIZE = 14;
const CHAR_HEIGHT = 15;
const AXIS_FONT_SIZE = 11;

/** 唱歌の色。手付では墨で書くので黒 */
const INK_COLOR = "#000000";

export function ShogaPreview({ length, chars }: Props) {
  const width = MARGIN_X * 2 + COL_WIDTH + AXIS_WIDTH;
  const height = PAD_TOP + (length - 1) * BEAT_HEIGHT + PAD_BOTTOM;
  const cx = MARGIN_X + COL_WIDTH / 2;
  const axisX = MARGIN_X + COL_WIDTH + AXIS_WIDTH / 2;
  /**
   * 半拍単位の枠番号 → y座標。
   * beat: 2 が1拍の表(= 一番上の横線)、1 はその半拍上の0拍の裏にあたる。
   */
  const posY = (beat: number) => PAD_TOP + (beat / 2 - 1) * BEAT_HEIGHT;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * SCALE}
      height={height * SCALE}
      className="te-preview"
      role="img"
      aria-label="唱歌のプレビュー"
    >
      {/* 表拍の横線。1拍から拍数分まで(手付の謡の列と同じ) */}
      {Array.from({ length }, (_, i) => {
        const beat = i + 1;
        return (
          <g key={beat}>
            <line
              x1={MARGIN_X}
              x2={MARGIN_X + COL_WIDTH}
              y1={posY(beat * 2)}
              y2={posY(beat * 2)}
              className="skewer-line"
            />
            <text
              x={axisX}
              y={posY(beat * 2)}
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize={AXIS_FONT_SIZE}
              className="beat-axis-text"
            >
              {beat}
            </text>
          </g>
        );
      })}

      {chars.map((c, i) => (
        <VerticalText
          key={i}
          cx={cx}
          cy={posY(c.beat)}
          text={c.text}
          color={INK_COLOR}
          fontSize={FONT_SIZE}
          charHeight={CHAR_HEIGHT}
        />
      ))}
    </svg>
  );
}
