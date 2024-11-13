import { THEME_DATA } from '../../_constants/THEME';
import { SVGScatterChartPoints } from './SVGScatterChartPoints';
import { SVGScatterChartUtils } from './SVGScatterChartUtils';
import { SVGScatterChartAxis } from './SVGScatterChartAxis';

export default function SVGScatterChart({
  points,
  width,
  height,
  xTitle,
  yTitle,
  formatStat,
}) {
  const boundParams = SVGScatterChartUtils.getBoundParams(points);
  return (
    <svg
      viewBox={boundParams.viewBox}
      width={width}
      height={height}
      fontFamily={THEME_DATA.typography.fontFamily}
    >
      <SVGScatterChartAxis
        title={xTitle}
        boundParams={boundParams}
        formatStat={formatStat}
        isX={true}
      />
      <SVGScatterChartAxis
        title={yTitle}
        boundParams={boundParams}
        formatStat={formatStat}
        isX={false}
      />
      <SVGScatterChartPoints
        points={points}
        boundParams={boundParams}
        formatStat={formatStat}
      />
    </svg>
  );
}
