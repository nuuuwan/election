export default function SVGBarChartCellBar({ getColor, data, i, value, j, x, y, width, height }) {
  return (
    <rect
      key={j}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={getColor(data, i, value, j)} />
  );
}
