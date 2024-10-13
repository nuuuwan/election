import {

  PartyToVotesStatsView,
  ProjectedResultBarChart,
  SummaryView,
} from "../..";
import { useDataSlowContext } from "../../../nonview/core/DataSlowProvider";





export default function ProjectionViewPresidential() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const { electionProjected } = data;
  const result = electionProjected.resultLK;
  return (
    <>
      <PartyToVotesStatsView partyToVotes={result.partyToVotes} />
      <ProjectedResultBarChart />
      <SummaryView summary={result.summary} />
    </>
  );
}

