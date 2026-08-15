// 打ち方(timing)による、手を描く位置の上下のずれ。
//
// ずれ幅は1拍の高さに対する比で持つ。手付の出力とプレビューでは
// 1拍の高さが違うため、それぞれの高さに掛けて使う。
import type { Timing } from "../../types";

export const TIMING_OFFSET_RATIO: Record<Timing, number> = {
  slightly_early: -0.18,
  on: 0,
  slightly_late: 0.18,
};

/** 打ち方に応じた、1拍の高さ beatHeight でのずれ量(y方向) */
export function timingOffsetY(timing: Timing, beatHeight: number): number {
  return TIMING_OFFSET_RATIO[timing] * beatHeight;
}
