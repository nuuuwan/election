import { Avatar } from '@mui/material';
import { Party } from '../../nonview';

export default function PartyLogo({ partyID }) {
  if (!partyID) {
    return null;
  }
  const party = Party.fromID(partyID);

  const dim = 18;

  return (
    <Avatar
      src={party.logoImgSrc}
      alt={party.id}
      sx={{
        width: dim,
        height: dim,
        m: 0.5,
        p: 0.5,
        backgroundColor: party.color,
      }}
    />
  );
}
