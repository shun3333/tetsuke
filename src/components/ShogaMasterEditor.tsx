// 唱歌マスタ(笛)の編集画面。
//
// 笛は小鼓・大鼓のような手・掛け声を持たず、代わりに唱歌(文字の羅列)がある。
// 唱歌は主に1クサリ単位のまとまりで、それを繰り返し使うため、
// 手組マスタと同じように、まとまりを並べて管理する。
import { useRef, useState } from "react";
import type { ShogaChar, ShogaEntry, ShogaMaster } from "../types";
import { MasterList } from "./MasterList";
import { ShogaTimeline } from "./ShogaTimeline";
import { ShogaPreview } from "./ShogaPreview";
import { newUid } from "../logic/tePattern";
import { downloadJson } from "../logic/exportSong";
import {
  defaultShogaMaster,
  parseShogaMasterJson,
  shogaMasterToJson,
} from "../logic/shogaStorage";

interface Props {
  shogaMaster: ShogaMaster;
  onChange: (next: ShogaMaster) => void;
}

/** 1クサリ(本地)の拍数。新しいまとまりの既定の長さ */
const DEFAULT_LENGTH = 8;

/** 既にあるIDとぶつからないIDを作る(付け直せるので、目安でよい) */
function nextShogaId(master: ShogaMaster): string {
  for (let i = 1; ; i++) {
    const id = `shoga_${i}`;
    if (!master.some((s) => s.shoga_id === id)) return id;
  }
}

/** 拍数を縮めたとき、枠に収まらなくなった文字を取り除く */
function clampChars(chars: ShogaChar[], length: number): ShogaChar[] {
  return chars.filter((c) => c.beat >= 1 && c.beat <= length * 2);
}

export function ShogaMasterEditor({ shogaMaster, onChange }: Props) {
  // shoga_id は空でも重複してもよく、並び順も変わるので、内部IDで指す
  const [selected, setSelected] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const currentAt = shogaMaster.findIndex((s) => s.uid === selected);
  const current = currentAt < 0 ? null : shogaMaster[currentAt];

  /** 選択中のまとまりを差し替える */
  function updateCurrent(next: ShogaEntry) {
    if (!current) return;
    onChange(shogaMaster.map((s) => (s.uid === current.uid ? next : s)));
  }

  /** 選んでいるまとまりのすぐ下に足す。選んでいなければ一番下 */
  function addShoga() {
    const added: ShogaEntry = {
      uid: newUid(),
      shoga_id: nextShogaId(shogaMaster),
      label: "新しい唱歌",
      length: DEFAULT_LENGTH,
      chars: [],
    };
    const next = [...shogaMaster];
    next.splice(currentAt < 0 ? shogaMaster.length : currentAt + 1, 0, added);
    onChange(next);
    setSelected(added.uid);
  }

  /** 一覧の中でまとまりをその位置へ動かす */
  function moveTo(uid: string, to: number) {
    const from = shogaMaster.findIndex((s) => s.uid === uid);
    if (from < 0 || to < 0 || to >= shogaMaster.length || from === to) return;
    const next = [...shogaMaster];
    next.splice(to, 0, ...next.splice(from, 1));
    onChange(next);
  }

  function removeCurrent() {
    if (!current) return;
    if (!window.confirm(`「${current.label}」を削除しますか？`)) return;
    onChange(shogaMaster.filter((s) => s.uid !== current.uid));
    setSelected(null);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const result = parseShogaMasterJson(await file.text());
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
        <h2>唱歌マスタ(笛)</h2>
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
            onClick={() =>
              downloadJson(shogaMasterToJson(shogaMaster), "shoga-master.json")
            }
          >
            JSONで保存
          </button>
          <button
            type="button"
            className="toolbar-button"
            onClick={() => {
              if (!window.confirm("いまのマスタは失われます。既定に戻しますか？")) return;
              onChange(defaultShogaMaster());
              setSelected(null);
            }}
          >
            既定に戻す
          </button>
        </div>
      </div>

      <div className="master-body">
        <MasterList
          items={shogaMaster.map((s) => ({
            uid: s.uid,
            label: s.label,
            sub: `${s.length}拍${s.shoga_id === "" ? "" : ` / ${s.shoga_id}`}`,
          }))}
          selectedUid={current?.uid ?? null}
          onSelect={setSelected}
          onMove={moveTo}
          addLabel="+ 唱歌を追加"
          onAdd={addShoga}
        />

        {current === null ? (
          <p className="master-empty">左の一覧から唱歌を選んでください。</p>
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
                <span>拍数</span>
                <input
                  type="number"
                  min={1}
                  value={current.length}
                  onChange={(e) => {
                    const length = Math.max(1, Number(e.target.value));
                    updateCurrent({
                      ...current,
                      length,
                      chars: clampChars(current.chars, length),
                    });
                  }}
                />
              </label>
              <label>
                <span>ID</span>
                <input
                  value={current.shoga_id}
                  onChange={(e) =>
                    updateCurrent({ ...current, shoga_id: e.target.value })
                  }
                  title="曲データが唱歌を指すのに使うID。空でも、他と同じIDでもかまいません(同じIDのときは上にあるものを使います)"
                />
              </label>
            </div>

            <ShogaTimeline
              length={current.length}
              chars={current.chars}
              onChange={(chars) => updateCurrent({ ...current, chars })}
            />

            <button
              type="button"
              className="master-remove"
              onClick={removeCurrent}
            >
              この唱歌を削除
            </button>
          </div>
        )}

        {/* プレビューは入力エリア全体の右に置く */}
        {current !== null && (
          <div className="master-preview">
            <h3 className="master-group-title">プレビュー</h3>
            <ShogaPreview length={current.length} chars={current.chars} />
          </div>
        )}
      </div>
    </section>
  );
}
