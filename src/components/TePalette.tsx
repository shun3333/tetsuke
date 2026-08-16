// 手組パレット: マスタから手組を選択してグリッドに配置するためのUI。
// 楽器ごとに手組が違うので、楽器ごとに分けて並べる。
import {
  INSTRUMENTS,
  INSTRUMENT_LABEL,
  type Instrument,
  type TeMaster,
} from "../types";
import type { SelectedTe } from "./TimelineGrid";

interface Props {
  teMaster: Record<Instrument, TeMaster>;
  selectedTe: SelectedTe | null;
  onSelect: (selected: SelectedTe | null) => void;
}

export function TePalette({ teMaster, selectedTe, onSelect }: Props) {
  return (
    <div className="te-palette">
      <h2>手組パレット</h2>
      <p className="te-palette-hint">
        手組を選択してから、下のグリッドの同じ楽器の行の配置したい拍をクリックしてください。
        選択せずに拍をクリックすると、その場で一覧から選べます。
      </p>
      {INSTRUMENTS.map((instrument) => (
        <div key={instrument} className="te-palette-group">
          <h3 className="te-palette-group-title">
            {INSTRUMENT_LABEL[instrument]}
          </h3>
          <div className="te-palette-list">
            {teMaster[instrument].map((te, i) => {
              const selected =
                selectedTe?.instrument === instrument &&
                selectedTe.teId === te.te_id;
              return (
                <button
                  key={i}
                  type="button"
                  className={"te-palette-item" + (selected ? " selected" : "")}
                  onClick={() =>
                    onSelect(selected ? null : { instrument, teId: te.te_id })
                  }
                >
                  <span className="te-name">{te.label}</span>
                  <span className="te-length">
                    {te.internal_pattern.length}拍
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
