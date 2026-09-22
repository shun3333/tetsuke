// 手付の操作(新規作成・サンプルに戻す・JSONの読み込み/保存・PDF保存・印刷)。
//
// PDFはアプリの中で組み立てて保存する。ブラウザの印刷ダイアログを通すと
// 用紙の大きさ・向き・余白がプリンタドライバの設定に左右されるため
// (OSのPDFプリンタを選ぶと縦向きの紙に載ってしまう等)、
// 送り先によらず同じものが出るようにしてある。
//
// 紙に直接刷りたいときのために、ブラウザの印刷も残してある。
import { useRef, useState } from "react";
import type { SongData } from "../types";
import type { SongAction } from "../state/songReducer";
import { createEmptySong } from "../data/newSong";
import { sampleSong } from "../data/sampleSong";
import { saveSongAsJson, songFileName } from "../logic/exportSong";
import { saveScoreAsPdf } from "../logic/exportPdf";
import { parseSongJson } from "../logic/importSong";

interface Props {
  song: SongData;
  dispatch: React.Dispatch<SongAction>;
}

export function ScoreToolbar({ song, dispatch }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  /** PDFを組み立てている間。何ページもあると少し待つので、その間を示す */
  const [makingPdf, setMakingPdf] = useState(false);

  async function handleSavePdf() {
    const pages = [
      ...document.querySelectorAll<SVGSVGElement>(".score-pages .score-view"),
    ];
    setMakingPdf(true);
    try {
      await saveScoreAsPdf(pages, songFileName(song, "pdf"));
    } catch (e) {
      window.alert(
        `PDFを作れませんでした。\n${e instanceof Error ? e.message : String(e)}`,
      );
    } finally {
      setMakingPdf(false);
    }
  }

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
    replaceSong(result.value, "読み込みますか？");
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
        title={`作った手付のデータ(クサリ列・手組・謡)を「${songFileName(song, "json")}」として保存します`}
      >
        JSONで保存
      </button>
      <button
        type="button"
        className="toolbar-button"
        disabled={makingPdf}
        onClick={handleSavePdf}
        title={`A4横のPDFを「${songFileName(song, "pdf")}」として保存します(印刷ダイアログは出ません)`}
      >
        {makingPdf ? "PDFを作成中…" : "PDFで保存"}
      </button>
      <button
        type="button"
        className="toolbar-button"
        onClick={() => window.print()}
        title={
          "ブラウザの印刷ダイアログを開きます(A4横)。\n" +
          "OSのPDFプリンタを選ぶと縦向きの紙になるため、その場合はレイアウトを「横」にしてください。"
        }
      >
        印刷
      </button>
      <p className="toolbar-hint">
        PDFはブラウザによらず、A4横・1ページ1枚で出力されます
      </p>
    </div>
  );
}
