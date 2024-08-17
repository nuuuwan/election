import { Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { Color } from "../../nonview/base";

export default function PartyView({ partyID, pVotes }) {
  const party = Party.fromID(partyID);
  const isNonParty = Party.NON_PARTY_ID_LIST.includes(partyID);

  let label = partyID;
  if (partyID === Party.UNCERTAIN.id) {
    label = "Margin of Error";
  }

  let backgroundColor = party.color;
  if (isNonParty) {
    backgroundColor = "white";
  }

  let textColor = "white";
  if (pVotes) {
    const opacity = Color.getOpacity(pVotes);
    textColor = Color.getTextColor(backgroundColor, opacity);
    if (isNonParty) {
      textColor = party.color;
    }

    backgroundColor += Color.getOpacityChar(pVotes);
  }

  return (
    <Typography
      variant="caption"
      sx={{
        backgroundColor,
        color: textColor,
        padding: 0.25,
        margin: 0.25,

        borderRadius: 1,
        width: "fit-content",
      }}
      component="span"
    >
      {label}
    </Typography>
  );
}
