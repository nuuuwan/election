import {
  CustomAlert,
  CustomLoadingProgress,
  CustomStack,
  ElectionSmallTitle,
  PartyToSeatsStatsView,
  ProjectionTitle,
  RegionSeatView,
} from "..";
import { FinalOutcomeView, ProjectedResultBarChart } from "..";

import { FinalOutcome, Translate } from "../../nonview";
import InsightErrorMarginTooHigh from "./FinalOutcomeView/InsightErrorMarginTooHigh";
import { ProjectionAlert } from "../core/ProjectionTitle";

import ParliamentaryFinalOutcomeView from "./ParlimentaryFinalOutcomeView";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import { Typography } from "@mui/material";

function ProjectionViewInner() {
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

  const finalOutcome = new FinalOutcome(
    electionProjected,
    electionDisplay.nResults
  );

  if (finalOutcome.isTooMuchError) {
    return <InsightErrorMarginTooHigh />;
  }

  const outcomeView = electionDisplay.isPresidential ? (
    <FinalOutcomeView finalOutcome={finalOutcome} />
  ) : (
    <ParliamentaryFinalOutcomeView />
  );

  const projectionChart = electionDisplay.isPresidential ? (
    <ProjectedResultBarChart />
  ) : (
    <>
      <PartyToSeatsStatsView />
      <RegionSeatView />
    </>
  );

  return (
    <>
      {outcomeView}
      {projectionChart}

      <ElectionSmallTitle />
      <ProjectionAlert />
    </>
  );
}

export default function ProjectionView() {
  return (
    <CustomStack>
      <ProjectionTitle />
      <ProjectionViewInner />
    </CustomStack>
  );
}
