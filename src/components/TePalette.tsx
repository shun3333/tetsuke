// 手組パレット: マスタから手組を選択してグリッドに配置するためのUI
import type { TeMaster } from "../types";

interface Props {
  teMaster: TeMaster;
  selectedTeId: string | null;
  onSelect: (teId: string | null) => void;
}

export function TePalette({ teMaster, selectedTeId, onSelect }: Props) {
  const entries = Object.values(teMaster);
  return (
    <div className="te-palette">
      <h2>手組パレット(小鼓)</h2>
      <p className="te-palette-hint">
        手組を選択してから、下のグリッドの小鼓行の配置したい拍をクリックしてください。
      </p>
      <div className="te-palette-list">
        {entries.map((te) => (
          <button
            key={te.te_id}
            type="button"
            className={
              "te-palette-item" + (selectedTeId === te.te_id ? " selected" : "")
            }
            onClick={() =>
              onSelect(selectedTeId === te.te_id ? null : te.te_id)
            }
          >
            <span className="te-name">{te.te_id}</span>
            <span className="te-length">{te.internal_pattern.length}拍</span>
          </button>
        ))}
      </div>
    </div>
  );
}
