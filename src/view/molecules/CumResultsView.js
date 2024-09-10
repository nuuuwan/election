import { Stack } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { CumResultsTitle } from "../../view/atoms";
import { ResultBarChart, HistoryView, SummaryView } from ".";

import PartyToVotesStatsView from "../../view/molecules/PartyToVotesView/PartyToVotesStatsView";

export default function CumResultsView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, elections } = data;

  const result = electionDisplay.resultIdx[entID];
  const partyToVotes = result.partyToVotes;

  return (
    <Stack direction="column" gap={0.1} alignItems="center">
      <CumResultsTitle entID={entID} />
      <SummaryView summary={result.summary} />

      <ResultBarChart resultsElection={electionDisplay} entID={entID} />

      <PartyToVotesStatsView partyToVotes={partyToVotes} />
      {elections ? <HistoryView entID={entID} /> : null}
    </Stack>
  );
}
