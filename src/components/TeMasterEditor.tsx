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
  type GuideEntry,
  type GuideShape,
  type Instrument,
  type TeMaster,
  type TeMasterEntry,
} from "../types";
import { TE_GLYPH_MASTER } from "../data/instruments";
import { TeGumiTimeline } from "./TeGumiTimeline";
import { clampToLength } from "../logic/tePattern";
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

/** 並び順を保つため、IDの列の順にオブジェクトを作り直す */
function reorderByIds(entries: TeMaster, ids: string[]): TeMaster {
  const next: TeMaster = {};
  for (const id of ids) next[id] = entries[id];
  return next;
}

/** 既にある名前とぶつからないIDを作る */
function nextTeId(master: TeMaster): string {
  for (let i = 1; ; i++) {
    const id = `te_${i}`;
    if (!master[id]) return id;
  }
}

export function TeMasterEditor({ teMaster, onChange }: Props) {
  const [instrument, setInstrument] = useState<Instrument>(INSTRUMENTS[0]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const entries = teMaster[instrument];
  const currentId = selectedId && entries[selectedId] ? selectedId : null;
  const current = currentId ? entries[currentId] : null;
  const teNames = Object.values(TE_GLYPH_MASTER[instrument]);

  /** 選択中の手組を差し替える */
  function updateCurrent(next: TeMasterEntry) {
    if (!currentId) return;
    onChange({
      ...teMaster,
      [instrument]: { ...entries, [currentId]: next },
    });
  }

  /** 選択中の手組の内部パターンだけ差し替える */
  function updatePattern(patch: Partial<TeMasterEntry["internal_pattern"]>) {
    if (!current) return;
    updateCurrent({
      ...current,
      internal_pattern: { ...current.internal_pattern, ...patch },
    });
  }

  function addTe() {
    const id = nextTeId(entries);
    onChange({
      ...teMaster,
      [instrument]: {
        ...entries,
        [id]: {
          te_id: id,
          label: "新しい手組",
          instrument,
          internal_pattern: { length: 4, kakegoe: [], hits: [] },
        },
      },
    });
    setSelectedId(id);
  }

  /** 一覧の中で手組を前後に動かす */
  function moveTe(id: string, delta: number) {
    const ids = Object.keys(entries);
    const from = ids.indexOf(id);
    const to = from + delta;
    if (from < 0 || to < 0 || to >= ids.length) return;
    ids.splice(to, 0, ...ids.splice(from, 1));
    onChange({ ...teMaster, [instrument]: reorderByIds(entries, ids) });
  }

  function removeTe(id: string) {
    if (!window.confirm(`「${entries[id].label}」を削除しますか？`)) return;
    const next = { ...entries };
    delete next[id];
    onChange({ ...teMaster, [instrument]: next });
    if (selectedId === id) setSelectedId(null);
  }

  /** IDを変えると、既に置いてある手組はこのIDを見失う */
  function renameTeId(nextId: string) {
    if (!currentId || !current || nextId === "" || entries[nextId]) return;
    // 数字だけのIDは並び順を保てなくなるため受け付けない
    if (/^\d+$/.test(nextId)) return;
    const renamed = { ...entries, [nextId]: { ...current, te_id: nextId } };
    delete renamed[currentId];
    const ids = Object.keys(entries).map((id) =>
      id === currentId ? nextId : id,
    );
    onChange({ ...teMaster, [instrument]: reorderByIds(renamed, ids) });
    setSelectedId(nextId);
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
    setSelectedId(null);
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
              setSelectedId(null);
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
              setSelectedId(null);
            }}
          >
            {INSTRUMENT_LABEL[inst]}
          </button>
        ))}
      </div>

      <div className="master-body">
        <div className="master-list">
          {Object.values(entries).map((te, i, all) => (
            <div key={te.te_id} className="master-list-row">
              <button
                type="button"
                className={
                  "master-list-item" +
                  (te.te_id === currentId ? " selected" : "")
                }
                onClick={() => setSelectedId(te.te_id)}
              >
                <span className="te-name">{te.label}</span>
                <span className="te-length">
                  {te.internal_pattern.length}拍 / {te.te_id}
                </span>
              </button>
              <div className="master-list-move">
                <button
                  type="button"
                  className="chip-remove"
                  title="1つ上へ移動"
                  disabled={i === 0}
                  onClick={() => moveTe(te.te_id, -1)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="chip-remove"
                  title="1つ下へ移動"
                  disabled={i === all.length - 1}
                  onClick={() => moveTe(te.te_id, 1)}
                >
                  ↓
                </button>
              </div>
            </div>
          ))}
          <button type="button" className="kusari-add" onClick={addTe}>
            + 手組を追加
          </button>
        </div>

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
                  onChange={(e) => renameTeId(e.target.value)}
                  title="曲データが手組を指すのに使うID。変えると、既に置いてある手組は表示されなくなります"
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
                  />
                  <PositionInput
                    value={guide.to_pos}
                    onChange={(to_pos) => set({ ...guide, to_pos })}
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
              onClick={() => removeTe(current.te_id)}
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

/** 半拍単位の位置の入力欄。読み方を横に添える */
function PositionInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <span className="master-position">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
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
