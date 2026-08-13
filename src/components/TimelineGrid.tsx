// 編集UI: 横方向タイムライングリッド(列=グローバル拍位置, 行=トラック)
//
// 謡の入力欄は1拍につき2つ。半拍単位の枠番号(beat)で見ると
//   左 = 2b-1((b-1)拍の裏 / b=1なら0拍の裏)
//   右 = 2b  (b拍の表)
// となり、左から右へ 1, 2, 3, … と連続する。
import { useMemo, useRef } from "react";
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
  /** セルに表示する手組名(手組マスタのlabel) */
  label: string;
}

/** 1拍あたりの入力欄の数(裏・表) */
const SLOTS_PER_BEAT = 2;

/** グローバル拍1つ分の謡入力欄。keyは `クサリindex:半拍枠番号` */
interface BeatSlots {
  kusariIndex: number;
  localBeat: number;
  slots: { key: string; beat: number }[];
}

/** 各グローバル拍の謡入力欄を先に割り出しておく(見つからない拍はnull) */
function buildBeatSlots(
  song: SongData,
  globalStarts: number[],
  total: number,
): (BeatSlots | null)[] {
  return Array.from({ length: total }, (_, g) => {
    const local = globalBeatToKusariBeat(g, song.kusari_sequence, globalStarts);
    if (!local) return null;
    // 表(=横線の上)は 2b、その半拍前の裏は 2b-1
    const omote = local.localBeat * SLOTS_PER_BEAT;
    return {
      kusariIndex: local.kusariIndex,
      localBeat: local.localBeat,
      slots: [omote - 1, omote].map((beat) => ({
        key: `${local.kusariIndex}:${beat}`,
        beat,
      })),
    };
  });
}

/** 配置済みの手組が占めるグローバル拍を引けるようにする */
function buildOccupancy(
  song: SongData,
  teMaster: TeMaster,
  globalStarts: number[],
): Map<number, Occupancy> {
  const occupancy = new Map<number, Occupancy>();
  (song.tracks.kotsuzumi?.te_instances ?? []).forEach((ti, idx) => {
    const def = teMaster[ti.te_id];
    if (!def) return;
    const start = teInstanceStartBeat(ti.start_ref, globalStarts);
    const len = def.internal_pattern.length;
    for (let g = start; g < start + len; g++) {
      occupancy.set(g, {
        instanceIndex: idx,
        isStart: g === start,
        length: len,
        label: def.label,
      });
    }
  });
  return occupancy;
}

/** 入力済みの謡の文字を、半拍枠のkeyで引けるようにする */
function buildUtaiValues(song: SongData): Map<string, string> {
  const values = new Map<string, string>();
  for (const c of song.tracks.utai?.chars ?? []) {
    if (!c.content) continue;
    values.set(`${c.beat_ref.kusari_index}:${c.beat_ref.beat}`, c.content.value);
  }
  return values;
}

export function TimelineGrid({
  song,
  teMaster,
  selectedTeId,
  onPlaced,
  dispatch,
}: Props) {
  const utaiInputRefs = useRef(new Map<string, HTMLInputElement>());

  const globalStarts = useMemo(
    () => computeGlobalStarts(song.kusari_sequence),
    [song.kusari_sequence],
  );
  const total = totalBeats(song.kusari_sequence);

  const beatSlots = useMemo(
    () => buildBeatSlots(song, globalStarts, total),
    [song, globalStarts, total],
  );
  const occupancy = useMemo(
    () => buildOccupancy(song, teMaster, globalStarts),
    [song, teMaster, globalStarts],
  );
  const utaiValues = useMemo(() => buildUtaiValues(song), [song]);

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
    const entry = beatSlots[Math.floor(index / SLOTS_PER_BEAT)];
    if (!entry) return;
    focusInput(entry.slots[index % SLOTS_PER_BEAT].key, caret);
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
            {beatSlots.map((entry, g) => (
              <th key={g} className="beat-header">
                {entry ? entry.localBeat : ""}
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
                      {occ.label}
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
            {beatSlots.map((entry, g) => {
              if (!entry) return <td key={g} className="utai-cell" />;
              return (
                <td key={g} className="utai-cell">
                  <div className="utai-cell-inner">
                    {entry.slots.map((slot, si) => (
                      <input
                        key={slot.key}
                        ref={(el) => {
                          if (el) utaiInputRefs.current.set(slot.key, el);
                          else utaiInputRefs.current.delete(slot.key);
                        }}
                        className="utai-input"
                        title={`${entry.kusariIndex + 1}つ目のクサリ / beat ${slot.beat}`}
                        value={utaiValues.get(slot.key) ?? ""}
                        onChange={(e) =>
                          setUtaiValue(entry.kusariIndex, slot.beat, e.target.value)
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
