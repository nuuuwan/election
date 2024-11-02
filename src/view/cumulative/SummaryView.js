import { Stack } from '@mui/material';
import { Format } from '../../nonview';
import LabelledStat from '../base/LabelledStat';
import ExternalMediaCustomData from '../core/ExternalMediaCustomData';

export default function SummaryView({ summary }) {
  return (
    <Stack direction="row" gap={2} sx={{ margin: 'auto', color: 'gray' }}>
      <ExternalMediaCustomData customData={{ summary: summary.toDict() }} />
      <LabelledStat
        label="Reg. Voters"
        stat={Format.intHumanize(summary.electors)}
      />
      <LabelledStat label="Turnout" stat={Format.percent(summary.pTurnout)} />
      <LabelledStat label="Rejected" stat={Format.percent(summary.pRejected)} />
    </Stack>
  );
}
