import { CustomLoadingProgress, CustomStack, ElectionSmallTitle, ProjectionTitle, SeatView } from "..";
import {
  FinalOutcomeView,
  PartyToVotesStatsView,
  SummaryView,
  ProjectedResultBarChart,
} from "..";

import { FinalOutcome } from "../../nonview";
import InsightErrorMarginTooHigh from "./FinalOutcomeView/InsightErrorMarginTooHigh";
import { ProjectionAlert } from "../core/ProjectionTitle";

import ParliamentaryFinalOutcomeView from "./ParlimentaryFinalOutcomeView";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";





 function ProjectionViewInner() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionProjected, electionDisplay } = data;

  const resultLK = electionProjected.resultLK;

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

  const barChart = electionDisplay.isPresidential ? (
    <ProjectedResultBarChart />
  ) : (
    <SeatView />
  );

  return (
    <>
      {outcomeView}

      <PartyToVotesStatsView partyToVotes={resultLK.partyToVotes} />
      {barChart}
      <SummaryView summary={resultLK.summary} />
      <ElectionSmallTitle />


    </>
  );
}


export default function ProjectionView() {



    return (
      <CustomStack>
        <ProjectionTitle />
        <ProjectionViewInner />
        <ProjectionAlert />
      </CustomStack>
    );
  
}
