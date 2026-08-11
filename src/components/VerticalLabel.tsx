// 短い語を1文字ずつ縦に積んで表示する(軸ラベル・手組名などの縦書き風表示用)
interface Props {
  text: string;
  x: number;
  y: number;
  charHeight?: number;
  fontSize?: number;
  className?: string;
}

export function VerticalLabel({
  text,
  x,
  y,
  charHeight = 16,
  fontSize = 14,
  className,
}: Props) {
  const chars = Array.from(text);
  return (
    <text x={x} y={y} fontSize={fontSize} textAnchor="middle" className={className}>
      {chars.map((ch, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : charHeight}>
          {ch}
        </tspan>
      ))}
    </text>
  );
}
