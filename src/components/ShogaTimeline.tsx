// 唱歌1まとまり分の編集用タイムライン。
//
// 入力は謡と同じ形にしてある。1拍につき枠が2つ(左が裏・右が表)で、
// 半拍単位の枠番号(beat)で見ると
//   左 = 2b-1((b-1)拍の裏 / b=1なら0拍の裏)
//   右 = 2b  (b拍の表)
// となり、左から右へ 1, 2, 3, … と連続する。8拍なら16枠。
//
// 枠を選ぶと、その文字の見た目(字間・縦幅・縦横のずらし・小文字)を
// 表の下で調整できる。調整済みの枠には印を付ける。
import { useRef, useState } from "react";
import type { ShogaChar } from "../types";
import {
  SHOGA_HEIGHT_MAX,
  SHOGA_HEIGHT_MIN,
  SHOGA_SHIFT_LIMIT,
  SHOGA_SPACING_MAX,
  SHOGA_SPACING_MIN,
  clampHeightScale,
  clampShift,
  clampSpacing,
  hasShogaAdjust,
  tidyShogaChar,
  withoutShogaAdjust,
} from "../logic/shogaChar";
import { countCharUnits } from "../logic/charUnits";

interface Props {
  /** 何拍分のまとまりか */
  length: number;
  chars: ShogaChar[];
  onChange: (chars: ShogaChar[]) => void;
}

/** 1拍あたりの入力欄の数(裏・表) */
const SLOTS_PER_BEAT = 2;

/** 調整の入力欄の刻み。細かく合わせられるよう小さめにする */
const ADJUST_STEP = 0.1;

/** 半拍単位の枠番号 → 「2拍の表」のような読み方 */
function slotLabel(slot: number): string {
  return `${Math.floor(slot / 2)}拍の${slot % 2 === 0 ? "表" : "裏"}`;
}

export function ShogaTimeline({ length, chars, onChange }: Props) {
  const inputRefs = useRef(new Map<number, HTMLInputElement>());
  // 調整する枠。入力欄を選ぶと切り替わり、そのままにしておくと選ばれ続ける
  const [selected, setSelected] = useState<number | null>(null);
  const charAt = new Map(chars.map((c) => [c.beat, c]));
  const beats = Array.from({ length }, (_, i) => i + 1);

  /** 枠に収まらない位置のものは、ここでは編集できない */
  const lastBeat = length * SLOTS_PER_BEAT;
  const outside = chars.filter((c) => c.beat < 1 || c.beat > lastBeat).length;

  // 拍数を縮めて表から消えた枠は、選ばれたままにしない
  const selectedSlot =
    selected !== null && selected >= 1 && selected <= lastBeat ? selected : null;
  const selectedChar = selectedSlot === null ? undefined : charAt.get(selectedSlot);

  function setText(beat: number, text: string) {
    const rest = chars.filter((c) => c.beat !== beat);
    // 文字を書き替えても、その枠に付けた調整はそのまま残す
    const next =
      text === "" ? rest : [...rest, { ...charAt.get(beat), beat, text }];
    onChange(next.sort((a, b) => a.beat - b.beat));
  }

  /** 選んでいる枠の文字の見た目を変える */
  function patchSelected(patch: Partial<ShogaChar>) {
    if (!selectedChar) return;
    onChange(
      chars.map((c) =>
        c.beat === selectedChar.beat ? tidyShogaChar({ ...c, ...patch }) : c,
      ),
    );
  }

  /** 選んでいる枠の調整をすべて外す */
  function resetSelected() {
    if (!selectedChar) return;
    onChange(
      chars.map((c) =>
        c.beat === selectedChar.beat ? withoutShogaAdjust(c) : c,
      ),
    );
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
                    {[omote - 1, omote].map((slot) => {
                      const char = charAt.get(slot);
                      return (
                        <input
                          key={slot}
                          ref={(el) => {
                            if (el) inputRefs.current.set(slot, el);
                            else inputRefs.current.delete(slot);
                          }}
                          className={
                            "utai-input" +
                            (slot === selectedSlot ? " selected" : "") +
                            (char && hasShogaAdjust(char) ? " adjusted" : "")
                          }
                          title={slotLabel(slot)}
                          value={char?.text ?? ""}
                          onChange={(e) => setText(slot, e.target.value)}
                          onFocus={() => setSelected(slot)}
                          onKeyDown={(e) => handleKeyDown(e, slot)}
                        />
                      );
                    })}
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

      {selectedSlot !== null &&
        (selectedChar ? (
          <ShogaAdjust
            key={selectedSlot}
            char={selectedChar}
            onPatch={patchSelected}
            onReset={resetSelected}
          />
        ) : (
          <p className="shoga-adjust-empty hint">
            {slotLabel(selectedSlot)}は空です。文字を入れると、大きさや位置を調整できます。
          </p>
        ))}
    </div>
  );
}

