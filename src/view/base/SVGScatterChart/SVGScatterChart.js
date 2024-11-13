import { THEME_DATA } from '../../_constants/THEME';
import { SVGScatterChartPoints } from './SVGScatterChartPoints';
import { SVGScatterChartUtils } from './SVGScatterChartUtils';
import { SVGScatterChartAxis } from './SVGScatterChartAxis';

function SVGScatterChartBackgroundRect({ boundParams }) {
  const { xMin, yMin, xSpan, ySpan, yPadding, xPadding } = boundParams;
  return (
    <g>
      <rect
        x={xMin - xPadding}
        y={yMin - yPadding}
        width={xSpan + xPadding * 2}
        height={ySpan + yPadding * 2}
        fill={'#fcfcfc'}
      />
      <rect x={xMin} y={yMin} width={xSpan} height={ySpan} fill={'#f8f8f8'} />
    </g>
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
  const boundParams = SVGScatterChartUtils.getBoundParams(points);
  return (
    <svg
      viewBox={boundParams.viewBox}
      width={width}
      height={height}
      fontFamily={THEME_DATA.typography.fontFamily}
    >
      <SVGScatterChartBackgroundRect boundParams={boundParams} />
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
