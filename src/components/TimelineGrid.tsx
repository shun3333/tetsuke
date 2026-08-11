// 編集UI: 横方向タイムライングリッド(列=グローバル拍位置, 行=トラック)
import { useState } from "react";
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

export function TimelineGrid({
  song,
  teMaster,
  selectedTeId,
  onPlaced,
  dispatch,
}: Props) {
  const [editingCell, setEditingCell] = useState<{
    g: number;
    sub: UtaiSub;
  } | null>(null);
  const [draftValue, setDraftValue] = useState("");

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

  function startEditUtai(g: number, sub: UtaiSub) {
    setEditingCell({ g, sub });
    setDraftValue(utaiMap.get(`${g}:${sub}`) ?? "");
  }

  function commitEditUtai() {
    if (!editingCell) return;
    const beatRef = globalToBeatRef(editingCell.g, song.kusari_sequence, globalStarts);
    if (beatRef) {
      dispatch({
        type: "SET_UTAI_CHAR",
        beatRef,
        sub: editingCell.sub,
        value: draftValue.trim() === "" ? null : draftValue,
      });
    }
    setEditingCell(null);
    setDraftValue("");
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
          {(["omote", "ura"] as UtaiSub[]).map((sub) => (
            <tr key={sub}>
              <th className="row-label">謡 {sub === "omote" ? "表" : "裏"}</th>
              {beats.map((g) => {
                const isEditing =
                  editingCell?.g === g && editingCell.sub === sub;
                const value = utaiMap.get(`${g}:${sub}`) ?? "";
                return (
                  <td
                    key={g}
                    className={"utai-cell" + (sub === "omote" ? " omote" : " ura")}
                    onClick={() => !isEditing && startEditUtai(g, sub)}
                  >
                    {isEditing ? (
                      <input
                        autoFocus
                        value={draftValue}
                        onChange={(e) => setDraftValue(e.target.value)}
                        onBlur={commitEditUtai}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") commitEditUtai();
                          if (e.key === "Escape") setEditingCell(null);
                        }}
                      />
                    ) : (
                      value
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
