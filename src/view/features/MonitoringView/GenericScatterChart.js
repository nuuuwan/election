import { Translate, StringX } from '../../../nonview';
import {
  SVGScatterChart,
  CustomAlert,
  ExternalMedia,
  ExternalMediaCustomData,
} from '../..';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';
import { Typography } from '@mui/material';

function getPoints(electionX, electionY, entIdx, getValue) {
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

      const absX = Math.abs((x - y) / x);

      return {
        entID,
        ent,
        x,
        y,
        absX,
        resultX,
        resultY,
      };
    })
    .filter((x) => x)
    .sort((a, b) => b.absX - a.absX);
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
        width={640}
        height={640}
      />
    </ExternalMedia>
  );
}
