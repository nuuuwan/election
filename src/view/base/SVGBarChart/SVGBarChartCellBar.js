import { useSVGBarChartContext } from "./SVGBarChartContextProvider";

export default function SVGBarChartCellBar({
  data,
  i,
  value,
  j,
  x,
}) {
  const { getColor, pHeight, n } = useSVGBarChartContext();

  const height = pHeight / n;
  const y = height * i;
  const width = value;  

  return (
    <rect
      key={j}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={getColor(data, i, value, j)}
    />
  );
}
