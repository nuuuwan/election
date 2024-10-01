import { CustomStack, ElectionSmallTitle, ProjectionTitle, SeatView } from "..";
import {
  FinalOutcomeView,
  PartyToVotesStatsView,
  SummaryView,
  ProjectedResultBarChart,
} from "..";

import { FinalOutcome } from "../../nonview";
import InsightErrorMarginTooHigh from "./FinalOutcomeView/InsightErrorMarginTooHigh";
import { ProjectionAlert } from "../core/ProjectionTitle";
import { EntType } from "../../nonview";
import ParliamentaryFinalOutcomeView from "./ParlimentaryFinalOutcomeView";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";

export default function ProjectionView() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const { electionProjected, electionDisplay } = data;
  if (electionDisplay.baseEntType === EntType.ED) {
    return null;
  }
  const resultLK = electionProjected.resultLK;

  const finalOutcome = new FinalOutcome(
    electionProjected,
    electionDisplay.nResults
  );

  if (finalOutcome.isTooMuchError) {
    return (
      <CustomStack>
        <ProjectionTitle />
        <InsightErrorMarginTooHigh />
      </CustomStack>
    );
  }

  const outcomeView = electionDisplay.isPresidential ? (
    <FinalOutcomeView finalOutcome={finalOutcome} />
  ) : (
    <ParliamentaryFinalOutcomeView />
  );

  const barChart = electionDisplay.isPresidential ? (
    <ProjectedResultBarChart />
  ) : (
    <SeatView />
  );

  return (
    <CustomStack>
      <ProjectionTitle />
      {outcomeView}

      <PartyToVotesStatsView partyToVotes={resultLK.partyToVotes} />
      {barChart}
      <SummaryView summary={resultLK.summary} />
      <ElectionSmallTitle />

      <ProjectionAlert />
    </CustomStack>
  );
}
