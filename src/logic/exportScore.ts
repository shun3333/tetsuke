// 手付をファイルとして書き出す。
//
// 画面上の手付はCSS(index.css)に色や書体を任せているが、SVGファイルは
// 単体で開かれるため、同じ見た目になるよう必要な指定を埋め込む。
const SVG_NS = "http://www.w3.org/2000/svg";
const FONT_FAMILY = "Yuji Syuku";
const FONT_URL = `${import.meta.env.BASE_URL}fonts/YujiSyuku-Regular.woff2`;

/** 手付は印刷物なので、書き出しでも白地に黒線にする */
const PAPER_COLOR = "#ffffff";

/** index.css の .score-view 配下と同じ指定。クラスで決まる分だけ持つ */
const SCORE_CSS = `
text { font-family: '${FONT_FAMILY}', serif; }
.skewer-line { stroke: #888888; }
.skewer-line.thick { stroke: #000000; stroke-width: 1.6; }
.beat-axis-text { fill: #000000; }
`;

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  // 一度に渡すと引数が多すぎて落ちるため、小分けにして文字列にする
  const CHUNK = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

/** 同梱フォントを@font-faceとして埋め込む。読めなければ空文字(既定の明朝で開かれる) */
let fontFaceCssCache: Promise<string> | null = null;
function loadFontFaceCss(): Promise<string> {
  fontFaceCssCache ??= (async () => {
    try {
      const res = await fetch(FONT_URL);
      if (!res.ok) return "";
      const dataUrl = `data:font/woff2;base64,${toBase64(await res.arrayBuffer())}`;
      return `@font-face { font-family: '${FONT_FAMILY}'; src: url('${dataUrl}') format('woff2'); }\n`;
    } catch {
      return "";
    }
  })();
  return fontFaceCssCache;
}

/** viewBox("0 0 W H")から紙の大きさを取り出す */
function paperSizeOf(svg: SVGSVGElement): { width: number; height: number } {
  const [, , width, height] = (svg.getAttribute("viewBox") ?? "")
    .split(/\s+/)
    .map(Number);
  return {
    width: width || svg.clientWidth,
    height: height || svg.clientHeight,
  };
}

/**
 * 画面上の手付1ページ分を、単体で開けるSVGファイルの中身にする。
 * embedFont を立てると書体を埋め込むので、フォントの無い環境でも
 * 同じ字形で開ける(そのぶんファイルは数MBになる)。
 */
export async function buildSvgFile(
  svg: SVGSVGElement,
  embedFont: boolean,
): Promise<string> {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", SVG_NS);

  // SVG単体では背景色が付かないので、白い紙を敷く
  const { width, height } = paperSizeOf(svg);
  const background = document.createElementNS(SVG_NS, "rect");
  background.setAttribute("x", "0");
  background.setAttribute("y", "0");
  background.setAttribute("width", String(width));
  background.setAttribute("height", String(height));
  background.setAttribute("fill", PAPER_COLOR);
  clone.insertBefore(background, clone.firstChild);

  const style = document.createElementNS(SVG_NS, "style");
  style.textContent = (embedFont ? await loadFontFaceCss() : "") + SCORE_CSS;
  clone.insertBefore(style, clone.firstChild);

  const xml = new XMLSerializer().serializeToString(clone);
  return `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
}

/** 文字列をファイルとしてダウンロードさせる */
export function downloadFile(
  content: string,
  filename: string,
  mimeType: string,
): void {
  const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // すぐに解放するとダウンロードが始まらない場合があるため少し待つ
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

/** ファイル名に使えない文字を落とす */
function safeFileName(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, "_") || "tetsuke";
}

/**
 * 手付をページごとのSVGファイルとして保存する。
 * 1ページ = 1ファイルで、複数ページあるときは連番を付ける。
 */
export async function saveScoreAsSvg(
  svgs: SVGSVGElement[],
  songId: string,
  embedFont = true,
): Promise<void> {
  const base = safeFileName(songId);
  for (const [i, svg] of svgs.entries()) {
    const content = await buildSvgFile(svg, embedFont);
    const name = svgs.length > 1 ? `${base}-${i + 1}.svg` : `${base}.svg`;
    downloadFile(content, name, "image/svg+xml");
    // 連続でダウンロードするとブラウザに止められることがあるため間を空ける
    if (i < svgs.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }
}
