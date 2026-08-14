// 手付の操作(新規作成・サンプルに戻す・JSONの読み込み/保存・PDF出力)。
//
// PDFはブラウザの印刷機能に任せる。手付は縦書き・筆書き風フォント・
// 図形が混ざるため、ブラウザにそのまま組ませたほうが画面と同じものが出る。
//
// 用紙はCSSの @page で A4横 を指定しているが、これが効くのは
// 送り先が「PDFに保存」のときだけ。OSのPDFプリンタ(Microsoft Print to PDF等)を
// 選ぶと用紙の向きはドライバ側の設定が優先され、縦向きの紙に横向きの
// 内容が回転して載ってしまう。
import { useRef } from "react";
import type { SongData } from "../types";
import type { SongAction } from "../state/songReducer";
import { createEmptySong } from "../data/newSong";
import { sampleSong } from "../data/sampleSong";
import { saveSongAsJson } from "../logic/exportSong";
import { parseSongJson } from "../logic/importSong";

interface Props {
  song: SongData;
  dispatch: React.Dispatch<SongAction>;
}

export function ScoreToolbar({ song, dispatch }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  /** 今の内容を捨てて別の曲データに差し替える。戻せないので確認してから */
  function replaceSong(next: SongData, what: string) {
    if (!window.confirm(`いま編集している内容は失われます。${what}`)) return;
    dispatch({ type: "LOAD_SONG", song: next });
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // 同じファイルを続けて選べるよう、値を空に戻しておく
    e.target.value = "";
    if (!file) return;

    const result = parseSongJson(await file.text());
    if (!result.ok) {
      window.alert(`読み込めませんでした。\n${result.error}`);
      return;
    }
    replaceSong(result.song, "読み込みますか？");
  }

  return (
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
        onClick={() => replaceSong(createEmptySong(), "新規作成しますか？")}
        title="クサリ1つだけの、何も置いていない手付から始めます"
      >
        新規作成
      </button>
      <button
        type="button"
        className="toolbar-button"
        onClick={() => replaceSong(sampleSong, "サンプルに戻しますか？")}
        title="最初に入っているサンプルの手付に戻します"
      >
        サンプルに戻す
      </button>
      <button
        type="button"
        className="toolbar-button"
        onClick={() => fileRef.current?.click()}
        title="「JSONで保存」で書き出したファイルを読み込みます"
      >
        JSONを読み込む
      </button>
      <button
        type="button"
        className="toolbar-button"
        onClick={() => saveSongAsJson(song)}
        title="作った手付のデータ(クサリ列・手組・謡)をJSONファイルとして保存します"
      >
        JSONで保存
      </button>
      <button
        type="button"
        className="toolbar-button"
        onClick={() => window.print()}
        title={
          "印刷ダイアログで送り先に「PDFに保存」を選んでください(A4横で出力されます)。\n" +
          "OSのPDFプリンタを選ぶと縦向きの紙になるため、その場合はレイアウトを「横」にしてください。"
        }
      >
        PDFで出力
      </button>
      <p className="toolbar-hint">
        PDFは送り先に「PDFに保存」を選ぶとA4横で出力されます
      </p>
    </div>
  );
}
