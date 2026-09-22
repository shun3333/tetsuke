// 手付をPDFファイルとして書き出す。
//
// ブラウザの印刷ダイアログを通すと、用紙の大きさ・向き・余白が
// プリンタドライバの設定に左右されてしまう。ここではアプリの中で
// A4横のPDFを組み立てるので、どのブラウザでも同じものが出る。
//
// 手付はSVGで描いているが、中の文字は同梱した筆書き風フォントで
// 書かれている。PDFに文字として入れるにはフォントを丸ごと埋め込む
// 必要があり(日本語なので部分的に取り出すのが難しい)、1ファイルが
// 数MBになってしまう。そこで、画面と同じものを高い解像度で描いた
// 画像として入れている。紙に刷る分には十分な細かさで、文字化けも
// フォントの入れ替わりも起きない。
//
// PDFを組み立てる部品(jsPDF)はそれなりに大きいので、
// 「PDFで保存」を押したときに読み込む(最初の表示を重くしないため)。

/** A4横(mm)と、紙の余白。index.css の @page と揃える */
const PAGE_WIDTH_MM = 297;
const PAGE_HEIGHT_MM = 210;
const MARGIN_MM = 10;

/** 書き出す細かさ。紙に刷ったときに線がぼけない程度に取る */
const DPI = 300;
const MM_PER_INCH = 25.4;

/** 同梱してある筆書き風フォント(index.css の @font-face と同じもの) */
const FONT_FAMILY = "Yuji Syuku";
const FONT_PATH = "fonts/YujiSyuku-Regular.woff2";

/**
 * SVGの中で使っている見た目の指定。
 * 画面ではCSS(index.css)が当てているが、SVGだけ取り出すと外れてしまうので、
 * 書き出すときは今の見え方をそのまま属性として写しておく。
 */
const COPIED_STYLES = [
  "fill",
  "stroke",
  "stroke-width",
  "stroke-linejoin",
  "stroke-linecap",
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-anchor",
  "dominant-baseline",
] as const;

/** 同梱フォントを、SVGの中に書ける形(data URL)にする */
async function loadFontDataUrl(): Promise<string> {
  const url = new URL(FONT_PATH, document.baseURI).href;
  const buffer = await (await fetch(url)).arrayBuffer();
  // btoa は文字列しか受け取らないので、1バイトずつ文字にしてから渡す。
  // 一度に渡すと引数が多すぎて落ちるため、少しずつ区切る
  const bytes = new Uint8Array(buffer);
  const chunks: string[] = [];
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) {
    chunks.push(String.fromCharCode(...bytes.subarray(i, i + step)));
  }
  return `data:font/woff2;base64,${btoa(chunks.join(""))}`;
}

/**
 * 画面に出ている手付のSVGを、それだけで完結したSVGの文字列にする。
 * CSSで当てていた見た目を属性に写し、フォントも中に埋め込む。
 */
function toStandaloneSvg(source: SVGSVGElement, fontDataUrl: string): string {
  const clone = source.cloneNode(true) as SVGSVGElement;

  // 元のSVGと複製は同じ形なので、同じ順で辿れば1対1で対応する
  const from = [source, ...source.querySelectorAll("*")];
  const to = [clone, ...clone.querySelectorAll("*")];
  from.forEach((el, i) => {
    const computed = window.getComputedStyle(el);
    const target = to[i] as SVGElement;
    for (const name of COPIED_STYLES) {
      const value = computed.getPropertyValue(name);
      if (value) target.style.setProperty(name, value);
    }
  });

  const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
  // 画像として読み込まれたSVGは外のファイルを見に行けないので、
  // フォントは中に埋め込んでおく
  style.textContent =
    `@font-face{font-family:"${FONT_FAMILY}";` +
    `src:url(${fontDataUrl}) format("woff2");}`;
  clone.insertBefore(style, clone.firstChild);

  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  return new XMLSerializer().serializeToString(clone);
}

/** SVGの文字列を、指定した幅の画像に描く */
async function renderToCanvas(
  svgText: string,
  width: number,
  height: number,
): Promise<HTMLCanvasElement> {
  const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  try {
    const image = new Image();
    image.width = width;
    image.height = height;
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("手付を画像にできませんでした"));
      image.src = url;
    });

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("手付を画像にできませんでした");
    // 白で塗っておく(塗らないと透明になり、PDFで黒く出ることがある)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** 紙の余白の内側に、縦横の比を保って収める */
function fitToPage(ratio: number) {
  const boxWidth = PAGE_WIDTH_MM - MARGIN_MM * 2;
  const boxHeight = PAGE_HEIGHT_MM - MARGIN_MM * 2;
  const scale = Math.min(boxWidth, boxHeight * ratio) / ratio;
  const height = scale;
  const width = scale * ratio;
  return {
    width,
    height,
    x: (PAGE_WIDTH_MM - width) / 2,
    y: (PAGE_HEIGHT_MM - height) / 2,
  };
}

/**
 * 画面に出ている手付のページを、A4横のPDFにまとめて保存する。
 * pages には手付1ページ分のSVGを、出す順に渡す。
 */
export async function saveScoreAsPdf(
  pages: SVGSVGElement[],
  filename: string,
): Promise<void> {
  if (pages.length === 0) throw new Error("書き出す手付がありません");

  const [{ jsPDF }, fontDataUrl] = await Promise.all([
    import("jspdf"),
    loadFontDataUrl(),
  ]);
  // compress を付けないと画像が生のまま入り、1ページで20MBを超えてしまう
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  for (const [index, svg] of pages.entries()) {
    const box = svg.viewBox.baseVal;
    const ratio = box.width / box.height;
    const place = fitToPage(ratio);
    // 紙に載る大きさ(mm)から、必要な画素数を出す
    const pixelWidth = Math.round((place.width / MM_PER_INCH) * DPI);
    const pixelHeight = Math.round(pixelWidth / ratio);

    const canvas = await renderToCanvas(
      toStandaloneSvg(svg, fontDataUrl),
      pixelWidth,
      pixelHeight,
    );

    if (index > 0) doc.addPage("a4", "landscape");
    doc.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      place.x,
      place.y,
      place.width,
      place.height,
      // 同じ画像だと思われて使い回されないよう、ページごとに別の名前を付ける
      `page-${index}`,
      "FAST",
    );
  }

  doc.save(filename);
}
