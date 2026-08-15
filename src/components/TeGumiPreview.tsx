// 手組1つ分のプレビュー。
//
// 手付の出力画面と同じ描き方で、白地に表拍の横線を引き、
// その上に手・掛け声・補助線を置く。横線は0拍の表から、
// 長さ拍の表まで(手組が届く範囲)。
import type { Instrument, InternalPattern } from "../types";
import { INSTRUMENT_COLOR, TE_GLYPH_MASTER } from "../data/instruments";
import { VerticalText } from "./score/VerticalText";
import { TeMark } from "./score/TeMark";
import { GuideMark } from "./score/GuideMark";
import { timingOffsetY } from "../logic/timing";

interface Props {
  pattern: InternalPattern;
  instrument: Instrument;
}

/**
 * 描画は手付と同じ大きさの座標で組み、最後にまとめて拡大する。
 * こうすると手・文字・線の太さの比率が手付とそのまま同じになる。
 */
const SCALE = 1.8;

const BEAT_HEIGHT = 44;
const COL_WIDTH = 36;
const AXIS_WIDTH = 22;
const MARGIN_X = 10;
/** 上下に空ける余白(半拍分) */
const PAD_Y = BEAT_HEIGHT / 2;

const KAKEGOE_FONT_SIZE = 10;
const KAKEGOE_CHAR_HEIGHT = 11;
const AXIS_FONT_SIZE = 11;
/** 補助線と重なる掛け声を、右にずらす量 */
const KAKEGOE_GUIDE_DX = 6;

export function TeGumiPreview({ pattern, instrument }: Props) {
  const color = INSTRUMENT_COLOR[instrument];
  const glyphs = TE_GLYPH_MASTER[instrument];

  const width = MARGIN_X * 2 + COL_WIDTH + AXIS_WIDTH;
  const height = PAD_Y * 2 + pattern.length * BEAT_HEIGHT;
  const cx = MARGIN_X + COL_WIDTH / 2;
  const axisX = MARGIN_X + COL_WIDTH + AXIS_WIDTH / 2;
  /** 手組の頭からの相対位置(半拍単位) → y座標 */
  const posY = (relPos: number) => PAD_Y + (relPos / 2) * BEAT_HEIGHT;

  /** 補助線と重なる掛け声は少し右にずらして避ける */
  const onGuide = (relPos: number) =>
    (pattern.guides ?? []).some(
      (g) =>
        relPos >= Math.min(g.from_pos, g.to_pos) &&
        relPos <= Math.max(g.from_pos, g.to_pos),
    );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * SCALE}
      height={height * SCALE}
      className="te-preview"
      role="img"
      aria-label="手組のプレビュー"
    >
      {/* 表拍の横線。0拍の表から長さ拍の表まで */}
      {Array.from({ length: pattern.length + 1 }, (_, beat) => (
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
      ))}

      {/* 補助線は手より先に描き、手と重なる部分は手の下に隠す */}
      {(pattern.guides ?? []).map((guide, i) => (
        <GuideMark
          key={i}
          cx={cx}
          y1={posY(guide.from_pos) + timingOffsetY(guide.from_timing ?? "on", BEAT_HEIGHT)}
          y2={posY(guide.to_pos) + timingOffsetY(guide.to_timing ?? "on", BEAT_HEIGHT)}
          shape={guide.shape}
          color={color}
        />
      ))}

      {pattern.kakegoe.map((kg, i) => (
        <VerticalText
          key={i}
          cx={cx + (onGuide(kg.rel_pos) ? KAKEGOE_GUIDE_DX : 0)}
          cy={posY(kg.rel_pos)}
          text={kg.text}
          color={color}
          fontSize={KAKEGOE_FONT_SIZE}
          charHeight={KAKEGOE_CHAR_HEIGHT}
        />
      ))}

      {pattern.hits.map((hit, i) => {
        const glyph = glyphs[hit.te];
        if (!glyph) return null;
        return (
          <TeMark
            key={i}
            cx={cx}
            cy={posY(hit.rel_pos) + timingOffsetY(hit.timing, BEAT_HEIGHT)}
            shape={glyph.shape}
            color={color}
            label={glyph.label}
          />
        );
      })}
    </svg>
  );
}
