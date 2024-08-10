import { Box, Typography } from "@mui/material";
import { Party } from "../../nonview/core";

export default function PartyView({ partyID }) {
  const party = Party.fromID(partyID);
  return (
    <Box>
      <Typography variant="h6" color={party.color}>
        {partyID}
      </Typography>
    </Box>
  );
}
