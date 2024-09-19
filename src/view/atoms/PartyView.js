import { Typography } from "@mui/material";
import { Party } from "../../nonview/core";

const STYLE_LABEL = {
  padding: 0.2,
  margin: 0.0,
  borderRadius: 1,
  width: 22,
  textAlign: "center",
};

export default function PartyView({ partyID, sx }) {
  if (!partyID) {
    return null;
  }
  const party = Party.fromID(partyID);
  let label = partyID;

  label = {'IND16': 'RW'}[label] || label;
  
  if (label.length > 3) {
    label = label.substring(0, 2) + ".";
  }

  return (
    <Typography
      variant="caption"
      sx={Object.assign(
        {},
        STYLE_LABEL,
        { backgroundColor: party.color, color: "white" },
        sx
      )}
      component="span"
    >
      {label}
    </Typography>
  );
}
