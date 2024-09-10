import { Card, Paper, Stack } from "@mui/material";

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
    <Card sx={{p:1, m:1}} variant="outlined">
    <Stack direction="column" gap={1} alignItems="center">
      <CumResultsTitle entID={entID} />
      <SummaryView summary={result.summary} />

      <ResultBarChart resultsElection={electionDisplay} entID={entID} />

      <PartyToVotesStatsView partyToVotes={partyToVotes} />
      {elections ? <HistoryView entID={entID} /> : null}
    </Stack>
    </Card>
  );
}
