// 編集UI: 横方向タイムライングリッド(列=グローバル拍位置, 行=トラック)
//
// 謡の入力欄は1拍につき2つ。半拍単位の枠番号(beat)で見ると
//   左 = 2b-1((b-1)拍の裏 / b=1なら0拍の裏)
//   右 = 2b  (b拍の表)
// となり、左から右へ 1, 2, 3, … と連続する。
import { useEffect, useMemo, useRef, useState } from "react";
import {
  INSTRUMENTS,
  INSTRUMENT_LABEL,
  KUSARI_LABEL,
  KUSARI_TYPES,
  type Instrument,
  type KusariType,
  type SongData,
  type TeMaster,
} from "../types";
import {
  beatCountOf,
  computeGlobalStarts,
  globalBeatToTeStartRef,
  globalBeatToKusariBeat,
  teInstanceStartBeat,
  totalBeats,
} from "../logic/position";
import { findTe } from "../logic/tePattern";
import type { SongAction } from "../state/songReducer";
import { INSTRUMENT_COLOR } from "../data/instruments";

/** パレットで選んである手組(楽器とセットで持つ) */
export interface SelectedTe {
  instrument: Instrument;
  teId: string;
}

interface Props {
  song: SongData;
  teMaster: Record<Instrument, TeMaster>;
  selectedTe: SelectedTe | null;
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

/**
 * 1拍の枠の中で「表」「裏」が来る位置(枠の幅に対する比)。
 * 謡の入力欄は左が裏・右が表なので、右半分の中央が表・左半分の中央が裏にあたる。
 * 小鼓の点も拍番号もこの位置に合わせる。
 */
const BEAT_DOT_RATIO = 0.75;
const BEAT_URA_RATIO = 0.25;

/** 手組の一覧(ポップアップ)の表示状態 */
interface PickerState {
  /** どの楽器の、どのグローバル拍に置こうとしているか */
  instrument: Instrument;
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
  instrument: Instrument,
  teMaster: TeMaster,
  globalStarts: number[],
): Map<number, Occupancy> {
  const occupancy = new Map<number, Occupancy>();
  (song.tracks[instrument]?.te_instances ?? []).forEach((ti, idx) => {
    const def = findTe(teMaster, ti.te_id);
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

/** 小鼓の行に引く、手組1つ分のバー(点から点まで) */
interface TeBar {
  key: string;
  instanceIndex: number;
  label: string;
  /** このクサリ内での開始・終了拍(0始まり) */
  fromBeat: number;
  toBeat: number;
  /** 前のクサリから続いているか */
  continued: boolean;
}

/**
 * 配置済みの手組を、クサリごとのバーに割り当てる。
 * バーは開始拍から「長さの分だけ先の拍」までを結ぶ。占有するのは
 * 開始拍から length 拍分だが、バーはその次の拍の点まで届く
 * (N拍目に置いた長さ4の手組なら、N拍表から N+4拍表まで)。
 * 手組はクサリをまたぐことがあるため、はみ出す分はクサリの境目で切る。
 */
function buildTeBars(
  song: SongData,
  instrument: Instrument,
  teMaster: TeMaster,
  globalStarts: number[],
): Map<number, TeBar[]> {
  const bars = new Map<number, TeBar[]>();
  (song.tracks[instrument]?.te_instances ?? []).forEach((ti, idx) => {
    const def = findTe(teMaster, ti.te_id);
    if (!def) return;
    const startG = teInstanceStartBeat(ti.start_ref, globalStarts);
    const endG = startG + def.internal_pattern.length;

    song.kusari_sequence.forEach((k, kusariIndex) => {
      const kStart = globalStarts[kusariIndex];
      const kEnd = kStart + beatCountOf(k.type) - 1;
      if (endG < kStart || startG > kEnd) return;
      const bar: TeBar = {
        key: `bar-${idx}-${kusariIndex}`,
        instanceIndex: idx,
        label: def.label,
        fromBeat: Math.max(startG, kStart) - kStart,
        toBeat: Math.min(endG, kEnd) - kStart,
        continued: startG < kStart,
      };
      const list = bars.get(kusariIndex);
      if (list) list.push(bar);
      else bars.set(kusariIndex, [bar]);
    });
  });
  return bars;
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
  selectedTe,
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
  // 手組まわりは楽器ごとに持つ
  const occupancy = useMemo(() => {
    const map = {} as Record<Instrument, Map<number, Occupancy>>;
    for (const inst of INSTRUMENTS) {
      map[inst] = buildOccupancy(song, inst, teMaster[inst], globalStarts);
    }
    return map;
  }, [song, teMaster, globalStarts]);

  const teBars = useMemo(() => {
    const map = {} as Record<Instrument, Map<number, TeBar[]>>;
    for (const inst of INSTRUMENTS) {
      map[inst] = buildTeBars(song, inst, teMaster[inst], globalStarts);
    }
    return map;
  }, [song, teMaster, globalStarts]);
  const utaiValues = useMemo(() => buildUtaiValues(song), [song]);

  /** その位置に置けない理由。置けるならnull */
  function placementError(
    instrument: Instrument,
    teId: string,
    g: number,
  ): string | null {
    // 曲データは手組をIDで指すため、IDが無いものは置けない
    if (teId === "") return "IDが空の手組は置けません";
    const def = findTe(teMaster[instrument], teId);
    if (!def) return "手組が見つかりません";
    const len = def.internal_pattern.length;
    if (g + len > total) return "長さが収まりません";
    for (let i = g; i < g + len; i++) {
      // 重なりは同じ楽器の中だけ見る(楽器が違えば同じ拍に置ける)
      if (occupancy[instrument].has(i)) return "他の手組と重なります";
    }
    return null;
  }

  function placeTe(instrument: Instrument, teId: string, g: number) {
    const error = placementError(instrument, teId, g);
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
    dispatch({ type: "ADD_TE_INSTANCE", instrument, teId, startRef });
    onPlaced();
  }

  function handleTeClick(
    instrument: Instrument,
    g: number,
    e: React.MouseEvent,
  ) {
    const occ = occupancy[instrument].get(g);
    if (occ) {
      // 手組が乗っている点はどこを押しても、その手組を外す
      dispatch({
        type: "REMOVE_TE_INSTANCE",
        instrument,
        instanceIndex: occ.instanceIndex,
      });
      return;
    }
    // パレットで選んである場合はそのまま置く。選んでいなければ一覧を出す
    if (selectedTe && selectedTe.instrument === instrument) {
      placeTe(instrument, selectedTe.teId, g);
    } else {
      setPicker({ instrument, g, x: e.clientX, y: e.clientY });
    }
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
          title="1つ上へ移動"
          disabled={kusariIndex === 0}
          onClick={() =>
            dispatch({
              type: "MOVE_KUSARI",
              from: kusariIndex,
              to: kusariIndex - 1,
              teMaster,
            })
          }
        >
          ↑
        </button>
        <button
          type="button"
          className="chip-remove"
          title="1つ下へ移動"
          disabled={kusariIndex === song.kusari_sequence.length - 1}
          onClick={() =>
            dispatch({
              type: "MOVE_KUSARI",
              from: kusariIndex,
              to: kusariIndex + 1,
              teMaster,
            })
          }
        >
          ↓
        </button>
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
    /** 楽器1つ分のバー。左右端は拍の枠を単位とした位置。
        前のクサリから続く分は、0拍の裏から引き始めて繋がりを示す */
    const barsOf = (instrument: Instrument) =>
      (teBars[instrument].get(kusariIndex) ?? []).map((bar) => ({
        ...bar,
        from: bar.continued
          ? bar.fromBeat + BEAT_URA_RATIO
          : bar.fromBeat + BEAT_DOT_RATIO,
        to: bar.toBeat + BEAT_DOT_RATIO,
      }));

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
            {/* 楽器ごとに1行。拍ごとに枠を切らず、1クサリで1つの枠にする。
                拍の表の位置に点を並べ、手組は点から点までのバーで表す */}
            {INSTRUMENTS.map((instrument) => {
              const bars = barsOf(instrument);
              return (
                <tr key={instrument}>
                  <th className="row-label">{INSTRUMENT_LABEL[instrument]}</th>
                  <td className="te-lane" colSpan={beats.length}>
                    <div
                      className="te-lane-inner"
                      style={
                        {
                          "--te-color": INSTRUMENT_COLOR[instrument],
                        } as React.CSSProperties
                      }
                    >
                      {beats.map((_, i) => {
                        const g = startG + i;
                        const occupied = occupancy[instrument].has(g);
                        return (
                          <button
                            key={g}
                            type="button"
                            className="te-dot"
                            style={{
                              left: `calc(var(--beat-width) * ${i + BEAT_DOT_RATIO})`,
                            }}
                            title={
                              occupied
                                ? "クリックで削除"
                                : "クリックで手組を選ぶ"
                            }
                            onClick={(e) => handleTeClick(instrument, g, e)}
                          />
                        );
                      })}
                      {/* バーは点より後に描いて、範囲内の点を覆い隠す。
                          端は点の中心ではなく点の外側(半径の分だけ外)まで伸ばす */}
                      {bars.map((bar) => (
                        <div
                          key={bar.key}
                          className="te-bar"
                          style={{
                            left: `calc(var(--beat-width) * ${bar.from} - var(--te-dot-size) / 2)`,
                            width: `calc(var(--beat-width) * ${bar.to - bar.from} + var(--te-dot-size))`,
                          }}
                          title="クリックで削除"
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_TE_INSTANCE",
                              instrument,
                              instanceIndex: bar.instanceIndex,
                            })
                          }
                        />
                      ))}
                      {/* 手組名はバーより後に。前のクサリから続く分には名前を出さない */}
                      {bars.map((bar) =>
                        bar.continued ? null : (
                          <span
                            key={`${bar.key}-label`}
                            className="te-bar-label"
                            style={{
                              left: `calc(var(--beat-width) * ${(bar.from + bar.to) / 2})`,
                            }}
                          >
                            {bar.label}
                          </span>
                        ),
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
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
              top: Math.min(
                picker.y,
                window.innerHeight - PICKER_MAX_HEIGHT - 8,
              ),
              width: PICKER_WIDTH,
              maxHeight: PICKER_MAX_HEIGHT,
            }}
          >
            <div className="te-picker-title">
              {INSTRUMENT_LABEL[picker.instrument]}の手組を選ぶ
            </div>
            {teMaster[picker.instrument].map((def, i) => {
              const error = placementError(
                picker.instrument,
                def.te_id,
                picker.g,
              );
              return (
                <button
                  key={i}
                  type="button"
                  className="te-picker-item"
                  disabled={error !== null}
                  title={error ?? undefined}
                  onClick={() => {
                    placeTe(picker.instrument, def.te_id, picker.g);
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
