import { Box, Typography } from "@mui/material";

import { FinalOutcome } from "../../../nonview/core";


import InsightFirstPrefWinner from "./InsightFirstPrefWinner";
import InsightTooCloseToCall from "./InsightTooCloseToCall";
import { MathX, Translate } from "../../../nonview/base";
import Confidence from "./Confidence";
import { useDataContext } from "../../../nonview/core/DataProvider";

function FinalOutcomeViewComplexPref({ finalOutcome }) {
  const likelyWinnerPartyInfoList = finalOutcome.likelyWinnerPartyInfoList;
  if (!likelyWinnerPartyInfoList.length) {
    return (
      <Box>
        <Typography variant="h6">
          {Translate("2nd/3rd Preference Counting Expected")}
        </Typography>
        <Confidence />
      </Box>
    );
  }

  const pErrorHappenning =
    1 - MathX.sum(likelyWinnerPartyInfoList.map(({ p }) => p));

  return (
    <InsightTooCloseToCall
      likelyWinnerPartyInfoList={likelyWinnerPartyInfoList}
      pErrorHappenning={pErrorHappenning}
    />
  );
}

export default function FinalOutcomeView() {
  const data = useDataContext();
  if (!data) {
    return null;
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
