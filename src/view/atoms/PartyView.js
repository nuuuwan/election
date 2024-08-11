import { Stack, Typography } from "@mui/material";
import { Party } from "../../nonview/core";

export default function PartyView({ partyID }) {
  const party = Party.fromID(partyID);

  let backgroundColor = party.color;
  let color = "white";
  if (Party.NON_PARTY_ID_LIST.includes(partyID)) {
    backgroundColor = "white";
    color = party.color;
  }

  return (
    <Stack
      direction="column"
      gap={0}
      sx={{
        margin: "auto",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          backgroundColor,
          color,
          padding: 0.3,
          borderRadius: 2,
        }}
      >
        {partyID}
      </Typography>
    </Stack>
  );
}
