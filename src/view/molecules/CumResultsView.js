import { Stack } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { EntView } from "../../view/atoms";
import { ResultBarChart, HistoryView, SummaryView } from ".";

import PartyToVotesStatsView from "../../view/molecules/PartyToVotesStatsView";
import ResultsReleasedView from "../atoms/ResultsReleasedView";

import { Color, EntType } from "../../nonview/base";

export default function CumResultsView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, elections } = data;

  const result = electionDisplay.resultIdx[entID];
  const color = result.color;

  const isPD = EntType.fromID(entID) === EntType.PD;
  const backgroundColor = isPD ? Color.getColorWithAlpha(color, 0.05) : "none";

  return (
    <Stack
      direction="column"
      gap={1}
      alignItems="center"
      sx={{ m: 1, p: 1, backgroundColor }}
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
