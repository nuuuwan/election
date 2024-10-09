import { THEME_DATA } from "../_constants/THEME";


const DEFAULT_SX ={
  width: 240,
  height: 60,
}

function SVGMultiBarChartMultiBar({n, i, data, getValues, getColor, formatValue, pHeight}) {
  const values = getValues(data, i);
  let cumValue = 0;

  
  return (
    <g key={i}>
      {values.map(function (value, j) {
        cumValue += value;
       
        const x = cumValue - value;
        const y = i / n;
        const width = value;
        const height = pHeight / n;

        const label = formatValue(data, i, value, j);
        
        const xText = x + width / 2;
        const yText = y + height / 2;
        
        let transform = null;
        const fontSize = 1.5 * Math.min(width, height) / label.length ;
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
            <text 
              x = {x + width / 2}
              y = {y + height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              stroke="none"   
              fontSize={fontSize}
              transform={transform}
            >
              {label}
            </text>
          </g>
        )
      })}
    </g>
  )
}

export default function SVGMultiBarChart({ dataList, sx, getValues, getColor, formatValue}) {
  sx = Object.assign({}, DEFAULT_SX, sx);

  const {width, height} = sx;
  const n = dataList.length;
  const pHeight = sx.height / sx.width;
  const viewBox = `0 0 1 ${pHeight}`;
  return (
    <svg viewBox={viewBox} width={width} height={height} fontFamily={THEME_DATA.typography.fontFamily} >
      {dataList.map(function (data, i) {
        return <SVGMultiBarChartMultiBar key={i} n={n} i={i} data={data} getValues={getValues} getColor={getColor} formatValue={formatValue} pHeight={pHeight} />
      })}
    </svg>
  )


}
