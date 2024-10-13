import SVGBarChartCell from "./SVGBarChartCell";
import SVGBarChartRowLabel from "./SVGBarChartRowLabel";
import { useSVGBarChartContext } from "./SVGBarChartContextProvider";

export default function SVGBarChartRow({
  i,
  data,

}) {

  const { getValues } = useSVGBarChartContext();

  const values = getValues(data, i);
  let cumValue = 0;

  return (
    <g key={i}>
      {values.map(function (value, j) {
        cumValue += value;

        return (
          <SVGBarChartCell
            key={j}
            data={data}
            i={i}
            value={value}
            j={j}
            cumValue={cumValue}
          />
        );
      })}
      <SVGBarChartRowLabel
        data={data}
        i={i}
      />
    </g>
  );
}
