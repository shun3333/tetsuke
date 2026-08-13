// 編集UI: 横方向タイムライングリッド(列=グローバル拍位置, 行=トラック)
//
// 謡の入力欄は1拍につき2つ。半拍単位の枠番号(beat)で見ると
//   左 = 2b-1((b-1)拍の裏 / b=1なら0拍の裏)
//   右 = 2b  (b拍の表)
// となり、左から右へ 1, 2, 3, … と連続する。
import { useRef } from "react";
import { KUSARI_LABEL, type SongData, type TeMaster } from "../types";
import {
  computeGlobalStarts,
  globalBeatToBeatRef,
  globalBeatToKusariBeat,
  teInstanceStartBeat,
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

/** 1拍あたりの入力欄の数(裏・表) */
const SLOTS_PER_BEAT = 2;

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
    const start = teInstanceStartBeat(ti.start_ref, globalStarts);
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

  /** グローバル拍 → その拍に対応する2つの半拍枠 [裏(=前の拍の裏), 表] */
  function slotsOfGlobalBeat(g: number): { key: string; beat: number }[] | null {
    const local = globalBeatToKusariBeat(g, song.kusari_sequence, globalStarts);
    if (!local) return null;
    const rightBeat = local.localBeat * 2;
    return [
      { key: `${local.kusariIndex}:${rightBeat - 1}`, beat: rightBeat - 1 },
      { key: `${local.kusariIndex}:${rightBeat}`, beat: rightBeat },
    ];
  }

  const utaiValues = new Map<string, string>();
  (song.tracks.utai?.chars ?? []).forEach((c) => {
    if (c.content) {
      utaiValues.set(`${c.beat_ref.kusari_index}:${c.beat_ref.beat}`, c.content.value);
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
    const startRef = globalBeatToBeatRef(g, song.kusari_sequence, globalStarts);
    if (!startRef) return;
    dispatch({ type: "ADD_TE_INSTANCE", teId: selectedTeId, startRef });
    onPlaced();
  }

  function setUtaiValue(kusariIndex: number, beat: number, value: string) {
    dispatch({
      type: "SET_UTAI_CHAR",
      beatRef: { kusari_index: kusariIndex, beat },
      value: value === "" ? null : value,
    });
  }

  function focusInput(key: string, caret: "start" | "end") {
    const el = utaiInputRefs.current.get(key);
    if (!el) return;
    el.focus();
    if (caret === "start") el.setSelectionRange(0, 0);
    else el.setSelectionRange(el.value.length, el.value.length);
  }

  // 入力欄は左から右へ半拍枠の順に並ぶ。左右キーはこの並び順をそのまま辿る。
  function focusFlatIndex(index: number, caret: "start" | "end") {
    if (index < 0 || index >= total * SLOTS_PER_BEAT) return;
    const g = Math.floor(index / SLOTS_PER_BEAT);
    const slots = slotsOfGlobalBeat(g);
    if (!slots) return;
    focusInput(slots[index % SLOTS_PER_BEAT].key, caret);
  }

  function handleUtaiKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    flatIndex: number,
  ) {
    const input = e.currentTarget;
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
        e.preventDefault();
        focusFlatIndex(flatIndex - 1, "end");
        break;
      case "ArrowDown":
        e.preventDefault();
        focusFlatIndex(flatIndex + 1, "start");
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
            {/* 拍番号は通し番号ではなく、クサリごとに1から振り直す */}
            {beats.map((g) => {
              const local = globalBeatToKusariBeat(
                g,
                song.kusari_sequence,
                globalStarts,
              );
              return (
                <th key={g} className="beat-header">
                  {local ? local.localBeat : ""}
                </th>
              );
            })}
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
            {beats.map((g) => {
              const slots = slotsOfGlobalBeat(g);
              const local = globalBeatToKusariBeat(g, song.kusari_sequence, globalStarts);
              if (!slots || !local) return <td key={g} className="utai-cell" />;
              return (
                <td key={g} className="utai-cell">
                  <div className="utai-cell-inner">
                    {slots.map((slot, si) => (
                      <input
                        key={slot.key}
                        ref={(el) => {
                          if (el) utaiInputRefs.current.set(slot.key, el);
                          else utaiInputRefs.current.delete(slot.key);
                        }}
                        className="utai-input"
                        title={`${local.kusariIndex + 1}つ目のクサリ / beat ${slot.beat}`}
                        value={utaiValues.get(slot.key) ?? ""}
                        onChange={(e) =>
                          setUtaiValue(local.kusariIndex, slot.beat, e.target.value)
                        }
                        onKeyDown={(e) =>
                          handleUtaiKeyDown(e, g * SLOTS_PER_BEAT + si)
                        }
                      />
                    ))}
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
