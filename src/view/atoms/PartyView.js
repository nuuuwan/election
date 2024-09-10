import { Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { Color, Translate } from "../../nonview/base";
import { useDataContext } from "../../nonview/core/DataProvider";

const STYLE_LABEL = {
  padding: 0.25,
  margin: 0.125,
  borderRadius: 1,
  width: 21,
  textAlign: "center",
};

function getLabel(partyID, election) {
  if (partyID === Party.UNCERTAIN.id) {
    return "Error Margin";
  }
  if (partyID === Party.OTHER.id) {
    return "Other";
  }
  return partyID;
}

function getStyle(party, pVotes) {
  let backgroundColor = party.isNonParty ? "white" : party.color;
  let textColor = party.isNonParty ? party.color : "white";

  if (pVotes) {
    const opacity = Color.getOpacity(pVotes);
    textColor = party.isNonParty
      ? party.color
      : Color.getTextColor(backgroundColor, opacity);
    backgroundColor += Color.getOpacityChar(pVotes);
  }

  return { backgroundColor, textColor };
}

export default function PartyView({ partyID, pVotes }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election } = data;
  const party = Party.fromID(partyID);
  const label = getLabel(partyID, election);
  const { backgroundColor, textColor } = getStyle(party, pVotes);

  const translatedLabel = Translate(label);
  const shortLabel = translatedLabel.toUpperCase();

  return (
    <Typography
      variant="caption"
      sx={Object.assign({}, STYLE_LABEL, { backgroundColor, color: textColor })}
      component="span"
    >
      {shortLabel}
    </Typography>
  );
}
