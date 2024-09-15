import { Box, Typography } from "@mui/material";
import { Translate } from "../../../nonview/base";
import { PartyView } from "../../atoms";
import Confidence from "./Confidence";
export default function InsightFirstPrefWinner({ winningPartyID }) {
  return (
    <Box>
      <Typography variant="h6">
        <PartyView partyID={winningPartyID} />
        {" "}{Translate("wins on 1st preferences")}.
      </Typography>
      <Confidence />
    </Box>
  );
}
