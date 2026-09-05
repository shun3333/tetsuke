// 手組マスタの編集画面。
//
// 手組の中身の位置(rel_pos / from_pos / to_pos)は半拍単位で、
// 手組をN拍目に置いたとき rel_pos: 0 がN拍の表、2k が (N+k)拍の表、
// 奇数はその裏になる。数字だけでは分かりにくいので、入力欄の横に
// 「+2拍 表」のような読み方を添える。
import { useRef, useState } from "react";
import {
  INSTRUMENTS,
  INSTRUMENT_LABEL,
  TIMINGS,
  TIMING_LABEL,
  TIMING_SIGN,
  type GuideEntry,
  type GuideShape,
  type Instrument,
  type TeMaster,
  type TeMasterEntry,
  type Timing,
} from "../types";
import { TE_GLYPH_MASTER } from "../data/instruments";
import { TeGumiTimeline } from "./TeGumiTimeline";
import { MasterList } from "./MasterList";
import { clampToLength, newUid } from "../logic/tePattern";
import { TeGumiPreview } from "./TeGumiPreview";
import { downloadJson } from "../logic/exportSong";
import {
  defaultTeMaster,
  parseTeMasterJson,
  teMasterToJson,
  type TeMasterByInstrument,
} from "../logic/masterStorage";

interface Props {
  teMaster: TeMasterByInstrument;
  onChange: (next: TeMasterByInstrument) => void;
}

/** 半拍単位の位置を「+2拍 表」のような読み方にする */
function positionLabel(relPos: number): string {
  const beats = Math.floor(relPos / 2);
  const side = relPos % 2 === 0 ? "表" : "裏";
  return `${beats >= 0 ? "+" : ""}${beats}拍 ${side}`;
}

/** 既にあるIDとぶつからないIDを作る(付け直せるので、目安でよい) */
function nextTeId(master: TeMaster): string {
  for (let i = 1; ; i++) {
    const id = `te_${i}`;
    if (!master.some((te) => te.te_id === id)) return id;
  }
}

