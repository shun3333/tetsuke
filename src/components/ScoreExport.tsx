// 手付のファイル出力(PDF)。
//
// PDFはブラウザの印刷機能に任せる。手付は縦書き・筆書き風フォント・
// 図形が混ざるため、ブラウザにそのまま組ませたほうが画面と同じものが出る。
//
// 用紙はCSSの @page で A4横 を指定しているが、これが効くのは
// 送り先が「PDFに保存」のときだけ。OSのPDFプリンタ(Microsoft Print to PDF等)を
// 選ぶと用紙の向きはドライバ側の設定が優先され、縦向きの紙に横向きの
// 内容が回転して載ってしまう。

export function ScoreExport() {
  return (
    <div className="score-export">
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
