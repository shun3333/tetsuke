// 編集中の曲データをブラウザに保存し、次に開いたときに復元する。
//
// 保存の形はJSON書き出しと同じ(SongDataそのまま)にしてある。
// 読み込むときは、古い形や壊れたデータで画面が落ちないよう
// 書き出したファイルを読むときと同じ検証を通す。
import type { SongData } from "../types";
import { songToJson } from "./exportSong";
import { parseSongJson } from "./importSong";

const STORAGE_KEY = "tetsuke:song";

/** 保存してある曲データを読む。無い・読めない場合は null */
export function loadStoredSong(): SongData | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const result = parseSongJson(raw);
    return result.ok ? result.song : null;
  } catch {
    return null;
  }
}

/** 編集中の曲データを保存する */
export function storeSong(song: SongData): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, songToJson(song));
  } catch {
    // 保存できない環境(プライベートモード・容量超過など)でも編集は続けられる
  }
}
