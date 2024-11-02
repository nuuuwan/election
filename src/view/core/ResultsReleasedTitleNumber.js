import { Typography } from '@mui/material';

import { EntType, Translate } from '../../nonview';

import { useDataContext } from '../../nonview/core/DataProvider';
import ExternalMediaCustomData from './ExternalMediaCustomData';

export default function ResultsReleasedTitleNumber() {
  const data = useDataContext();

  const { electionDisplay } = data;
  if (electionDisplay.baseEntType === EntType.ED) {
    return null;
  }

  const entIdx = electionDisplay.getEntIdx(data);

  const entID = 'LK';
  const { nResultsTotal, nResultsReleased } =
    electionDisplay.getNResultsReleasedAndTotal(entID, entIdx);

  return (
    <Typography variant="h4" color="gray" sx={{ marginBottom: 2 }}>
      <ExternalMediaCustomData
        customData={{ nResultsTotal, nResultsReleased }}
      />
      <span style={{ color: 'black' }}>
        {Translate('%1 of %2 Results', [nResultsReleased, nResultsTotal])}
      </span>{' '}
    </Typography>
  );
}
