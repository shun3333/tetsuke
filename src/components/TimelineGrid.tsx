// 編集UI: 横方向タイムライングリッド(列=グローバル拍位置, 行=トラック)
//
// 謡の入力欄は1拍につき2つ。半拍単位の枠番号(beat)で見ると
//   左 = 2b-1((b-1)拍の裏 / b=1なら0拍の裏)
//   右 = 2b  (b拍の表)
// となり、左から右へ 1, 2, 3, … と連続する。
//
// 謡と唱歌(笛)は同じ列に書くもので、同時に使うことはない。
// どちらを書くかは曲ごとに選び、選んだほうの行だけを出す。
// 唱歌は謡と違って1文字ずつ打ち込むのではなく、唱歌マスタの
// まとまりをクサリに置く(手組と同じ置き方)。
import { useEffect, useMemo, useRef, useState } from "react";
import {
  INSTRUMENTS,
  INSTRUMENT_LABEL,
  KUSARI_LABEL,
  KUSARI_TYPES,
  TEXT_TRACK_KINDS,
  TEXT_TRACK_LABEL,
  textTrackOf,
  type Instrument,
  type KusariType,
  type Masters,
  type ShogaMaster,
  type SongData,
  type TeMaster,
} from "../types";
import {
  computeGlobalStarts,
  globalBeatToKusariBeat,
  globalPosToBeatRef,
  shogaInstanceStartGlobalPos,
  teInstanceStartGlobalPos,
  totalBeats,
} from "../logic/position";
import { findTe } from "../logic/tePattern";
import { findShoga } from "../logic/shogaChar";
import { KUSARI_INSERT_MAX, type SongAction } from "../state/songReducer";
import { INSTRUMENT_COLOR } from "../data/instruments";
import { MasterPicker, type PickerEntry } from "./MasterPicker";

interface Props {
  song: SongData;
  masters: Masters;
  dispatch: React.Dispatch<SongAction>;
}

/** 1拍あたりの入力欄の数(裏・表) */
const SLOTS_PER_BEAT = 2;

/**
 * 一覧(ポップアップ)の表示状態。
 * instrument が null なら唱歌(笛)を選んでいる。
 */
interface PickerState {
  instrument: Instrument | null;
  kusariIndex: number;
  x: number;
  y: number;
}

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

/** そのクサリに置かれている手組・唱歌1つ分の名札 */
interface Placed {
  instanceIndex: number;
  label: string;
  /** 何拍分か(名札の横に小さく添える) */
  length: number;
  /** 置いたクサリ(続きの名札で「どこから続いているか」を出すのに使う) */
  fromKusari: number;
  /** 前のクサリから続いているぶんか。ここに置いたものではない */
  continued: boolean;
}

/**
 * まとまり1つ分の名札を、届くクサリすべてに入れる。
 *
 * 手組・唱歌はクサリの拍数より長いと次のクサリにも渡る。置いたクサリ
 * だけに名札を出すと、続きの側を見ているときに何が乗っているのか
 * 分からないので、渡った先にも「続き」として出す。
 */
function pushSpan(
  placed: Map<number, Placed[]>,
  entry: Omit<Placed, "continued">,
  lastKusari: number,
): void {
  for (let k = entry.fromKusari; k <= lastKusari; k++) {
    const item: Placed = { ...entry, continued: k !== entry.fromKusari };
    const list = placed.get(k);
    if (list) list.push(item);
    else placed.set(k, [item]);
  }
}

/**
 * そのまとまりの終わりが乗るクサリ。
 * 曲の終わりをはみ出している場合は、置いたクサリのままにしておく。
 */
function lastKusariOf(
  song: SongData,
  globalStarts: number[],
  endGlobalPos: number,
  fromKusari: number,
): number {
  const ref = globalPosToBeatRef(
    endGlobalPos,
    song.kusari_sequence,
    globalStarts,
  );
  return ref === null ? fromKusari : Math.max(fromKusari, ref.kusari_index);
}

/**
 * 配置済みの手組を、届くクサリごとにまとめる。
 * どの拍を占めるかは画面では扱わないので、名前と長さだけを持つ。
 */
