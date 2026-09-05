// 曲データ(手付本体)をJSONファイルとして書き出す。
//
// 出力するのは SongData そのままの形。手組マスタはアプリ側が持つ
// 参照データなので含めない(曲データは te_id で参照するだけ)。
import type { SongData } from "../types";

/** ファイル名に使えない文字を落とす */
function safeFileName(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, "_") || "tetsuke";
}

/** 曲データをJSONの文字列にする */
export function songToJson(song: SongData): string {
  return `${JSON.stringify(song, null, 2)}\n`;
}

/** JSONの文字列をファイルとしてダウンロードさせる */
export function downloadJson(content: string, filename: string): void {
  const url = URL.createObjectURL(
    new Blob([content], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // すぐに解放するとダウンロードが始まらない場合があるため少し待つ
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

/** 曲データをJSONファイルとして保存する */
export function saveSongAsJson(song: SongData): void {
  downloadJson(songToJson(song), `${safeFileName(song.song_id)}.json`);
}
