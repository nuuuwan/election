import { Box, Typography } from "@mui/material";

import { FinalOutcome } from "../../../nonview";

import InsightFirstPrefWinner from "./InsightFirstPrefWinner";
import InsightTooCloseToCall from "./InsightTooCloseToCall";
import { EntType, MathX, Translate } from "../../../nonview";
import Confidence from "./Confidence";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { useDataSlowContext } from "../../../nonview/core/DataSlowProvider";
import CustomLoadingProgress from "../../base/CustomLoadingProgress";

function FinalOutcomeViewComplexPref({ finalOutcome }) {
  const data = useDataContext();

  const { electionDisplay } = data;

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

  let pErrorHappenning = 0;
  let likelyWinnerPartyInfoListAdjusted = likelyWinnerPartyInfoList;
  const sumP = MathX.sum(likelyWinnerPartyInfoList.map(({ p }) => p));
  if (electionDisplay.baseEntType === EntType.PD) {
    pErrorHappenning = 1 - sumP;
  } else if (electionDisplay.baseEntType === EntType.ED) {
    likelyWinnerPartyInfoListAdjusted = likelyWinnerPartyInfoList.map((d) =>
      Object.assign(d, { p: d.p + (1 - sumP) / 2 })
    );
  } else {
    throw new Error("Unexpected baseEntType: " + electionDisplay.baseEntType);
  }

  return (
    <InsightTooCloseToCall
      likelyWinnerPartyInfoList={likelyWinnerPartyInfoListAdjusted}
      pErrorHappenning={pErrorHappenning}
    />
  );
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
