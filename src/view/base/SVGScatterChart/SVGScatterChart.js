import { THEME_DATA } from '../../_constants/THEME';
import { SVGScatterChartPoints } from './SVGScatterChartPoints';
import { SVGScatterChartUtils } from './SVGScatterChartUtils';
import { SVGScatterChartAxis } from './SVGScatterChartAxis';
import { SVGScatterChartBackgroundRect } from './SVGScatterChartBackgroundRect';

export default function SVGScatterChart({
  points,
  width,
  height,
  xTitle,
  yTitle,
  formatStat,
}) {
  const boundParams = SVGScatterChartUtils.getBoundParams(points);
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
      <SVGScatterChartPoints points={points} mode="circle" {...common} />
      <SVGScatterChartPoints points={points} mode="text" {...common} />
    </svg>
  );
}
