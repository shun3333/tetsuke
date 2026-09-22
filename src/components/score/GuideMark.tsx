// 手と手の間の補助線1本。まっすぐな線と、途中で折れる「くの字」の2種類。
// 手付の描画と、マスタ編集画面のプレビューの両方から使う。
import type { GuideShape } from "../../types";

/** 補助線の太さと、くの字の折れ幅(列の中心からの左へのずれ) */
export const GUIDE_WIDTH = 1.2;
export const GUIDE_BEND = 8;

interface Props {
  /** 列の中心 */
  cx: number;
  y1: number;
  y2: number;
  shape: GuideShape;
  color: string;
}

export function GuideMark({ cx, y1, y2, shape, color }: Props) {
  if (shape === "straight") {
    return (
      <line
        x1={cx}
        x2={cx}
        y1={y1}
        y2={y2}
        stroke={color}
        strokeWidth={GUIDE_WIDTH}
      />
    );
  }

  // くの字。中ほどで左に折れる
  const midY = (y1 + y2) / 2;
  return (
    <polyline
      points={`${cx},${y1} ${cx - GUIDE_BEND},${midY} ${cx},${y2}`}
      fill="none"
      stroke={color}
      strokeWidth={GUIDE_WIDTH}
      strokeLinejoin="round"
    />
  );
}
