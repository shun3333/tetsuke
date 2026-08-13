// 編集UI: 横方向タイムライングリッド(列=グローバル拍位置, 行=トラック)
import { useRef } from "react";
import { KUSARI_LABEL, type SongData, type TeMaster, type UtaiSub } from "../types";
import {
  computeGlobalStarts,
  globalToBeatRef,
  totalBeats,
} from "../logic/position";
import type { SongAction } from "../state/songReducer";

interface Props {
  song: SongData;
  teMaster: TeMaster;
  selectedTeId: string | null;
  onPlaced: () => void;
  dispatch: React.Dispatch<SongAction>;
}

interface Occupancy {
  instanceIndex: number;
  isStart: boolean;
  length: number;
  teId: string;
}

const UTAI_SUBS: UtaiSub[] = ["omote", "ura"];

export function TimelineGrid({
  song,
  teMaster,
  selectedTeId,
  onPlaced,
  dispatch,
}: Props) {
  const utaiInputRefs = useRef(new Map<string, HTMLInputElement>());

  const globalStarts = computeGlobalStarts(song.kusari_sequence);
  const total = totalBeats(song.kusari_sequence);
  const beats = Array.from({ length: total }, (_, i) => i);

  const teInstances = song.tracks.kotsuzumi?.te_instances ?? [];
  const occupancy = new Map<number, Occupancy>();
  teInstances.forEach((ti, idx) => {
    const def = teMaster[ti.te_id];
    if (!def) return;
    const start = globalStarts[ti.start_ref.kusari_index] + (ti.start_ref.beat - 1);
    const len = def.internal_pattern.length;
    for (let g = start; g < start + len; g++) {
      occupancy.set(g, {
        instanceIndex: idx,
        isStart: g === start,
        length: len,
        teId: ti.te_id,
      });
    }
  });

  const utaiChars = song.tracks.utai?.chars ?? [];
  const utaiMap = new Map<string, string>();
  utaiChars.forEach((c) => {
    if (c.content) {
      const g = globalStarts[c.beat_ref.kusari_index] + (c.beat_ref.beat - 1);
      utaiMap.set(`${g}:${c.sub}`, c.content.value);
    }
  });

  function handleKotsuzumiClick(g: number) {
    const occ = occupancy.get(g);
    if (occ) {
      if (occ.isStart) {
        dispatch({ type: "REMOVE_TE_INSTANCE", instanceIndex: occ.instanceIndex });
      }
      return;
    }
    if (!selectedTeId) return;
    const def = teMaster[selectedTeId];
    if (!def) return;
    const len = def.internal_pattern.length;
    if (g + len > total) {
      window.alert("この位置には長さが収まりません。");
      return;
    }
    for (let i = g; i < g + len; i++) {
      if (occupancy.has(i)) {
        window.alert("既に配置されている手組と重なります。");
        return;
      }
    }
    const startRef = globalToBeatRef(g, song.kusari_sequence, globalStarts);
    if (!startRef) return;
    dispatch({ type: "ADD_TE_INSTANCE", teId: selectedTeId, startRef });
    onPlaced();
  }

  function setUtaiValue(g: number, sub: UtaiSub, value: string) {
    const beatRef = globalToBeatRef(g, song.kusari_sequence, globalStarts);
    if (!beatRef) return;
    dispatch({
      type: "SET_UTAI_CHAR",
      beatRef,
      sub,
      value: value === "" ? null : value,
    });
  }

  function focusUtaiInput(g: number, sub: UtaiSub, caret?: "start" | "end") {
    const el = utaiInputRefs.current.get(`${g}:${sub}`);
    if (!el) return;
    el.focus();
    if (caret === "start") el.setSelectionRange(0, 0);
    else if (caret === "end") el.setSelectionRange(el.value.length, el.value.length);
  }

  // 入力欄は「1拍表 → 1拍裏 → 2拍表 → …」の順に並ぶ。
  // 左右キーはこの並び順をそのまま辿る。
  function focusFlatIndex(index: number, caret: "start" | "end") {
    if (index < 0 || index >= total * UTAI_SUBS.length) return;
    const g = Math.floor(index / UTAI_SUBS.length);
    const sub = UTAI_SUBS[index % UTAI_SUBS.length];
    focusUtaiInput(g, sub, caret);
  }

  function handleUtaiKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    g: number,
    sub: UtaiSub,
  ) {
    const input = e.currentTarget;
    const flatIndex = g * UTAI_SUBS.length + UTAI_SUBS.indexOf(sub);
    switch (e.key) {
      case "ArrowLeft":
        if (input.selectionStart === 0 && input.selectionEnd === 0) {
          e.preventDefault();
          focusFlatIndex(flatIndex - 1, "end");
        }
        break;
      case "ArrowRight":
        if (
          input.selectionStart === input.value.length &&
          input.selectionEnd === input.value.length
        ) {
          e.preventDefault();
          focusFlatIndex(flatIndex + 1, "start");
        }
        break;
      case "ArrowUp":
        if (sub === "ura") {
          e.preventDefault();
          focusUtaiInput(g, "omote");
        }
        break;
      case "ArrowDown":
        if (sub === "omote") {
          e.preventDefault();
          focusUtaiInput(g, "ura");
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className="timeline-grid-wrap">
      <h2>タイムライン</h2>
      <table className="timeline-grid">
        <thead>
          <tr>
            <th className="row-label"></th>
            {song.kusari_sequence.map((k, i) => {
              const start = globalStarts[i];
              const len =
                i + 1 < globalStarts.length
                  ? globalStarts[i + 1] - start
                  : total - start;
              return (
                <th key={i} colSpan={len} className="kusari-header">
                  {KUSARI_LABEL[k.type]}
                </th>
              );
            })}
          </tr>
          <tr>
            <th className="row-label"></th>
            {beats.map((g) => (
              <th key={g} className="beat-header">
                {g + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="row-label">小鼓</th>
            {(() => {
              const cells: React.ReactNode[] = [];
              let g = 0;
              while (g < total) {
                const cellG = g;
                const occ = occupancy.get(cellG);
                if (occ && occ.isStart) {
                  cells.push(
                    <td
                      key={cellG}
                      colSpan={occ.length}
                      className="te-cell filled"
                      onClick={() => handleKotsuzumiClick(cellG)}
                      title="クリックで削除"
                    >
                      {occ.teId}
                    </td>,
                  );
                  g += occ.length;
                } else if (occ) {
                  g += 1;
                } else {
                  cells.push(
                    <td
                      key={cellG}
                      className={
                        "te-cell empty" + (selectedTeId ? " placeable" : "")
                      }
                      onClick={() => handleKotsuzumiClick(cellG)}
                    />,
                  );
                  g += 1;
                }
              }
              return cells;
            })()}
          </tr>
          <tr>
            <th className="row-label">謡</th>
            {beats.map((g) => (
              <td key={g} className="utai-cell">
                <div className="utai-cell-inner">
                  {UTAI_SUBS.map((sub) => (
                    <input
                      key={sub}
                      ref={(el) => {
                        const key = `${g}:${sub}`;
                        if (el) utaiInputRefs.current.set(key, el);
                        else utaiInputRefs.current.delete(key);
                      }}
                      className={`utai-input ${sub}`}
                      value={utaiMap.get(`${g}:${sub}`) ?? ""}
                      onChange={(e) => setUtaiValue(g, sub, e.target.value)}
                      onKeyDown={(e) => handleUtaiKeyDown(e, g, sub)}
                    />
                  ))}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
