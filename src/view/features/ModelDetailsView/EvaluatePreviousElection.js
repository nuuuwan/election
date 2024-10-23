import React from 'react';
import { Typography, Stack } from '@mui/material';
import { Translate } from '../../../nonview';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';
import CustomLoadingProgress from '../../base/CustomLoadingProgress';
import AggregatedResultViewGroup from '../AggregatedResultView/AggregatedResultViewGroup';

export default function EvaluatePreviousElection() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const {
    electionProjected,
    electionDisplay,
    electionPrevious,
    electionProjectedPrevious,
  } = data;

  const releasedPDIDList = electionDisplay.baseEntIDList;
  const notReleasedPDIDList = electionProjected.baseEntIDList.filter(
    (pdID) => !releasedPDIDList.includes(pdID),
  );

  return (
    <Stack direction="column" gap={2}>
      <Typography variant="h5">
        {Translate('Evaluate Previous Election')}
      </Typography>

      <Typography variant="h6">{Translate('Projected')}</Typography>
      <AggregatedResultViewGroup
        entIDList={notReleasedPDIDList}
        customElection={electionProjectedPrevious}
      />

      <Typography variant="h6">{Translate('Actual')}</Typography>
      <AggregatedResultViewGroup
        entIDList={notReleasedPDIDList}
        customElection={electionPrevious}
      />
    </Stack>
  );
}
