// 左(編集)と右(手付)の横幅を、境目のドラッグで変えられるようにする。
// 幅はブラウザに保存し、次に開いたときも同じ配分で表示する。
import { useEffect, useRef, useState } from "react";

/** 左右それぞれに最低限確保する幅 */
const MIN_LEFT = 320;
const MIN_RIGHT = 320;
const DEFAULT_LEFT = 520;
/** 仕切りが占める列の幅(index.css の .app-main と合わせる) */
const RESIZER_WIDTH = 20;
/** キーボード操作1回あたりの変化量 */
const KEY_STEP = 24;
const STORAGE_KEY = "tetsuke:editor-pane-width";

/** 保存しておいた幅を読む。未保存・壊れている場合は既定値 */
function readStoredWidth(): number {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const value = raw === null ? NaN : Number(raw);
    return Number.isFinite(value) ? value : DEFAULT_LEFT;
  } catch {
    return DEFAULT_LEFT;
  }
}

function storeWidth(width: number): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(width));
  } catch {
    // 保存できない環境でも動作自体は続ける
  }
}

/** 左右の最低幅に収まるよう、左の幅を丸める */
function clampWidth(width: number, containerWidth: number): number {
  const max = containerWidth - MIN_RIGHT - RESIZER_WIDTH;
  return Math.max(MIN_LEFT, Math.min(width, max));
}

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function SplitPane({ left, right }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const [leftWidth, setLeftWidth] = useState(readStoredWidth);
  const [dragging, setDragging] = useState(false);

  // ドラッグが終わってから保存する(ドラッグ中は毎フレーム動くため)
  useEffect(() => {
    if (!dragging) storeWidth(leftWidth);
  }, [dragging, leftWidth]);

  /** コンテナの幅を基準に、左の幅を更新する */
  function resizeTo(width: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setLeftWidth(clampWidth(width, rect.width));
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    resizeTo(e.clientX - rect.left);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      resizeTo(leftWidth - KEY_STEP);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      resizeTo(leftWidth + KEY_STEP);
    }
  }

  return (
    <main
      ref={containerRef}
      className={"app-main" + (dragging ? " dragging" : "")}
      style={{ "--editor-width": `${leftWidth}px` } as React.CSSProperties}
    >
      {left}
      <div
        className="pane-resizer"
        role="separator"
        aria-orientation="vertical"
        aria-label="編集欄と手付の幅を調整"
        tabIndex={0}
        title="ドラッグで幅を調整(ダブルクリックで既定に戻す)"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDoubleClick={() => resizeTo(DEFAULT_LEFT)}
        onKeyDown={handleKeyDown}
      />
      {right}
    </main>
  );
}
