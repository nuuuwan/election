import { Typography } from "@mui/material";
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
    <Typography
      variant="caption"
      sx={{
        backgroundColor,
        color,
        padding: 0.25,
        margin: 0.25,

        
        borderRadius: 1,
        width: "fit-content",
      }}
      component="span"
    >
      {partyID}
    </Typography>
  );
}
