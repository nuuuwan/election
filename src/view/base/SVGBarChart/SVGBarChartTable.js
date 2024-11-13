import SVGBarChartRow from "./SVGBarChartRow";
import { useSVGBarChartContext } from "./SVGBarChartContextProvider";
export default function SVGBarChartTable() {
  const { dataList } = useSVGBarChartContext();
  return (
    <g>
      {dataList.map(function (data, i) {
        return (
          <SVGBarChartRow
            key={i}
            i={i}
            data={data}
          />
        );
      })}
    </g>
  );
}
