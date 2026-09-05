// 新規作成したときの曲データ。
import type { SongData } from "../types";

/** クサリ1つだけの、何も置いていない手付 */
export function createEmptySong(): SongData {
  return {
    song_id: "新しい手付",
    kusari_sequence: [{ index: 0, type: "honji" }],
    tracks: {},
  };
}
