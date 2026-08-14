// 編集UI: 横方向タイムライングリッド(列=グローバル拍位置, 行=トラック)
//
// 謡の入力欄は1拍につき2つ。半拍単位の枠番号(beat)で見ると
//   左 = 2b-1((b-1)拍の裏 / b=1なら0拍の裏)
//   右 = 2b  (b拍の表)
// となり、左から右へ 1, 2, 3, … と連続する。
import { useEffect, useMemo, useRef, useState } from "react";
import {
  KUSARI_LABEL,
  KUSARI_TYPES,
  type KusariType,
  type SongData,
  type TeMaster,
} from "../types";
import {
  computeGlobalStarts,
  globalBeatToTeStartRef,
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

/** 手組の一覧(ポップアップ)の表示状態 */
interface PickerState {
  /** どのグローバル拍に置こうとしているか */
  g: number;
  x: number;
  y: number;
}

/** 一覧が画面からはみ出さないように、表示位置を画面内に収める */
const PICKER_WIDTH = 160;
const PICKER_MAX_HEIGHT = 240;

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

/** 小鼓の行に並べる1セル分 */
interface TeCell {
  /** セルの先頭のグローバル拍 */
  g: number;
  span: number;
  occ: Occupancy | null;
  /** 前のクサリから続いている手組か */
  continued: boolean;
}

/**
 * 1クサリ分(startG以上endG未満)の小鼓の行を組み立てる。
 * 手組はクサリをまたぐことがあるため、はみ出す分はクサリの境目で切る。
 */
function buildTeCells(
  startG: number,
  endG: number,
  occupancy: Map<number, Occupancy>,
): TeCell[] {
  const cells: TeCell[] = [];
  let g = startG;
  while (g < endG) {
    const occ = occupancy.get(g);
    if (!occ) {
      cells.push({ g, span: 1, occ: null, continued: false });
      g += 1;
      continue;
    }
    // 同じ手組が続く範囲を、このクサリの中だけでまとめる
    let span = 1;
    while (
      g + span < endG &&
      occupancy.get(g + span)?.instanceIndex === occ.instanceIndex
    ) {
      span += 1;
    }
    cells.push({ g, span, occ, continued: !occ.isStart });
    g += span;
  }
  return cells;
}

/** 入力済みの謡の文字を、半拍枠のkeyで引けるようにする */
function buildUtaiValues(song: SongData): Map<string, string> {
  const values = new Map<string, string>();
  for (const c of song.tracks.utai?.chars ?? []) {
    if (!c.content) continue;
    values.set(
      `${c.beat_ref.kusari_index}:${c.beat_ref.beat}`,
      c.content.value,
    );
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
  /** 手組の一覧を出す位置(クリックしたグローバル拍と画面座標) */
  const [picker, setPicker] = useState<PickerState | null>(null);

  // 一覧はEscでも閉じられるようにする
  useEffect(() => {
    if (!picker) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPicker(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [picker]);

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

  /** その位置に置けない理由。置けるならnull */
  function placementError(teId: string, g: number): string | null {
    const def = teMaster[teId];
    if (!def) return "手組が見つかりません";
    const len = def.internal_pattern.length;
    if (g + len > total) return "長さが収まりません";
    for (let i = g; i < g + len; i++) {
      if (occupancy.has(i)) return "他の手組と重なります";
    }
    return null;
  }

  function placeTe(teId: string, g: number) {
    const error = placementError(teId, g);
    if (error) {
      window.alert(error);
      return;
    }
    const startRef = globalBeatToTeStartRef(
      g,
      song.kusari_sequence,
      globalStarts,
    );
    if (!startRef) return;
    dispatch({ type: "ADD_TE_INSTANCE", teId, startRef });
    onPlaced();
  }

  function handleKotsuzumiClick(g: number, e: React.MouseEvent) {
    const occ = occupancy.get(g);
    if (occ) {
      if (occ.isStart) {
        dispatch({
          type: "REMOVE_TE_INSTANCE",
          instanceIndex: occ.instanceIndex,
        });
      }
      return;
    }
    // パレットで選んである場合はそのまま置く。選んでいなければ一覧を出す
    if (selectedTeId) placeTe(selectedTeId, g);
    else setPicker({ g, x: e.clientX, y: e.clientY });
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

  /** クサリ1つ分の操作(種別の変更・すぐ下に追加・削除) */
  function renderKusariControls(kusariIndex: number) {
    return (
      <div className="kusari-block-bar">
        <select
          value={song.kusari_sequence[kusariIndex].type}
          title="このクサリの種別"
          onChange={(e) =>
            dispatch({
              type: "SET_KUSARI_TYPE",
              index: kusariIndex,
              kusariType: e.target.value as KusariType,
              teMaster,
            })
          }
        >
          {KUSARI_TYPES.map((t) => (
            <option key={t} value={t}>
              {KUSARI_LABEL[t]}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="chip-remove"
          title="すぐ下にクサリを追加"
          onClick={() =>
            dispatch({
              type: "INSERT_KUSARI",
              atIndex: kusariIndex + 1,
              kusariType: "honji",
            })
          }
        >
          ＋
        </button>
        <button
          type="button"
          className="chip-remove"
          title="このクサリを削除"
          disabled={song.kusari_sequence.length <= 1}
          onClick={() =>
            dispatch({ type: "REMOVE_KUSARI", index: kusariIndex, teMaster })
          }
        >
          ×
        </button>
      </div>
    );
  }

  /** クサリ1つ分の表。クサリを増やすと、この表が下に積まれていく */
  function renderKusari(kusariIndex: number) {
    const startG = globalStarts[kusariIndex];
    const endG =
      kusariIndex + 1 < globalStarts.length
        ? globalStarts[kusariIndex + 1]
        : total;
    const beats = beatSlots.slice(startG, endG);

    return (
      <div key={kusariIndex} className="kusari-block">
        {renderKusariControls(kusariIndex)}
        <table className="timeline-grid">
          <thead>
            <tr>
              <th className="row-label"></th>
              {/* 拍番号は通し番号ではなく、クサリごとに1から振り直す。
                  数字は「表」の入力欄(セルの右半分)の真上に置く */}
              {beats.map((entry, i) => (
                <th key={i} className="beat-header">
                  <span className="beat-header-omote">
                    {entry ? entry.localBeat : ""}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="row-label">小鼓</th>
              {buildTeCells(startG, endG, occupancy).map((cell) =>
                cell.occ ? (
                  <td
                    key={cell.g}
                    colSpan={cell.span}
                    className={
                      "te-cell filled" + (cell.continued ? " continued" : "")
                    }
                    onClick={(e) => handleKotsuzumiClick(cell.g, e)}
                    title={cell.continued ? undefined : "クリックで削除"}
                  >
                    {/* 前のクサリから続いている分には名前を出さない */}
                    {cell.continued ? "" : cell.occ.label}
                  </td>
                ) : (
                  <td
                    key={cell.g}
                    className={
                      "te-cell empty" + (selectedTeId ? " placeable" : "")
                    }
                    onClick={(e) => handleKotsuzumiClick(cell.g, e)}
                  />
                ),
              )}
            </tr>
            <tr>
              <th className="row-label">謡</th>
              {beats.map((entry, i) => {
                const g = startG + i;
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
                            setUtaiValue(
                              entry.kusariIndex,
                              slot.beat,
                              e.target.value,
                            )
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

  return (
    <div className="timeline-grid-wrap">
      <h2>タイムライン</h2>
      {song.kusari_sequence.map((_, i) => renderKusari(i))}
      <button
        type="button"
        className="kusari-add"
        onClick={() =>
          dispatch({
            type: "INSERT_KUSARI",
            atIndex: song.kusari_sequence.length,
            kusariType: "honji",
          })
        }
      >
        + クサリ追加
      </button>

      {picker && (
        <>
          {/* 外側をクリックしたら閉じる */}
          <div className="te-picker-backdrop" onClick={() => setPicker(null)} />
          <div
            className="te-picker"
            style={{
              left: Math.min(picker.x, window.innerWidth - PICKER_WIDTH - 8),
              top: Math.min(picker.y, window.innerHeight - PICKER_MAX_HEIGHT - 8),
              width: PICKER_WIDTH,
              maxHeight: PICKER_MAX_HEIGHT,
            }}
          >
            <div className="te-picker-title">手組を選ぶ</div>
            {Object.values(teMaster).map((def) => {
              const error = placementError(def.te_id, picker.g);
              return (
                <button
                  key={def.te_id}
                  type="button"
                  className="te-picker-item"
                  disabled={error !== null}
                  title={error ?? undefined}
                  onClick={() => {
                    placeTe(def.te_id, picker.g);
                    setPicker(null);
                  }}
                >
                  <span className="te-name">{def.label}</span>
                  <span className="te-length">
                    {error ?? `${def.internal_pattern.length}拍`}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
