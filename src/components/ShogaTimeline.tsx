// 唱歌1まとまり分の編集用タイムライン。
//
// 入力は謡と同じ形にしてある。1拍につき枠が2つ(左が裏・右が表)で、
// 半拍単位の枠番号(beat)で見ると
//   左 = 2b-1((b-1)拍の裏 / b=1なら0拍の裏)
//   右 = 2b  (b拍の表)
// となり、左から右へ 1, 2, 3, … と連続する。8拍なら16枠。
import { useRef } from "react";
import type { ShogaChar } from "../types";

interface Props {
  /** 何拍分のまとまりか */
  length: number;
  chars: ShogaChar[];
  onChange: (chars: ShogaChar[]) => void;
}

/** 1拍あたりの入力欄の数(裏・表) */
const SLOTS_PER_BEAT = 2;

export function ShogaTimeline({ length, chars, onChange }: Props) {
  const inputRefs = useRef(new Map<number, HTMLInputElement>());
  const textAt = new Map(chars.map((c) => [c.beat, c.text]));
  const beats = Array.from({ length }, (_, i) => i + 1);

  /** 枠に収まらない位置のものは、ここでは編集できない */
  const lastBeat = length * SLOTS_PER_BEAT;
  const outside = chars.filter((c) => c.beat < 1 || c.beat > lastBeat).length;

  function setText(beat: number, text: string) {
    const rest = chars.filter((c) => c.beat !== beat);
    const next = text === "" ? rest : [...rest, { beat, text }];
    onChange(next.sort((a, b) => a.beat - b.beat));
  }

  /** 左右の枠へ移る。端まで来たらそこで止まる */
  function focusBeat(beat: number, caret: "start" | "end") {
    const el = inputRefs.current.get(beat);
    if (!el) return;
    el.focus();
    if (caret === "start") el.setSelectionRange(0, 0);
    else el.setSelectionRange(el.value.length, el.value.length);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, beat: number) {
    const input = e.currentTarget;
    const atStart = input.selectionStart === 0 && input.selectionEnd === 0;
    const atEnd =
      input.selectionStart === input.value.length &&
      input.selectionEnd === input.value.length;
    switch (e.key) {
      case "ArrowLeft":
        if (atStart) {
          e.preventDefault();
          focusBeat(beat - 1, "end");
        }
        break;
      case "ArrowRight":
        if (atEnd) {
          e.preventDefault();
          focusBeat(beat + 1, "start");
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        focusBeat(beat - 1, "end");
        break;
      case "ArrowDown":
        e.preventDefault();
        focusBeat(beat + 1, "start");
        break;
      default:
        break;
    }
  }

  return (
    <div className="shoga-timeline-wrap">
      <table className="timeline-grid shoga-timeline">
        <thead>
          <tr>
            <th className="row-label"></th>
            {/* 拍数。数字は「表」の入力欄(セルの右半分)の真上に置く */}
            {beats.map((beat) => (
              <th key={beat} className="beat-header">
                <span className="beat-header-omote">{beat}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="row-label">唱歌</th>
            {beats.map((beat) => {
              // 表(=横線の上)は 2b、その半拍前の裏は 2b-1
              const omote = beat * SLOTS_PER_BEAT;
              return (
                <td key={beat} className="utai-cell">
                  <div className="utai-cell-inner">
                    {[omote - 1, omote].map((slot) => (
                      <input
                        key={slot}
                        ref={(el) => {
                          if (el) inputRefs.current.set(slot, el);
                          else inputRefs.current.delete(slot);
                        }}
                        className="utai-input"
                        title={`${Math.floor(slot / 2)}拍の${slot % 2 === 0 ? "表" : "裏"}`}
                        value={textAt.get(slot) ?? ""}
                        onChange={(e) => setText(slot, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, slot)}
                      />
                    ))}
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <p className="te-timeline-note hint">
        1拍につき枠が2つで、左が裏・右が表。一番左の枠は0拍の裏です。
      </p>
      {outside > 0 && (
        <p className="te-timeline-note">
          この表に収まらない位置のものが{outside}件あります。拍数を伸ばすと編集できます。
        </p>
      )}
    </div>
  );
}
