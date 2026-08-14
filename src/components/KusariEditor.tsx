// クサリ列(拍子の単位)の編集: 追加・削除・type変更
import {
  KUSARI_LABEL,
  KUSARI_TYPES,
  type Instrument,
  type KusariType,
  type SongData,
  type TeMaster,
} from "../types";
import type { SongAction } from "../state/songReducer";

interface Props {
  song: SongData;
  /** クサリが短くなったとき、収まらない手組を落とすために必要 */
  teMaster: Record<Instrument, TeMaster>;
  dispatch: React.Dispatch<SongAction>;
}

export function KusariEditor({ song, teMaster, dispatch }: Props) {
  return (
    <div className="kusari-editor">
      <h2>クサリ列</h2>
      <div className="kusari-chips">
        {song.kusari_sequence.map((k, i) => (
          <div className="kusari-chip" key={i}>
            <select
              value={k.type}
              onChange={(e) =>
                dispatch({
                  type: "SET_KUSARI_TYPE",
                  index: i,
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
              title="このクサリを削除"
              disabled={song.kusari_sequence.length <= 1}
              onClick={() =>
                dispatch({ type: "REMOVE_KUSARI", index: i, teMaster })
              }
            >
              ×
            </button>
          </div>
        ))}
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
      </div>
    </div>
  );
}
