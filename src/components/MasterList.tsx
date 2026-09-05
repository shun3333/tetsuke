// マスタ編集画面の左に置く一覧。手組マスタと唱歌マスタで共通に使う。
//
// 並べ替えはドラッグでも↑↓ボタンでもできる。項目を指すのは内部ID(uid)で、
// 表示名やIDは空でも重複してもよいため、そちらは識別には使わない。
import { useState } from "react";

/** 一覧に並べる1項目 */
export interface MasterListItem {
  uid: string;
  label: string;
  /** 名前の下に小さく出す補足(拍数やIDなど) */
  sub: string;
}

interface Props {
  items: MasterListItem[];
  selectedUid: string | null;
  onSelect: (uid: string) => void;
  /** uid の項目を、一覧の to 番目へ動かす */
  onMove: (uid: string, to: number) => void;
  addLabel: string;
  onAdd: () => void;
}

export function MasterList({
  items,
  selectedUid,
  onSelect,
  onMove,
  addLabel,
  onAdd,
}: Props) {
  /** ドラッグ中の項目と、いま重なっている項目(どちらも内部ID) */
  const [dragUid, setDragUid] = useState<string | null>(null);
  const [overUid, setOverUid] = useState<string | null>(null);

  /** 一覧の中の位置。無ければ -1 */
  const indexOf = (uid: string) => items.findIndex((item) => item.uid === uid);

  /** ドラッグしていた項目を、重ねた項目の位置へ移す */
  function dropOn(targetUid: string) {
    if (dragUid) onMove(dragUid, indexOf(targetUid));
    setDragUid(null);
    setOverUid(null);
  }

  /** 落とす位置を上下どちらで示すか。動かす向きで決まる */
  function dropClass(uid: string): string {
    if (!dragUid) return "";
    if (dragUid === uid) return " dragging";
    if (overUid !== uid) return "";
    return indexOf(dragUid) < indexOf(uid) ? " drop-below" : " drop-above";
  }

  return (
    <div className="master-list">
      {/* 項目が増えても縦に伸び続けないよう、一覧だけスクロールさせる */}
      <div className="master-list-scroll">
        {items.map((item, i, all) => (
          <div
            key={item.uid}
            className={"master-list-row" + dropClass(item.uid)}
            draggable
            onDragStart={(e) => {
              setDragUid(item.uid);
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/plain", item.uid);
            }}
            onDragEnd={() => {
              setDragUid(null);
              setOverUid(null);
            }}
            onDragOver={(e) => {
              if (!dragUid) return;
              // 既定の動作(受け付けない)を止めないと、落とせない
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              setOverUid(item.uid);
            }}
            onDrop={(e) => {
              e.preventDefault();
              dropOn(item.uid);
            }}
          >
            <span className="master-list-handle" title="ドラッグで並べ替え">
              ⋮⋮
            </span>
            <button
              type="button"
              className={
                "master-list-item" +
                (item.uid === selectedUid ? " selected" : "")
              }
              onClick={() => onSelect(item.uid)}
            >
              <span className="te-name">{item.label}</span>
              <span className="te-length">{item.sub}</span>
            </button>
            <div className="master-list-move">
              <button
                type="button"
                className="chip-remove"
                title="1つ上へ移動"
                disabled={i === 0}
                onClick={() => onMove(item.uid, i - 1)}
              >
                ↑
              </button>
              <button
                type="button"
                className="chip-remove"
                title="1つ下へ移動"
                disabled={i === all.length - 1}
                onClick={() => onMove(item.uid, i + 1)}
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="kusari-add" onClick={onAdd}>
        {addLabel}
      </button>
    </div>
  );
}
