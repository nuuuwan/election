import { MathX } from "../../../nonview";
import { THEME_DATA } from "../../_constants/THEME";
import SVGBarChartTable from "./SVGBarChartTable";

const DEFAULT_SX = {
  width: 240,
  height: 60,
};

export default function SVGBarChart({
  dataList,
  sx,
  getValues,
  getColor,
  formatValue,
  formatRowValue,
}) {
  sx = Object.assign({}, DEFAULT_SX, sx);

  const maxValue =
    Math.ceil(
      Math.max(
        ...dataList.map(function (data, i) {
          return MathX.sum(getValues(data, i));
        })
      ) / 0.05
    ) * 0.05;

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
      <SVGBarChartTable
        dataList={dataList}
        n={n}
        getValues={getValues}
        getColor={getColor}
        formatValue={formatValue}
        formatRowValue={formatRowValue}
        pHeight={pHeight}
      />
    </svg>
  );
}
