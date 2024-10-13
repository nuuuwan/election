import { Box, Typography } from "@mui/material";

import { FinalOutcome, Translate } from "../../../nonview";

import InsightFirstPrefWinner from "./InsightFirstPrefWinner";
import InsightTooCloseToCall from "./InsightTooCloseToCall";
import Confidence from "./Confidence";
import { useDataSlowContext } from "../../../nonview/core/DataSlowProvider";
import CustomLoadingProgress from "../../base/CustomLoadingProgress";

function FinalOutcomeViewComplexPref({ finalOutcome }) {
  const likelyWinnerPartyInfoList = finalOutcome.likelyWinnerPartyInfoList;
  if (!likelyWinnerPartyInfoList.length) {
    return (
      <Box>
        <Typography variant="h4">
          {Translate("2nd/3rd Preference Counting Expected")}
        </Typography>
        <Confidence />
      </Box>
    );
  }
  return <InsightTooCloseToCall />;
}

export default function FinalOutcomeView() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }

  const { electionProjected, electionDisplay } = data;
  const finalOutcome = new FinalOutcome(
    electionProjected,
    electionDisplay.nResults
  );

  if (finalOutcome.hasFirstPrefWinner) {
    return (
      <InsightFirstPrefWinner
        winningPartyID={finalOutcome.result.partyToVotes.winningPartyID}
      />
    );
  }

  return <FinalOutcomeViewComplexPref finalOutcome={finalOutcome} />;
}
