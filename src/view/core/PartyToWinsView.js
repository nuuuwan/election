import { Stack } from '@mui/material';
import { useDataContext } from '../../nonview/core/DataProvider';
import { Party } from '../../nonview';
import PartyView from './PartyView';
import LabelledStat from '../base/LabelledStat';

export default function PartyToWinsView() {
  const data = useDataContext();
  const { electionDisplay } = data;

  return (
    <Stack direction="row" gap={1}>
      {Object.entries(electionDisplay.partyToWins).map(function ([
        partyID,
        wins,
      ]) {
        const color = Party.fromID(partyID).color;
        return (
          <LabelledStat
            key={partyID}
            label={<PartyView partyID={partyID} />}
            stat={wins.toString()}
            sx={{ color }}
          />
        );
      })}
    </Stack>
  );
}
