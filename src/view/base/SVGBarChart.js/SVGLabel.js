export default function SVGLabel({ x0, y0, width, height, label }) {
  const fontSize = Math.min(width / label.length, height);

  return (
    <text
      x={x0 + width / 2}
      y={y0 + height / 2}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="white"
      stroke="none"
      fontSize={fontSize}
    >
      {label}
    </text>
  );
}
