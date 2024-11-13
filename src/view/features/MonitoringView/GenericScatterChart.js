import { Translate, StringX } from '../../../nonview';
import {
  SVGScatterChart,
  CustomAlert,
  ExternalMedia,
  ExternalMediaCustomData,
} from '../..';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';
import { Typography } from '@mui/material';

function getPoints(electionX, electionY, getValue) {
  return electionX.baseResultList.map(function (resultX) {
    const x = getValue(resultX);
    const entID = resultX.entID;
    const resultY = electionY.getResult(entID);
    if (!resultY) {
      return null;
    }
    const y = getValue(resultY);

    return {
      entID,
      x,
      y,
      xWinningPartyID: resultX.winningPartyID,
    };
  });
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

  const { electionDisplay, electionPrevious } = data;
  if (!electionPrevious) {
    return <NoPreviousElectionAlert />;
  }
  const points = getPoints(electionDisplay, electionPrevious, getValue);

  return (
    <ExternalMedia id={'generic-scatter-chart' + idPrefix}>
      <ExternalMediaCustomData customData={{ idPrefix }} />
      <Typography variant="h3" sx={{ opacity: 0.1 }}>
        {Translate(StringX.toTitleCase(idPrefix))}
      </Typography>
      <SVGScatterChart
        points={points}
        xTitle={electionDisplay.year}
        yTitle={electionPrevious.year}
        formatStat={formatStat}
        width={640}
        height={640}
      />
    </ExternalMedia>
  );
}
