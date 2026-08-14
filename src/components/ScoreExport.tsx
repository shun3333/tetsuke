// 手付のファイル出力(SVG / PDF)。
//
// PDFはブラウザの印刷機能に任せる。手付は縦書き・筆書き風フォント・
// 図形が混ざるため、ブラウザにそのまま組ませたほうが画面と同じものが出る。
//
// 用紙はCSSの @page で A4横 を指定しているが、これが効くのは
// 送り先が「PDFに保存」のときだけ。OSのPDFプリンタ(Microsoft Print to PDF等)を
// 選ぶと用紙の向きはドライバ側の設定が優先され、縦向きの紙に横向きの
// 内容が回転して載ってしまう。
import { useState } from "react";
import { saveScoreAsSvg } from "../logic/exportScore";

interface Props {
  /** 手付を描いている領域。この中の<svg>を書き出す */
  targetRef: React.RefObject<HTMLDivElement | null>;
  songId: string;
}

export function ScoreExport({ targetRef, songId }: Props) {
  const [saving, setSaving] = useState(false);

  async function handleSaveSvg() {
    const svgs = Array.from(
      targetRef.current?.querySelectorAll<SVGSVGElement>("svg.score-view") ?? [],
    );
    if (svgs.length === 0) return;
    setSaving(true);
    try {
      await saveScoreAsSvg(svgs, songId);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="score-export">
      <button
        type="button"
        className="export-button"
        onClick={handleSaveSvg}
        disabled={saving}
        title="1ページにつき1ファイル。書体を埋め込むので他の環境でも同じ字形で開ける"
      >
        {saving ? "保存中…" : "SVGで保存"}
      </button>
      <button
        type="button"
        className="export-button"
        onClick={() => window.print()}
        title={
          "印刷ダイアログで送り先に「PDFに保存」を選んでください(A4横で出力されます)。\n" +
          "OSのPDFプリンタを選ぶと縦向きの紙になるため、その場合はレイアウトを「横」にしてください。"
        }
      >
        PDFで出力
      </button>
      <p className="export-hint">
        PDFは送り先に「PDFに保存」を選ぶとA4横で出力されます
      </p>
    </div>
  );
}
