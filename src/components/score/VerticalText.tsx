// 縦書きの短い文字列(謡・掛け声)の描画。
// 謡は通常1文字1音だが、拗音や「ン」がつくと複数文字で1音になるため、
// 「1音 = 1マス」に分けてから描く。
const CHOON_LINE_RATIO = 0.85;
const CHOON_LINE_WIDTH = 1.2;

/** 長音符。縦書きでは横棒ではなく縦の棒として描く */
const CHOON_CHARS = new Set(["ー", "ｰ", "―", "─", "‐"]);

/** 拗音・促音などの小書き文字。直前の文字と合わせて1音になる */
const SMALL_KANA = new Set([
  "ぁ", "ぃ", "ぅ", "ぇ", "ぉ", "っ", "ゃ", "ゅ", "ょ", "ゎ",
  "ァ", "ィ", "ゥ", "ェ", "ォ", "ッ", "ャ", "ュ", "ョ", "ヮ", "ヵ", "ヶ",
]);

/** 前の音にくっつけて発音する「ン」 */
const N_CHARS = new Set(["ン", "ん"]);

/** 句点。謡では文字ではなく「ゴマ点」の印として描く */
const KUTEN_CHARS = new Set(["。", "｡", "．", "."]);

/** ゴマ点の大きさ(文字の大きさに対する比)と傾き */
const GOMA_WIDTH_RATIO = 0.42;
const GOMA_HEIGHT_RATIO = 0.4;

/** 小書き文字の大きさ・位置(親文字のサイズに対する比) */
const SMALL_KANA_SCALE = 0.68;
const SMALL_KANA_DX = 0.51;
const SMALL_KANA_DY = 0.28;

/**
 * 「ン」を前の音にくっつけて発音する節の表示。
 * 親文字と「ン」を小さくして、1音の枠の中に縦に並べる。
 */
const N_PAIR_SCALE = 0.8;
const N_PAIR_DY = 0.3;

/** 縦書き1マス分の単位(= 1音) */
interface CharUnit {
  base: string;
  /** 拗音などの小書き文字。親文字の右下に添える */
  small: string;
  /** 前の音にくっつけて発音する「ン」。親文字と小さくして縦に並べる */
  n: string;
}

/**
 * 文字列を「1音 = 1マス」の単位に分ける。
 * - 拗音などの小書き文字は直前の文字と合わせて1音として扱う
 * - 直前の音にくっつく「ン」も同じ1音に含める
 */
function toCharUnits(text: string): CharUnit[] {
  const units: CharUnit[] = [];
  for (const ch of Array.from(text)) {
    const prev = units[units.length - 1];
    // 「ン」を取り込んだ後の音には、それ以上ぶら下げない
    if (prev && !prev.n && SMALL_KANA.has(ch)) {
      prev.small += ch;
    } else if (prev && !prev.n && N_CHARS.has(ch)) {
      prev.n = ch;
    } else {
      units.push({ base: ch, small: "", n: "" });
    }
  }
  return units;
}

interface Props {
  cx: number;
  cy: number;
  text: string;
  color: string;
  fontSize: number;
  /** 1音あたりの高さ */
  charHeight: number;
}

/**
 * 縦書きの短い文字列。1音ずつ縦に積み、全体が(cx, cy)を中心に来るようにする。
 * - 長音符(ー)はグリフのままだと横棒になってしまうので、縦の棒として描く
 * - 拗音などの小書き文字は、独立した1マスにせず親文字の右下に小さく添える
 * - 前の音にくっつく「ン」は、親文字と小さくして1音の枠に縦に収める
 */
export function VerticalText({
  cx,
  cy,
  text,
  color,
  fontSize,
  charHeight,
}: Props) {
  const units = toCharUnits(text);
  const firstY = cy - ((units.length - 1) * charHeight) / 2;
  return (
    <g>
      {units.map((unit, i) => {
        const y = firstY + i * charHeight;

        if (KUTEN_CHARS.has(unit.base)) {
          return <GomaTen key={i} cx={cx} cy={y} size={fontSize} color={color} />;
        }

        if (CHOON_CHARS.has(unit.base)) {
          const half = (charHeight * CHOON_LINE_RATIO) / 2;
          return (
            <line
              key={i}
              x1={cx}
              x2={cx}
              y1={y - half}
              y2={y + half}
              stroke={color}
              strokeWidth={CHOON_LINE_WIDTH}
            />
          );
        }

        // 「ン」がくっつく音は、親文字と「ン」を小さくして1音の枠に縦に並べる
        const baseSize = fontSize * (unit.n ? N_PAIR_SCALE : 1);
        const baseY = unit.n ? y - charHeight * N_PAIR_DY : y;
        return (
          <g key={i}>
            <Glyph x={cx} y={baseY} size={baseSize} color={color}>
              {unit.base}
            </Glyph>
            {unit.n && (
              <Glyph x={cx} y={y + charHeight * N_PAIR_DY} size={baseSize} color={color}>
                {unit.n}
              </Glyph>
            )}
            {unit.small && (
              <Glyph
                x={cx + baseSize * SMALL_KANA_DX}
                y={baseY + baseSize * SMALL_KANA_DY}
                size={baseSize * SMALL_KANA_SCALE}
                color={color}
              >
                {unit.small}
              </Glyph>
            )}
          </g>
        );
      })}
    </g>
  );
}

/**
 * ゴマ点。句点の代わりに置く、ごまのような形の塗りつぶしの点。
 * 左上が太く、右下に向かって細くなる。
 */
function GomaTen({
  cx,
  cy,
  size,
  color,
}: {
  cx: number;
  cy: number;
  size: number;
  color: string;
}) {
  const w = size * GOMA_WIDTH_RATIO;
  const h = size * GOMA_HEIGHT_RATIO;
  // 左上の端から右下の先端へ、ふくらみを付けて往復する
  const d = [
    `M ${cx - w} ${cy - h}`,
    `Q ${cx + w} ${cy - h * 0.5} ${cx + w * 0.6} ${cy + h}`,
    `Q ${cx - w * 0.3} ${cy + h * 0.1} ${cx - w} ${cy - h}`,
    "Z",
  ].join(" ");
  return <path d={d} fill={color} />;
}

/** 1文字分のテキスト。指定座標を中心に置く */
function Glyph({
  x,
  y,
  size,
  color,
  children,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={color}
    >
      {children}
    </text>
  );
}
