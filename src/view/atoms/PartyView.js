import { Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import {  Translate } from "../../nonview/base";


const STYLE_LABEL = {
  padding: 0.25,
  margin: 0.125,
  borderRadius: 1,
  width: 21,
  textAlign: "center",
};



export default function PartyView({ partyID, sx }) {
  const party = Party.fromID(partyID);
  
  const translatedLabel = Translate(partyID) || "";
  const shortLabel = translatedLabel.toUpperCase();

  return (
    <Typography
      variant="caption"
      sx={Object.assign({}, STYLE_LABEL, { backgroundColor: party.color, color: "white" }, sx)}
      component="span"
    >
      {shortLabel}
    </Typography>
  );
}
