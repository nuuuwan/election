import SVGBarChartCellBar from "./SVGBarChartCellBar";
import SVGBarChartCellLabel from "./SVGBarChartCellLabel";


export default function SVGBarChartCell({
  data,
  i,
  value,
  j,
  cumValue,
}) {



  const x = cumValue - value;

  return (
    <g key={j}>
      <SVGBarChartCellBar
        data={data}
        i={i}
        value={value}
        j={j}
        x={x}

      />
      <SVGBarChartCellLabel
        data={data}
        i={i}
        value={value}
        j={j}
        x={x}

      />
    </g>
  );
}
