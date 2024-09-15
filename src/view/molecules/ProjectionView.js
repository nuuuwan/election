import { useDataContext } from "../../nonview/core/DataProvider";
import { CustomStack, ProjectionTitle } from "../atoms";
import {
  FinalOutcomeView,
  PartyToVotesStatsView,
  SummaryView,
  ProjectedResultBarChart,
} from ".";

import { FinalOutcome } from "../../nonview/core";
import InsightErrorMarginTooHigh from "./FinalOutcomeView/InsightErrorMarginTooHigh";

export default function ProjectionView() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionProjected, electionDisplay } = data;
  const resultLK = electionProjected.resultLK;

  const finalOutcome = new FinalOutcome(
    electionProjected,
    electionDisplay.nResults
  );

  if (finalOutcome.isTooEarlyToCall) {
    return <CustomStack>
      <ProjectionTitle />
      <InsightErrorMarginTooHigh />
    </CustomStack>;
  }

  return (
    <CustomStack>
     
     <ProjectionTitle />
      <SummaryView summary={resultLK.summary} />
      <ProjectedResultBarChart />
      <PartyToVotesStatsView partyToVotes={resultLK.partyToVotes} />

      <FinalOutcomeView />
    </CustomStack>
  );
}
