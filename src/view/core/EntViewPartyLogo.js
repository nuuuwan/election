import { Stack } from '@mui/material';
import { Party } from '../../nonview';
import { EntView, ExternalMediaCustomData, PartyLogo } from '..';

export default function EntViewPartyLogo({ entID, partyID }) {
  const party = Party.fromID(partyID);
  return (
    <Stack direction="row">
      <ExternalMediaCustomData
        customData={{ entID, winningPartyID: partyID }}
      />
      <PartyLogo partyID={partyID} />
      <EntView entID={entID} sx={{ color: party.color }} />
    </Stack>
  );
}