/** 選んでいる枠の文字の見た目を整える欄 */
function ShogaAdjust({
  char,
  onPatch,
  onReset,
}: {
  char: ShogaChar;
  onPatch: (patch: Partial<ShogaChar>) => void;
  onReset: () => void;
}) {
  return (
    <div className="shoga-adjust">
      <span className="shoga-adjust-target">
        {slotLabel(char.beat)}「{char.text}」
      </span>

      <AdjustNumber
        label="字間"
        value={char.spacing ?? 1}
        min={SHOGA_SPACING_MIN}
        max={SHOGA_SPACING_MAX}
        // 1音しか入っていない枠では間隔の出番がないので、触れないようにする
        disabled={countCharUnits(char.text) < 2}
        title={
          countCharUnits(char.text) < 2
            ? "この枠は1音なので、字間は効きません"
            : "1が既定。小さくすると文字どうしが詰まり、大きくすると離れます"
        }
        onChange={(v) => onPatch({ spacing: clampSpacing(v) })}
      />
      <AdjustNumber
        label="縦幅"
        value={char.height_scale ?? 1}
        min={SHOGA_HEIGHT_MIN}
        max={SHOGA_HEIGHT_MAX}
        title="1が既定。小さくすると平たく、大きくすると縦長になります"
        onChange={(v) => onPatch({ height_scale: clampHeightScale(v) })}
      />
      <AdjustNumber
        label="縦ずらし"
        value={char.dy ?? 0}
        min={-SHOGA_SHIFT_LIMIT}
        max={SHOGA_SHIFT_LIMIT}
        title="上が+。1で文字1つ分ずれます"
        onChange={(v) => onPatch({ dy: clampShift(v) })}
      />
      <AdjustNumber
        label="横ずらし"
        value={char.dx ?? 0}
        min={-SHOGA_SHIFT_LIMIT}
        max={SHOGA_SHIFT_LIMIT}
        title="右が+。1で文字1つ分ずれます"
        onChange={(v) => onPatch({ dx: clampShift(v) })}
      />

      <label className="shoga-adjust-check">
        <input
          type="checkbox"
          checked={char.small === true}
          onChange={(e) => onPatch({ small: e.target.checked })}
        />
        <span>小文字</span>
      </label>

      <button
        type="button"
        className="shoga-adjust-reset"
        title="この文字の調整をなくす"
        disabled={!hasShogaAdjust(char)}
        onClick={onReset}
      >
        調整をなくす
      </button>
    </div>
  );
}

/**
 * 調整の数を入れる欄。
 * 打ち込んでいる途中は空にもできるよう、入力欄の文字は別に持ち、
 * 数として読める間だけ外の値を書き換える(勝手に0を入れない)。
 */
function AdjustNumber({
  label,
  value,
  min,
  max,
  title,
  disabled,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  title: string;
  disabled?: boolean;
  onChange: (value: number) => void;
}) {
  const [text, setText] = useState(() => String(value));
  const [shown, setShown] = useState(value);
  if (shown !== value) {
    // 外から値が変わったときは、そちらに合わせる
    setShown(value);
    setText(String(value));
  }

  return (
    <label
      className={"shoga-adjust-field" + (disabled ? " disabled" : "")}
      title={title}
    >
      <span>{label}</span>
      <input
        type="number"
        step={ADJUST_STEP}
        min={min}
        max={max}
        disabled={disabled}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          const next = Number(e.target.value);
          if (e.target.value.trim() !== "" && Number.isFinite(next)) {
            setShown(next);
            onChange(next);
          }
        }}
        onBlur={() => setText(String(value))}
      />
    </label>
  );
}
