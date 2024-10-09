import SVGBarChartCell from "./SVGBarChartCell";
import SVGBarChartRowLabel from "./SVGBarChartRowLabel";

export default function SVGBarChartRow({
  n, i, data, getValues, getColor, formatValue, formatRowValue, pHeight,
}) {
  const values = getValues(data, i);
  let cumValue = 0;

  return (
    <g key={i}>
      {values.map(function (value, j) {
        cumValue += value;

        return <SVGBarChartCell
          key={j}
          n={n}
          data={data}
          i={i}
          getColor={getColor}
          formatValue={formatValue}
          pHeight={pHeight}

          cumValue={cumValue}
          value={value}
          j={j} />;

      })}
      <SVGBarChartRowLabel 
        getValues={getValues}   
        formatRowValue={formatRowValue}
        n={n}
        data={data}
        i={i}
        pHeight={pHeight}

        />

    </g>
  );
}
