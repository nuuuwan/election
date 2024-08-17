import { Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { Color } from "../../nonview/base";

const STYLE_LABEL = {
  padding: 0.25,
  margin: 0.25,
  borderRadius: 1,
  width: "fit-content",
};

export default function PartyView({ partyID, pVotes }) {
  const party = Party.fromID(partyID);

  const label = partyID === Party.UNCERTAIN.id ? "Margin of Error" : partyID;
  let backgroundColor = party.isNonParty ? party.color : "white";
  let textColor = "white";
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
