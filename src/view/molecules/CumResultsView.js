import { Stack } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { EntView } from "../../view/atoms";
import { ResultBarChart, HistoryView, SummaryView } from ".";

import PartyToVotesStatsView from "../../view/molecules/PartyToVotesStatsView";
import ResultsReleasedView from "../atoms/ResultsReleasedView";



export default function CumResultsView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, elections } = data;

  const result = electionDisplay.resultIdx[entID];


  return (
    <Stack
      direction="column"
      gap={1}
      alignItems="center"
      sx={{ m: 1, p: 1 }}
    >
      <EntView entID={entID} useLongName={true} />
      <SummaryView summary={result.summary} />
      <ResultBarChart resultsElection={electionDisplay} entID={entID} />
      <PartyToVotesStatsView partyToVotes={result.partyToVotes} />

      <ResultsReleasedView entID={entID} />
      {elections ? <HistoryView entID={entID} /> : null}
    </Stack>
  );
}
