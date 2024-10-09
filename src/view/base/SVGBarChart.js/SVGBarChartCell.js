import SVGBarChartCellBar from "./SVGBarChartCellBar";
import SVGBarChartCellLabel from "./SVGBarChartCellLabel";


export default function SVGBarChartCell({ n, data, i, getColor, formatValue, pHeight, cumValue, value, j }) {

  const x = cumValue - value;
  const y = (pHeight * i) / n;
  const width = value;
  const height = pHeight / n;


  return (
    <g key={j}>

      <SVGBarChartCellBar 
        getColor={getColor}
        data={data}
        i={i}
        value={value}
        j={j}
        x={x}
        y={y}
        width={width}
        height={height}
        />
     
      <SVGBarChartCellLabel 
        formatValue={formatValue}
        data={data}
        i={i}
        value={value}
        j={j}
        x={x}
        y={y}
        width={width}
        height={height}
        />
    </g>
  );
}
