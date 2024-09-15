import { Typography } from "@mui/material";
import { Party } from "../../nonview/core";

const STYLE_LABEL = {
  padding: 0.3,
  margin: 0.0,
  borderRadius: 1,
  width: 24,
  textAlign: "center",
};

export default function PartyView({ partyID, sx }) {
  const party = Party.fromID(partyID);
  let label = partyID;
  if (label.length > 4) {
    label = label.substring(0, 3) + '.';
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