function buildPlacedTe(
  song: SongData,
  instrument: Instrument,
  teMaster: TeMaster,
  globalStarts: number[],
): Map<number, Placed[]> {
  const placed = new Map<number, Placed[]>();
  (song.tracks[instrument]?.te_instances ?? []).forEach((ti, idx) => {
    const def = findTe(teMaster, ti.te_id);
    if (!def || !song.kusari_sequence[ti.kusari_index]) return;
    const length = def.internal_pattern.length;
    // 手組はクサリの1拍前が起点。そこから長さのぶんだけ先に届く
    const end =
      teInstanceStartGlobalPos(ti.kusari_index, globalStarts) + length;
    pushSpan(
      placed,
      {
        instanceIndex: idx,
        label: def.label,
        length,
        fromKusari: ti.kusari_index,
      },
      lastKusariOf(song, globalStarts, end, ti.kusari_index),
    );
  });
  return placed;
}

/** 配置済みの唱歌を、届くクサリごとにまとめる */
function buildPlacedShoga(
  song: SongData,
  shogaMaster: ShogaMaster,
  globalStarts: number[],
): Map<number, Placed[]> {
  const placed = new Map<number, Placed[]>();
  (song.tracks.shoga?.instances ?? []).forEach((si, idx) => {
    const def = findShoga(shogaMaster, si.shoga_id);
    if (!def || !song.kusari_sequence[si.kusari_index]) return;
    // 唱歌はクサリの頭が起点。最後の文字は「長さ」拍目の表に来る
    const end =
      shogaInstanceStartGlobalPos(si.kusari_index, globalStarts) +
      def.length -
      1;
    pushSpan(
      placed,
      {
        instanceIndex: idx,
        label: def.label,
        length: def.length,
        fromKusari: si.kusari_index,
      },
      lastKusariOf(song, globalStarts, end, si.kusari_index),
    );
  });
  return placed;
}

/**
 * 置いたまとまり1つ分の名札。
 * 前のクサリから続いているものは、そこに置いたわけではないので
 * 枠線だけにして区別し、外すボタンも出さない(置いたクサリで外す)。
 */
