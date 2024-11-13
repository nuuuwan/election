import { THEME_DATA } from '../../_constants/THEME';
import { SVGScatterChartPoints } from './SVGScatterChartPoints';
import { SVGScatterChartUtils } from './SVGScatterChartUtils';
import { SVGScatterChartAxis } from './SVGScatterChartAxis';
import { SVGScatterChartBackgroundRect } from './SVGScatterChartBackgroundRect';

function SVGScatterChartFittedLine({ m, c, boundParams }) {
  const { xMin, xMax, transformX, transformY } = boundParams;
  const x1 = transformX(xMin);
  const x2 = transformX(xMax);
  const y1 = transformY(m * xMin + c);
  const y2 = transformY(m * xMax + c);
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#888"
      strokeWidth="0.005"
      strokeDasharray="0.01 0.01"
    />
  );
}

export default function SVGScatterChart({
  points,
  width,
  height,
  xTitle,
  yTitle,
  formatStat,
}) {
  const { m, c, extendedPoints } = SVGScatterChartUtils.extendPoints(points);
  const boundParams = SVGScatterChartUtils.getBoundParams(extendedPoints);
  const common = {
    boundParams,
    formatStat,
  };
  return (
    <svg
      viewBox={boundParams.viewBox}
      width={width}
      height={height}
      fontFamily={THEME_DATA.typography.fontFamily}
    >
      <SVGScatterChartBackgroundRect {...common} />
      <SVGScatterChartAxis title={xTitle} isX={true} {...common} />
      <SVGScatterChartAxis title={yTitle} isX={false} {...common} />
      <SVGScatterChartFittedLine m={m} c={c} {...common} />
      <SVGScatterChartPoints
        points={extendedPoints}
        mode="circle"
        {...common}
      />
      <SVGScatterChartPoints points={extendedPoints} mode="text" {...common} />
    </svg>
  );
}
