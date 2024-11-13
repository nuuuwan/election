import { Translate, StringX } from '../../../nonview';
import {
  SVGScatterChart,
  CustomAlert,
  ExternalMedia,
  ExternalMediaCustomData,
} from '../..';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';
import { Typography } from '@mui/material';
import MLR from 'ml-regression-multivariate-linear';

function getRawPoints(electionX, electionY, entIdx, getValue) {
  return electionX.baseResultList
    .map(function (resultX) {
      const x = getValue(resultX);
      const entID = resultX.entID;
      const ent = entIdx[entID];
      const resultY = electionY.getResultSafe(entID);
      if (!resultY) {
        return null;
      }
      const y = getValue(resultY);

      const pDelta = (y - x) / x;

      return {
        entID,
        ent,
        x,
        y,
        pDelta,
        resultX,
        resultY,
      };
    })
    .filter((x) => x);
}

function getPoints(electionX, electionY, entIdx, getValue) {
  const points = getRawPoints(electionX, electionY, entIdx, getValue);

  const X = points.map(({ x }) => [x]);
  const Y = points.map(({ y }) => [y]);

  const mlr = new MLR(X, Y);
  const [[m], [c]] = mlr.weights;

  const sortedPoints = points
    .map(function (point) {
      const { x, y } = point;
      const dY = Math.abs(m * x + c - y) / Math.sqrt(m * m + 1);
      return Object.assign({}, point, { dY });
    })
    .sort((a, b) => b.dY - a.dY);

  return sortedPoints;
}

function NoPreviousElectionAlert() {
  return (
    <CustomAlert severity="warning">
      {Translate('No previous election data available')}
    </CustomAlert>
  );
}

export default function GenericScatterChart({
  getValue,
  formatStat,
  idPrefix,
}) {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }

  const { electionDisplay, electionPrevious, entIdx } = data;
  if (!electionPrevious) {
    return <NoPreviousElectionAlert />;
  }
  const points = getPoints(electionPrevious, electionDisplay, entIdx, getValue);

  return (
    <ExternalMedia id={'generic-scatter-chart' + idPrefix}>
      <ExternalMediaCustomData customData={{ idPrefix }} />
      <Typography variant="h3" sx={{ opacity: 0.1 }}>
        {Translate(StringX.toTitleCase(idPrefix))}
      </Typography>
      <SVGScatterChart
        points={points}
        xTitle={electionPrevious.year}
        yTitle={electionDisplay.year}
        formatStat={formatStat}
        width={800}
        height={800}
      />
    </ExternalMedia>
  );
}
