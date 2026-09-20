// 唱歌の1枠分の描画。手付とマスタ編集画面のプレビューで共通に使う。
//
// 文字ごとの調整(○・小文字・縦幅・字間・ずらし)の読み方は
// logic/shogaChar.ts にまとめてあり、ここはそれを図形に落とすだけ。
import type { ShogaChar } from "../../types";
import { heightScaleTransform, shogaCharLayout } from "../../logic/shogaChar";
import { VerticalText } from "./VerticalText";
import { PAPER_COLOR } from "./paper";

/** ○の、文字の大きさに対する半径の比。1文字分の枠に収まる大きさ */
const CIRCLE_RADIUS_RATIO = 0.4;
const CIRCLE_STROKE_WIDTH = 1.3;

interface Props {
  char: ShogaChar;
  /** 調整を当てはめる前の、枠の中心 */
  cx: number;
  cy: number;
  /** 調整を当てはめる前の、文字の大きさ */
  fontSize: number;
  charHeight: number;
  color: string;
}

export function ShogaGlyph({ char, cx, cy, fontSize, charHeight, color }: Props) {
  const at = shogaCharLayout(char, cx, cy, fontSize, charHeight);
  return (
    <g transform={heightScaleTransform(at.cy, at.heightScale)}>
      {char.circle ? (
        // ○を置く枠では文字は書かない。中は紙の色で塗り、
        // 下に重なる拍の横線が透けないようにする(手の丸と同じ)
        <circle
          cx={at.cx}
          cy={at.cy}
          r={at.fontSize * CIRCLE_RADIUS_RATIO}
          fill={PAPER_COLOR}
          stroke={color}
          strokeWidth={CIRCLE_STROKE_WIDTH}
        />
      ) : (
        <VerticalText
          cx={at.cx}
          cy={at.cy}
          text={char.text}
          color={color}
          fontSize={at.fontSize}
          charHeight={at.charHeight}
          step={at.step}
        />
      )}
    </g>
  );
}
