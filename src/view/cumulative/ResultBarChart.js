import { Box } from '@mui/material';
import { Format, Party } from '../../nonview';

import SVGBarChart from '../base/SVGBarChart.js/SVGBarChart';
import ExternalMediaCustomData from '../core/ExternalMediaCustomData';

export default function ResultBarChart({ partyToPVotes }) {
  return (
    <Box>
      <ExternalMediaCustomData customData={{ partyToPVotes }} />
      <SVGBarChart
        dataList={[partyToPVotes]}
        getValues={function (partyToPVotes) {
          return Object.values(partyToPVotes);
        }}
        getColor={function (partyToPVotes, i, pVotes, j) {
          const partyID = Object.keys(partyToPVotes)[j];
          return Party.fromID(partyID).color;
        }}
        formatValue={function (partyToPVotes, i, pVotes) {
          return Format.percent(pVotes);
        }}
        sx={{ width: 200, height: 40 }}
      />
    </Box>
  );
}