function PlacedChip({
  item,
  onRemove,
}: {
  item: Placed;
  onRemove: () => void;
}) {
  if (item.continued) {
    return (
      <span
        className="te-chip continued"
        title={`${item.fromKusari + 1}つ目のクサリに置いた「${item.label}」(${item.length}拍)の続きです`}
      >
        <span className="te-chip-name">{item.label}</span>
        <span className="te-chip-length">つづき</span>
      </span>
    );
  }
  return (
    <span className="te-chip">
      <span className="te-chip-name">{item.label}</span>
      <span className="te-chip-length">{item.length}拍</span>
      <button
        type="button"
        className="te-chip-remove"
        title={`「${item.label}」を外す`}
        onClick={onRemove}
      >
        ×
      </button>
    </span>
  );
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

export function TimelineGrid({ song, masters, dispatch }: Props) {
  const teMaster = masters.te;
  const textTrack = textTrackOf(song);
  const utaiInputRefs = useRef(new Map<string, HTMLInputElement>());
  // 末尾にまとめて足すときの種別と数
  const [addType, setAddType] = useState<KusariType>("honji");
  const [addCount, setAddCount] = useState("1");
  /** 数として読めない・範囲外のときは足せないようにする */
  const addCountValue = (() => {
    const n = Number(addCount);
    if (addCount.trim() === "" || !Number.isInteger(n)) return null;
    return n >= 1 && n <= KUSARI_INSERT_MAX ? n : null;
  })();
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
  const placedTe = useMemo(() => {
    const map = {} as Record<Instrument, Map<number, Placed[]>>;
    for (const inst of INSTRUMENTS) {
      map[inst] = buildPlacedTe(song, inst, teMaster[inst], globalStarts);
    }
    return map;
  }, [song, teMaster, globalStarts]);
  const placedShoga = useMemo(
    () => buildPlacedShoga(song, masters.shoga, globalStarts),
    [song, masters.shoga, globalStarts],
  );
  const utaiValues = useMemo(() => buildUtaiValues(song), [song]);

  /**
   * その手組をこのクサリに置けない理由。置けるならnull。
   * 起点はクサリの1拍目から1拍前にずらした位置に固定で、ここでは選べない。
   * 他の手組と重なるかどうかは見ない(重ねて置いてよい)。
   */
  function placementError(
    instrument: Instrument,
    teId: string,
    kusariIndex: number,
  ): string | null {
    // 曲データは手組をIDで指すため、IDが無いものは置けない
    if (teId === "") return "IDが空の手組は置けません";
    const def = findTe(teMaster[instrument], teId);
    if (!def) return "手組が見つかりません";
    const start = teInstanceStartGlobalPos(kusariIndex, globalStarts);
    if (start + def.internal_pattern.length > total) return "長さが収まりません";
    return null;
  }

  /**
   * その唱歌をこのクサリに置けない理由。置けるならnull。
   * 唱歌はクサリの頭を起点にし、手組と同じくクサリをまたいでよい。
   */
  function shogaPlacementError(
    shogaId: string,
    kusariIndex: number,
  ): string | null {
    if (shogaId === "") return "IDが空の唱歌は置けません";
    const def = findShoga(masters.shoga, shogaId);
    if (!def) return "唱歌が見つかりません";
    const start = shogaInstanceStartGlobalPos(kusariIndex, globalStarts);
    if (start + def.length > total) return "長さが収まりません";
    return null;
  }

  /** 一覧を出しているところに置けるか(手組・唱歌で見るものが違う) */
  function pickerError(state: PickerState, id: string): string | null {
    return state.instrument === null
      ? shogaPlacementError(id, state.kusariIndex)
      : placementError(state.instrument, id, state.kusariIndex);
  }

  function place(state: PickerState, id: string) {
    const error = pickerError(state, id);
    if (error) {
      window.alert(error);
      return;
    }
    if (state.instrument === null) {
      dispatch({
        type: "ADD_SHOGA_INSTANCE",
        shogaId: id,
        kusariIndex: state.kusariIndex,
      });
    } else {
      dispatch({
        type: "ADD_TE_INSTANCE",
        instrument: state.instrument,
        teId: id,
        kusariIndex: state.kusariIndex,
      });
    }
  }

  /** 一覧に出す中身。手組は楽器ごと、唱歌は1つのマスタから作る */
  function pickerEntries(state: PickerState): PickerEntry[] {
    if (state.instrument === null) {
      return masters.shoga.map((s) => ({
        uid: s.uid,
        id: s.shoga_id,
        label: s.label,
        note: `${s.length}拍`,
      }));
    }
    return teMaster[state.instrument].map((t) => ({
      uid: t.uid,
      id: t.te_id,
      label: t.label,
      note: `${t.internal_pattern.length}拍`,
    }));
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
              masters,
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
              masters,
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
              masters,
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
          title="このクサリの前にメモを入れる"
          onClick={() =>
            dispatch({ type: "ADD_MEMO", beforeKusari: kusariIndex })
          }
        >
          メモ
        </button>
        <button
          type="button"
          className="chip-remove"
          title="このクサリを削除"
          disabled={song.kusari_sequence.length <= 1}
          onClick={() =>
            dispatch({ type: "REMOVE_KUSARI", index: kusariIndex, masters })
          }
        >
          ×
        </button>
      </div>
    );
  }

  /**
   * その位置に入るメモ。手付では、ここに挟まれた順に1列ずつ出る。
   * 中身が空のメモは手付には出ないが、書きかけのまま残せるよう
   * 編集欄には出しておく。
   */
  function renderMemos(beforeKusari: number) {
    return (song.memos ?? []).map((memo, index) =>
      memo.before_kusari !== beforeKusari ? null : (
        <div key={index} className="memo-block">
          <span className="memo-label">メモ</span>
          <input
            value={memo.text}
            placeholder="手付に1列だけ入る覚え書き(空にすると出しません)"
            onChange={(e) =>
              dispatch({ type: "SET_MEMO", index, text: e.target.value })
            }
          />
          <button
            type="button"
            className="chip-remove"
            title="このメモを削除"
            onClick={() => dispatch({ type: "REMOVE_MEMO", index })}
          >
            ×
          </button>
        </div>
      ),
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
        {renderMemos(kusariIndex)}
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
            {/* 楽器ごとに1行。どの拍を占めるかは示さず、そのクサリに
                置かれている手組の名札を、置いた順に並べるだけにする */}
            {INSTRUMENTS.map((instrument) => {
              const placed = placedTe[instrument].get(kusariIndex) ?? [];
              return (
                <tr key={instrument}>
                  <th className="row-label">{INSTRUMENT_LABEL[instrument]}</th>
                  <td className="te-lane" colSpan={beats.length}>
                    <div
                      className="te-chips"
                      style={
                        {
                          "--te-color": INSTRUMENT_COLOR[instrument],
                        } as React.CSSProperties
                      }
                    >
                      {placed.map((te) => (
                        <PlacedChip
                          key={te.instanceIndex}
                          item={te}
                          onRemove={() =>
                            dispatch({
                              type: "REMOVE_TE_INSTANCE",
                              instrument,
                              instanceIndex: te.instanceIndex,
                            })
                          }
                        />
                      ))}
                      {/* 既に置いてあるかどうかに関わらず、いつでも足せる */}
                      <button
                        type="button"
                        className="te-chips-add"
                        title="このクサリに手組を追加"
                        onClick={(e) =>
                          setPicker({
                            instrument,
                            kusariIndex,
                            x: e.clientX,
                            y: e.clientY,
                          })
                        }
                      >
                        手組追加
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {/* 謡と唱歌は同じ列に書くので、選んでいるほうだけを出す */}
            {textTrack === "utai" ? (
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
            ) : (
              <tr>
                <th className="row-label">唱歌</th>
                <td className="te-lane" colSpan={beats.length}>
                  {/* 唱歌は手組と同じく、マスタのまとまりをクサリに置く */}
                  <div className="te-chips shoga-chips">
                    {(placedShoga.get(kusariIndex) ?? []).map((item) => (
                      <PlacedChip
                        key={item.instanceIndex}
                        item={item}
                        onRemove={() =>
                          dispatch({
                            type: "REMOVE_SHOGA_INSTANCE",
                            instanceIndex: item.instanceIndex,
                          })
                        }
                      />
                    ))}
                    <button
                      type="button"
                      className="te-chips-add"
                      title="このクサリに唱歌を追加"
                      onClick={(e) =>
                        setPicker({
                          instrument: null,
                          kusariIndex,
                          x: e.clientX,
                          y: e.clientY,
                        })
                      }
                    >
                      唱歌追加
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="timeline-grid-wrap">
      <h2>タイムライン</h2>

      {/* 曲名。手付の1列目(一番右)に縦書きで出る */}
      <label className="song-title-field">
        <span>タイトル</span>
        <input
          value={song.title ?? ""}
          placeholder="曲名(空にすると手付に出しません)"
          onChange={(e) =>
            dispatch({ type: "SET_TITLE", title: e.target.value })
          }
        />
      </label>

      {/* 謡と唱歌は同時に書かないので、どちらを書くかをここで選ぶ。
          選んでいない側の中身は消さずに残るので、戻せば元のまま */}
      <div className="text-track-switch">
        <span className="text-track-switch-label">文字の列</span>
        {TEXT_TRACK_KINDS.map((kind) => (
          <label key={kind}>
            <input
              type="radio"
              name="text-track"
              checked={textTrack === kind}
              onChange={() =>
                dispatch({ type: "SET_TEXT_TRACK", textTrack: kind })
              }
            />
            <span>{TEXT_TRACK_LABEL[kind]}</span>
          </label>
        ))}
        <span className="hint">
          {textTrack === "utai"
            ? "謡は1文字ずつ打ち込みます"
            : "唱歌は唱歌マスタのまとまりをクサリに置きます"}
        </span>
      </div>

      {song.kusari_sequence.map((_, i) => renderKusari(i))}
      {/* 一番最後に入れたメモ */}
      {renderMemos(song.kusari_sequence.length)}

      {/* 末尾にまとめて足す。種別と数をここで決める */}
      <div className="kusari-add-bar">
        <select
          value={addType}
          title="足すクサリの種別"
          onChange={(e) => setAddType(e.target.value as KusariType)}
        >
          {KUSARI_TYPES.map((t) => (
            <option key={t} value={t}>
              {KUSARI_LABEL[t]}
            </option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          max={KUSARI_INSERT_MAX}
          value={addCount}
          title={`まとめて足す数(1〜${KUSARI_INSERT_MAX})`}
          onChange={(e) => setAddCount(e.target.value)}
        />
        <span className="hint">つ</span>
        <button
          type="button"
          className="kusari-add"
          disabled={addCountValue === null}
          onClick={() =>
            addCountValue !== null &&
            dispatch({
              type: "INSERT_KUSARI",
              atIndex: song.kusari_sequence.length,
              kusariType: addType,
              count: addCountValue,
            })
          }
        >
          + クサリ追加
        </button>
        <button
          type="button"
          className="kusari-add"
          title="一番最後にメモを入れる"
          onClick={() =>
            dispatch({
              type: "ADD_MEMO",
              beforeKusari: song.kusari_sequence.length,
            })
          }
        >
          + メモ追加
        </button>
      </div>

      {picker && (
        <MasterPicker
          title={
            picker.instrument === null
              ? "唱歌を選ぶ"
              : `${INSTRUMENT_LABEL[picker.instrument]}の手組を選ぶ`
          }
          entries={pickerEntries(picker)}
          errorOf={(id) => pickerError(picker, id)}
          onPick={(id) => {
            place(picker, id);
            setPicker(null);
          }}
          onClose={() => setPicker(null)}
          x={picker.x}
          y={picker.y}
        />
      )}
    </div>
  );
}
