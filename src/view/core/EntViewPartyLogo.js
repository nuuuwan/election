import { Stack } from '@mui/material';
import { Party } from '../../nonview';
import { EntView, PartyLogo } from '..';

export default function EntViewPartyLogo({ entID, partyID }) {
  const party = Party.fromID(partyID);
  return (
    <Stack direction="row">
      <PartyLogo partyID={partyID} />
      <EntView entID={entID} sx={{ color: party.color }} />
    </Stack>
  );
}
