// 手組を選ぶポップアップ。
//
// 手組は楽器ごとに100以上あるため、スクロールで探すのは大変。
// 開いたらすぐ絞り込みの入力欄に文字を打てるようにし、
// 上下キーとEnterだけで選べるようにしている。
import { useEffect, useRef, useState } from "react";
import { INSTRUMENT_LABEL, type Instrument, type TeMaster } from "../types";

interface Props {
  instrument: Instrument;
  /** その楽器の手組の一覧(マスタの並び順のまま) */
  entries: TeMaster;
  /** その手組を置けない理由。置けるならnull */
  errorOf: (teId: string) => string | null;
  onPick: (teId: string) => void;
  onClose: () => void;
  /** 押した場所(この近くに出す) */
  x: number;
  y: number;
}

/** 一覧が画面からはみ出さないように、表示位置を画面内に収める */
const PICKER_WIDTH = 220;
const PICKER_MAX_HEIGHT = 320;

/**
 * かなの違い・大文字小文字で探せなくならないよう、
 * ひらがなをカタカナに寄せ、英字は小文字に揃える。
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ぁ-ゖ]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) + 0x60),
    );
}

export function TePicker({
  instrument,
  entries,
  errorOf,
  onPick,
  onClose,
  x,
  y,
}: Props) {
  const [query, setQuery] = useState("");
  /** 上下キーで選んでいる位置(絞り込んだ後の並びでの位置) */
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // 名前(日本語)とID(ローマ字)のどちらでも探せるようにする
  const q = normalize(query.trim());
  const shown =
    q === ""
      ? entries
      : entries.filter(
          (def) =>
            normalize(def.label).includes(q) ||
            normalize(def.te_id).includes(q),
        );
  // 絞り込みで件数が減ったときに、選択位置が外に出ないようにする
  const activeIndex = Math.min(active, Math.max(0, shown.length - 1));

  // 選んでいるものが隠れていたら、見える位置まで送る
  useEffect(() => {
    const el = listRef.current?.children[activeIndex];
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const delta = e.key === "ArrowDown" ? 1 : -1;
      const next = activeIndex + delta;
      if (next >= 0 && next < shown.length) setActive(next);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const def = shown[activeIndex];
      // 置けないものはEnterでも置かない(理由は各行に出ている)
      if (def && errorOf(def.te_id) === null) onPick(def.te_id);
    }
  }

  return (
    <>
      {/* 外側をクリックしたら閉じる */}
      <div className="te-picker-backdrop" onClick={onClose} />
      <div
        className="te-picker"
        style={{
          left: Math.min(x, window.innerWidth - PICKER_WIDTH - 8),
          top: Math.min(y, window.innerHeight - PICKER_MAX_HEIGHT - 8),
          width: PICKER_WIDTH,
          maxHeight: PICKER_MAX_HEIGHT,
        }}
        onKeyDown={handleKeyDown}
      >
        <div className="te-picker-title">
          {INSTRUMENT_LABEL[instrument]}の手組を選ぶ
          <span className="te-picker-count">
            {shown.length}/{entries.length}
          </span>
        </div>
        <input
          className="te-picker-search"
          // 開いてすぐ打ち込めるようにする
          autoFocus
          value={query}
          placeholder="名前で絞り込む"
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
        />
        <div className="te-picker-list" ref={listRef}>
          {shown.map((def, i) => {
            const error = errorOf(def.te_id);
            return (
              <button
                key={def.uid}
                type="button"
                className={
                  "te-picker-item" + (i === activeIndex ? " active" : "")
                }
                disabled={error !== null}
                title={error ?? undefined}
                onMouseEnter={() => setActive(i)}
                onClick={() => onPick(def.te_id)}
              >
                <span className="te-name">{def.label}</span>
                <span className="te-length">
                  {error ?? `${def.internal_pattern.length}拍`}
                </span>
              </button>
            );
          })}
          {shown.length === 0 && (
            <p className="te-picker-empty">見つかりませんでした</p>
          )}
        </div>
      </div>
    </>
  );
}
