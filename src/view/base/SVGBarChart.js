import { MathX } from "../../nonview";
import { THEME_DATA } from "../_constants/THEME";

function SVGBarChartSegment({ data, formatValue, pHeight }) {
  const { label, color } = data;
  const fontSize = 0.45 * Math.min(data.x, pHeight);

  let formattedValue = formatValue(data.value);
  if (fontSize < 0.02) {
    formattedValue = "";
  }

  return (
    <g>
      <rect
        key={label}
        x={data.cumX}
        y="0"
        width={data.x}
        height={pHeight}
        fill={color}
      />

      <text
        x={data.cumX + data.x / 2}
        y={pHeight * 0.5}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fill="white"
        stroke="none"
      >
        {formattedValue}
      </text>
    </g>
  );
}

export default function SVGBarChart({ dataList, formatValue, sx = {} }) {
  const totalValue = MathX.sum(dataList.map(({ value }) => value));

  let cumX = 0;
  const extendedDataList = dataList.map(function (data) {
    const x = data.value / totalValue;
    const extendedData = Object.assign({}, data, { x, cumX });
    cumX += x;
    return extendedData;
  });

  const width = sx.width || 200;
  const height = sx.height || 40;
  const pHeight = height / width;
  const viewBox = `0 0 1 ${pHeight}`;
  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      fontFamily={THEME_DATA.typography.fontFamily}
    >
      {extendedDataList.map(function (data) {
        return (
          <SVGBarChartSegment
            key={data.label}
            data={data}
            formatValue={formatValue}
            pHeight={pHeight}
          />
        );
      })}
    </svg>
  );
}
