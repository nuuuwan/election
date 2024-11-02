import { Box, Stack, Typography } from '@mui/material';

import { useDataSlowContext } from '../../nonview/core/DataSlowProvider';
import { Format, Translate } from '../../nonview';
import LabelledStat from '../base/LabelledStat';
import { useDataContext } from '../../nonview/core/DataProvider';
import CustomLoadingProgress from '../base/CustomLoadingProgress';
import ExternalMediaCustomData from './ExternalMediaCustomData';

function ResultsReleasedViewPElectors({ entID }) {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionDisplay, electionPrevious, entIdx } = data;

  const pElectors = electionDisplay.getPElectors(
    entID,
    entIdx,
    electionPrevious,
  );

  return (
    <Box>
      <ExternalMediaCustomData customData={{ entID, pElectors }} />
      <LabelledStat label="Released" stat={Format.percent(pElectors)} />
    </Box>
  );
}

export default function ResultsReleasedView({ entID }) {
  const data = useDataContext();
  const { electionDisplay, entIdx } = data;

  const { nResultsTotal, nResultsReleased } =
    electionDisplay.getNResultsReleasedAndTotal(entID, entIdx);

  if (nResultsTotal <= 1) {
    return (
      <Typography variant="h6" color="gray">
        {Translate('Final')}
      </Typography>
    );
  }

  const pdDetails = (
    <Stack direction="row" alignItems="center">
      <ExternalMediaCustomData
        customData={{ entID, nResultsReleased, nResultsTotal }}
      />
      <Typography variant="h6">{nResultsReleased}</Typography>
      <Typography variant="h6" sx={{ opacity: 0.5 }}>
        /{nResultsTotal}
      </Typography>
    </Stack>
  );

  return (
    <Stack direction="row" alignItems="center" gap={3} sx={{ color: 'gray' }}>
      <LabelledStat label="Results" stat={pdDetails} />
      <ResultsReleasedViewPElectors entID={entID} />
    </Stack>
  );
}
