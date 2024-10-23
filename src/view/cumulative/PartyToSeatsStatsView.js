import { Grid2 } from '@mui/material';
import { Seats, Party } from '../../nonview';
import { LabelledStat, ParliamentViewCircle, PartyView } from '..';
import { useDataSlowContext } from '../../nonview/core/DataSlowProvider';

export default function PartyToSeatsStatsView() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const { electionProjectedWithError, electionDisplay, electionProjected } =
    data;
  const election =
    electionProjectedWithError || electionProjected || electionDisplay;

  const seats = Seats.fromElection(election);
  const entries = Object.entries(seats.getTotalPartyToSeats());

  return (
    <Grid2
      container
      direction="row"
      gap={1}
      sx={{ maxWidth: 400, justifyContent: 'center' }}
    >
      {entries.map(function ([partyID, seats]) {
        const color = Party.fromID(partyID).color;
        return (
          <Grid2 key={partyID}>
            <LabelledStat
              key={partyID}
              label={<PartyView partyID={partyID} />}
              stat={<ParliamentViewCircle partyID={partyID} seats={seats} />}
              sx={{ color }}
            />
          </Grid2>
        );
      })}
    </Grid2>
  );
}
