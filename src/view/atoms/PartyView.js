import { Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { Color, Translate } from "../../nonview/base";
import { ELECTION_TO_PARTY_TO_LABEL } from "../../nonview/constants";

const STYLE_LABEL = {
  padding: 0.5,
  margin: 0.25,
  borderRadius: 2,
  width: "fit-content",
};

export function getLabel(partyID, election) {
  if (partyID === Party.UNCERTAIN.id) {
    return "Error Margin";
  }
  if (partyID === Party.OTHER.id) {
    return "Other";
  }

  let label = partyID;
  if (!election) {
    return label;
  }
  if (
    !ELECTION_TO_PARTY_TO_LABEL[election.year] ||
    !ELECTION_TO_PARTY_TO_LABEL[election.year][partyID]
  ) {
    return `-${label}`;
  }

  return ELECTION_TO_PARTY_TO_LABEL[election.year][partyID] || label;
}

export default function PartyView({ partyID, pVotes, election }) {
  const party = Party.fromID(partyID);

  const label = getLabel(partyID, election);
  let backgroundColor = party.isNonParty ? "white" : party.color;
  let textColor = party.isNonParty ? party.color : "white";
  if (pVotes) {
    const opacity = Color.getOpacity(pVotes);
    textColor = party.isNonParty
      ? party.color
      : Color.getTextColor(backgroundColor, opacity);
    backgroundColor += Color.getOpacityChar(pVotes);
  }

  const translatedLabel = Translate(label);
  const shortLabel = translatedLabel.split(" ").reverse()[0].toUpperCase();

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
