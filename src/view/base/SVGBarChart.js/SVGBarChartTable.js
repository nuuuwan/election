import { SVGBarChartRow } from "./SVGBarChartRow";

export function SVGBarChartTable({ dataList, n, getValues, getColor, formatValue, formatRowValue, pHeight }) {
  return (
    <g>
      {dataList.map(function (data, i) {
        return (
          <SVGBarChartRow
            key={i}
            n={n}
            i={i}
            data={data}
            getValues={getValues}
            getColor={getColor}
            formatValue={formatValue}
            formatRowValue={formatRowValue}
            pHeight={pHeight} />
        );
      })}
    </g>
  );
}
