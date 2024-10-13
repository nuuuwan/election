import {
  CustomAlert,
  CustomLoadingProgress,

  ElectionSmallTitle,
  PartyToSeatsStatsView,

  SeatsHexMap,
} from "../..";

import { FinalOutcome, Translate } from "../../../nonview";
import InsightErrorMarginTooHigh from "../FinalOutcomeView/InsightErrorMarginTooHigh";
import { ProjectionAlert } from "../../core/ProjectionTitle";

import ParliamentaryFinalOutcomeView from "../ParlimentaryFinalOutcomeView";
import { useDataSlowContext } from "../../../nonview/core/DataSlowProvider";
import { Typography } from "@mui/material";
export default function ProjectionViewParliamentary() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionProjected, electionDisplay } = data;
  if (!electionProjected) {
    return (
      <CustomAlert severity="warning">
        <Typography variant="body1">
          {Translate("No Previous Elections of Same Type to Train Model.")}
        </Typography>
      </CustomAlert>
    );
  }
  if (electionDisplay.isPresidential) {
    return null;
  }

  const finalOutcome = new FinalOutcome(
    electionProjected,
    electionDisplay.nResults
  );

  if (finalOutcome.isTooMuchError || finalOutcome.isTooEarlyToCall) {
    return <InsightErrorMarginTooHigh />;
  }

  return (
    <>
      <ParliamentaryFinalOutcomeView />
      <PartyToSeatsStatsView />
      <SeatsHexMap />
      <ElectionSmallTitle />
      <ProjectionAlert />
    </>
  );
}

