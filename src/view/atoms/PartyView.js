import { Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { Color } from "../../nonview/base";

const STYLE_LABEL = {
  padding: 0.5,
  margin: 0.25,
  borderRadius: 2,
  width: "fit-content",
};

export default function PartyView({ partyID, pVotes }) {
  const party = Party.fromID(partyID);

  const label = partyID === Party.UNCERTAIN.id ? "Error Margin" : partyID;
  let backgroundColor = party.isNonParty ? "white" : party.color;
  let textColor = party.isNonParty ? party.color : "white";
  if (pVotes) {
    const opacity = Color.getOpacity(pVotes);
    textColor = party.isNonParty
      ? party.color
      : Color.getTextColor(backgroundColor, opacity);
    backgroundColor += Color.getOpacityChar(pVotes);
  }

  return (
    <Typography
      variant="caption"
      sx={Object.assign({}, STYLE_LABEL, { backgroundColor, color: textColor })}
      component="span"
    >
      {label}
    </Typography>
  );
}
