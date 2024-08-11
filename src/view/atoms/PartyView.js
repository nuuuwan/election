import { Stack, Typography } from "@mui/material";
import { Party } from "../../nonview/core";

export default function PartyView({ partyID }) {
  const party = Party.fromID(partyID);

  let backgroundColor = party.color;
  let color = "white";
  if (partyID === "Other") {
    backgroundColor = "white";
    color = "#ccc";
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
