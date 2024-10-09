export default function SVGLabel({ x0, y0, width, height, label }) {
  let transform = null;
  let minDim = height;
  let maxDim = width;
  if (width < height) {
    transform = `rotate(-90, ${x0 + width / 2}, ${y0 + height / 2})`;
    minDim = width;
    maxDim = height;
  }
  const fontSize = Math.min(maxDim / label.length, minDim);

  return (
    <text
      x={x0 + width / 2}
      y={y0 + height / 2 + fontSize * 0.05}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="white"
      stroke="none"
      fontSize={fontSize}
      transform={transform}
    >
      {label}
    </text>
  );
}
