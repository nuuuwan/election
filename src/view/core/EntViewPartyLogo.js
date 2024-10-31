import { Stack } from '@mui/material';
import { EntView, PartyLogo } from '..';

export default function EntWithPartyView({ entID, partyID }) {
  return (
    <Stack direction="row">
      <PartyLogo partyID={partyID} />
      <EntView entID={entID} />
    </Stack>
  );
}
