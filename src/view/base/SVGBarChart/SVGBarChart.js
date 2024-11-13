
import { MathX } from "../../../nonview";
import { THEME_DATA } from "../../_constants/THEME";
import SVGBarChartTable from "./SVGBarChartTable";
import SVGBarChartContextProvider from "./SVGBarChartContextProvider";

const DEFAULT_SX = {
  width: 240,
  height: 60,
};


function getMaxValue(dataList, getValues) {
  return     Math.ceil(
    Math.max(
      ...dataList.map(function (data, i) {
        return MathX.sum(getValues(data, i));
      })
    ) / 0.05
  ) * 0.05;
}

export default function SVGBarChart({
  dataList,
  sx,
  getValues,
  getColor,
  formatValue,
  formatRowValue,
}) {
  sx = Object.assign({}, DEFAULT_SX, sx);

  const maxValue = getMaxValue(dataList, getValues);

  const { width, height } = sx;

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
      <SVGBarChartContextProvider 
        dataList={dataList}
        n={dataList.length}
        getValues={getValues}
        getColor={getColor}
        formatValue={formatValue}
        formatRowValue={formatRowValue}
        sx={sx}
        pHeight={pHeight}
      >
        <SVGBarChartTable />
      </SVGBarChartContextProvider>
    </svg>
  );
}
