import { MathX } from "../../nonview";
import { THEME_DATA } from "../_constants/THEME";

const DEFAULT_SX = {
  width: 240,
  height: 60,
};

function SVGMultiBarChartMultiBar({
  n,
  i,
  data,
  getValues,
  getColor,
  formatValue,
  formatRowValue,
  pHeight,
}) {
  const values = getValues(data, i);
  let cumValue = 0;

  const rowValue = formatRowValue ? formatRowValue(data, i) : " ";

  const rowWidth = MathX.sum(values);
  const rowHeight = pHeight / n;
  const xRowText = rowWidth / 2;
  const yRowText = (i + 0.5) * rowHeight;
  const fontSizeRow = Math.min(rowWidth / rowValue.length, rowHeight);

  return (
    <g key={i}>
      {values.map(function (value, j) {
        cumValue += value;

        const x = cumValue - value;
        const y = (pHeight * i) / n;
        const width = value;
        const height = rowHeight;

        const label = formatValue ? formatValue(data, i, value, j) : " ";

        const xText = x + width / 2;
        const yText = y + height / 2;

        let transform = null;
        const fontSize = Math.min(width / label.length, height);
        if (width < height) {
          transform = `rotate(-90, ${xText}, ${yText})`;
        }

        return (
          <g key={j}>
            <rect
              key={j}
              x={x}
              y={y}
              width={width}
              height={height}
              fill={getColor(data, i, value, j)}
            />
            {label ? (
              <text
                x={x + width / 2}
                y={y + height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                stroke="none"
                fontSize={fontSize}
                transform={transform}
              >
                {label}
              </text>
            ) : null}
          </g>
        );
      })}
      {rowValue ? (
        <text
          x={xRowText}
          y={yRowText}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          stroke="none"
          fontSize={fontSizeRow}
        >
          {rowValue}
        </text>
      ) : null}
    </g>
  );
}

export default function SVGMultiBarChart({
  dataList,
  sx,
  getValues,
  getColor,
  formatValue,
  formatRowValue,
}) {
  sx = Object.assign({}, DEFAULT_SX, sx);

  const maxValue = Math.max(
    ...dataList.map(function (data, i) {
      return MathX.sum(getValues(data, i));
    })
  );

  const { width, height } = sx;
  const n = dataList.length;

  const pWidth = maxValue;
  const pHeight = (pWidth * sx.height) / sx.width;
  const viewBox = `0 0 ${pWidth} ${pHeight}`;

  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      fontFamily={THEME_DATA.typography.fontFamily}
    >
      {dataList.map(function (data, i) {
        return (
          <SVGMultiBarChartMultiBar
            key={i}
            n={n}
            i={i}
            data={data}
            getValues={getValues}
            getColor={getColor}
            formatValue={formatValue}
            formatRowValue={formatRowValue}
            pHeight={pHeight}
          />
        );
      })}
    </svg>
  );
}
