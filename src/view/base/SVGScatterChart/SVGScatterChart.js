import { THEME_DATA } from '../../_constants/THEME';
import { SVGScatterChartPoints } from './SVGScatterChartPoints';
import { SVGScatterChartUtils } from './SVGScatterChartUtils';
import { SVGScatterChartAxis } from './SVGScatterChartAxis';
import { SVGScatterChartBackgroundRect } from './SVGScatterChartBackgroundRect';
import { SVGScatterChartFittedLine } from './SVGScatterChartFittedLine';

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
