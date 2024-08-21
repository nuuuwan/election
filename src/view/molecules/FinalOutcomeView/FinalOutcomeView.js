import { Box, Typography } from "@mui/material";


import { FinalOutcome } from "../../../nonview/core";

import InsightErrorMarginTooHigh from "./InsightErrorMarginTooHigh";
import InsightFirstPrefWinner from "./InsightFirstPrefWinner";
import InsightTooCloseToCall from "./InsightTooCloseToCall";
import { MathX, Translate } from "../../../nonview/base";
import Confidence from "./Confidence";



export default function FinalOutcomeView({ election, nResultsDisplay }) {
  const finalOutcome = new FinalOutcome(election, nResultsDisplay);
 
  if (finalOutcome.isTooMuchUncertainty) {
    return <InsightErrorMarginTooHigh />;
  }
  if (finalOutcome.hasFirstPrefWinner) {
    return <InsightFirstPrefWinner winningPartyID={finalOutcome.result.partyToVotes.winningPartyID} /> ;
  }
  const likelyWinnerPartyInfoList = finalOutcome.likelyWinnerPartyInfoList;
  if (!likelyWinnerPartyInfoList.length) {
    return (
    <Box>
      <Typography variant="h6">
        {Translate("2nd/3rd Preference Counting Expected")}
      </Typography>
      <Confidence /></Box>);
  }

  const pUncertainHappenning =
    1 - MathX.sum(likelyWinnerPartyInfoList.map(({ p }) => p));

  return (
    <InsightTooCloseToCall 
    likelyWinnerPartyInfoList={likelyWinnerPartyInfoList}
    pUncertainHappenning={pUncertainHappenning}
  />
  )
}


