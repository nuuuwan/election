import { Box, Typography } from "@mui/material";
import { Translate } from "../../../nonview/base";
import { PartyView } from "../../atoms";
import Confidence from "./Confidence";
export default function InsightFirstPrefWinner({ winningPartyID }) {
  return (
    <Box>
      <PartyView partyID={winningPartyID} sx={{ fontSize: 20 }} />
      <Typography variant="h4">
        {Translate("wins")}. ✓
      </Typography>
      <Confidence />
    </Box>
  );
}