export function TeMasterEditor({ teMaster, onChange }: Props) {
  const [instrument, setInstrument] = useState<Instrument>(INSTRUMENTS[0]);
  // te_id は空でも重複してもよく、並び順も変わるので、内部IDで手組を指す
  const [selected, setSelected] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const entries = teMaster[instrument];
  const currentAt = entries.findIndex((te) => te.uid === selected);
  const current = currentAt < 0 ? null : entries[currentAt];
  const teNames = Object.values(TE_GLYPH_MASTER[instrument]);

  /** 一覧の中の位置。無ければ -1 */
  const indexOf = (uid: string) => entries.findIndex((te) => te.uid === uid);

  /** その楽器の一覧を差し替える */
  function replaceEntries(next: TeMaster) {
    onChange({ ...teMaster, [instrument]: next });
  }

  /** 選択中の手組を差し替える */
  function updateCurrent(next: TeMasterEntry) {
    if (!current) return;
    replaceEntries(entries.map((te) => (te.uid === current.uid ? next : te)));
  }

  /** 選択中の手組の内部パターンだけ差し替える */
  function updatePattern(patch: Partial<TeMasterEntry["internal_pattern"]>) {
    if (!current) return;
    updateCurrent({
      ...current,
      internal_pattern: { ...current.internal_pattern, ...patch },
    });
  }

  /** 選んでいる手組のすぐ下に足す。選んでいなければ一番下 */
  function addTe() {
    const added: TeMasterEntry = {
      uid: newUid(),
      te_id: nextTeId(entries),
      label: "新しい手組",
      instrument,
      internal_pattern: { length: 4, kakegoe: [], hits: [] },
    };
    const next = [...entries];
    next.splice(currentAt < 0 ? entries.length : currentAt + 1, 0, added);
    replaceEntries(next);
    setSelected(added.uid);
  }

  /** 一覧の中で手組をその位置へ動かす。選択は内部IDで追いかける */
  function moveTeTo(uid: string, to: number) {
    const from = indexOf(uid);
    if (from < 0 || to < 0 || to >= entries.length || from === to) return;
    const next = [...entries];
    next.splice(to, 0, ...next.splice(from, 1));
    replaceEntries(next);
  }

  function removeTe(uid: string) {
    const te = entries[indexOf(uid)];
    if (!te || !window.confirm(`「${te.label}」を削除しますか？`)) return;
    replaceEntries(entries.filter((e) => e.uid !== uid));
    if (selected === uid) setSelected(null);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const result = parseTeMasterJson(await file.text());
    if (!result.ok) {
      window.alert(`読み込めませんでした。\n${result.error}`);
      return;
    }
    if (!window.confirm("いまのマスタは失われます。読み込みますか？")) return;
    onChange(result.value);
    setSelected(null);
  }


  return (
    <section className="master-pane">
      <div className="master-header">
        <h2>手組マスタ</h2>
        <div className="score-toolbar">
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            onChange={handleFileChange}
            hidden
          />
          <button
            type="button"
            className="toolbar-button"
            onClick={() => fileRef.current?.click()}
          >
            JSONを読み込む
          </button>
          <button
            type="button"
            className="toolbar-button"
            onClick={() => downloadJson(teMasterToJson(teMaster), "te-master.json")}
          >
            JSONで保存
          </button>
          <button
            type="button"
            className="toolbar-button"
            onClick={() => {
              if (!window.confirm("いまのマスタは失われます。既定に戻しますか？")) return;
              onChange(defaultTeMaster());
              setSelected(null);
            }}
          >
            既定に戻す
          </button>
        </div>
      </div>

      <div className="master-instrument-tabs">
        {INSTRUMENTS.map((inst) => (
          <button
            key={inst}
            type="button"
            className={"tab-button" + (inst === instrument ? " selected" : "")}
            onClick={() => {
              setInstrument(inst);
              setSelected(null);
            }}
          >
            {INSTRUMENT_LABEL[inst]}
          </button>
        ))}
      </div>

      <div className="master-body">
        <MasterList
          items={entries.map((te) => ({
            uid: te.uid,
            label: te.label,
            sub: `${te.internal_pattern.length}拍${
              te.te_id === "" ? "" : ` / ${te.te_id}`
            }`,
          }))}
          selectedUid={current?.uid ?? null}
          onSelect={setSelected}
          onMove={moveTeTo}
          addLabel="+ 手組を追加"
          onAdd={addTe}
        />

        {current === null ? (
          <p className="master-empty">左の一覧から手組を選んでください。</p>
        ) : (
          <div className="master-detail">
            <div className="master-fields">
              <label>
                <span>名前</span>
                <input
                  value={current.label}
                  onChange={(e) =>
                    updateCurrent({ ...current, label: e.target.value })
                  }
                />
              </label>
              <label>
                <span>長さ(拍)</span>
                <input
                  type="number"
                  min={1}
                  value={current.internal_pattern.length}
                  onChange={(e) => {
                    const length = Math.max(1, Number(e.target.value));
                    updatePattern({
                      length,
                      ...clampToLength(current.internal_pattern, length),
                    });
                  }}
                />
              </label>
              <label>
                <span>ID</span>
                <input
                  value={current.te_id}
                  onChange={(e) =>
                    updateCurrent({ ...current, te_id: e.target.value })
                  }
                  title="曲データが手組を指すのに使うID。変えると、既に置いてある手組は表示されなくなります。空でも、他と同じIDでもかまいません(同じIDのときは上にあるものを使います)"
                />
              </label>
            </div>

            <TeGumiTimeline
              pattern={current.internal_pattern}
              teNames={teNames}
              onChange={updatePattern}
            />

            <EntryList<GuideEntry>
              title="補助線"
              items={current.internal_pattern.guides ?? []}
              onChange={(guides) => updatePattern({ guides })}
              create={() => ({ from_pos: 0, to_pos: 2, shape: "straight" })}
              render={(guide, set) => (
                <>
                  <PositionInput
                    value={guide.from_pos}
                    onChange={(from_pos) => set({ ...guide, from_pos })}
                    timing={guide.from_timing ?? "on"}
                    onTimingChange={(from_timing) => set({ ...guide, from_timing })}
                  />
                  <PositionInput
                    value={guide.to_pos}
                    onChange={(to_pos) => set({ ...guide, to_pos })}
                    timing={guide.to_timing ?? "on"}
                    onTimingChange={(to_timing) => set({ ...guide, to_timing })}
                  />
                  <select
                    value={guide.shape}
                    onChange={(e) =>
                      set({ ...guide, shape: e.target.value as GuideShape })
                    }
                  >
                    <option value="straight">直線</option>
                    <option value="bent">くの字</option>
                  </select>
                </>
              )}
            />

            <button
              type="button"
              className="master-remove"
              onClick={() => removeTe(current.uid)}
            >
              この手組を削除
            </button>
          </div>
        )}

        {/* プレビューは入力エリア全体の右に置く */}
        {current !== null && (
          <div className="master-preview">
            <h3 className="master-group-title">プレビュー</h3>
            <TeGumiPreview
              pattern={current.internal_pattern}
              instrument={instrument}
            />
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * 半拍単位の位置の入力欄。読み方を横に添える。
 * 手と同じように、そこから少し上下にずらすことができる。
 */
function PositionInput({
  value,
  onChange,
  timing,
  onTimingChange,
}: {
  value: number;
  onChange: (value: number) => void;
  timing: Timing;
  onTimingChange: (timing: Timing) => void;
}) {
  // 打ち込んでいる途中は空にもできるよう、入力欄の文字は別に持つ。
  // 数として読める間だけ、外の値を書き換える。
  const [text, setText] = useState(() => String(value));
  const [shown, setShown] = useState(value);
  if (shown !== value) {
    // 外から値が変わったときは、そちらに合わせる
    setShown(value);
    setText(String(value));
  }

  return (
    <span className="master-position">
      <input
        type="number"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          const next = Number(e.target.value);
          if (e.target.value.trim() !== "" && Number.isFinite(next)) {
            setShown(next);
            onChange(next);
          }
        }}
        // 空のまま離れたら、いまの値に戻す(勝手に0を入れない)
        onBlur={() => setText(String(value))}
      />
      <select
        className="master-position-timing"
        value={timing}
        title={`ずらし方: ${TIMING_LABEL[timing]}`}
        onChange={(e) => onTimingChange(e.target.value as Timing)}
      >
        {TIMINGS.map((t) => (
          <option key={t} value={t} title={TIMING_LABEL[t]}>
            {TIMING_SIGN[t]}
          </option>
        ))}
      </select>
      <span className="master-position-hint">{positionLabel(value)}</span>
    </span>
  );
}

/** 手・掛け声・補助線のように「同じ形のものを並べる」欄 */
function EntryList<T>({
  title,
  items,
  onChange,
  create,
  render,
}: {
  title: string;
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  render: (item: T, set: (next: T) => void) => React.ReactNode;
}) {
  const replace = (i: number, next: T) =>
    onChange(items.map((item, j) => (j === i ? next : item)));
  return (
    <div className="master-group">
      <h3 className="master-group-title">{title}</h3>
      {items.map((item, i) => (
        <div key={i} className="master-row">
          {render(item, (next) => replace(i, next))}
          <button
            type="button"
            className="chip-remove"
            title="この行を削除"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        className="kusari-add"
        onClick={() => onChange([...items, create()])}
      >
        + 追加
      </button>
    </div>
  );
}
