import { Stack } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { CumResultsTitle } from "../../view/atoms";
import { ResultBarChart, HistoryView, SummaryView } from ".";

import PartyToVotesStatsView from "../../view/molecules/PartyToVotesView/PartyToVotesStatsView";
import ResultsReleasedView from "../atoms/ResultsReleasedView";
import { Party } from "../../nonview/core";
import { Color, EntType } from "../../nonview/base";

export default function CumResultsView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, elections } = data;

  const result = electionDisplay.resultIdx[entID];
  const partyToVotes = result.partyToVotes;
  const color = Party.fromID(partyToVotes.winningPartyID).color;

  const isPD = EntType.fromID(entID) === EntType.PD;
  const backgroundColor = isPD ? Color.getColorWithAlpha(color, 0.05) : "none";

  return (
    <Stack
      direction="column"
      gap={1}
      alignItems="center"
      sx={{ m: 1, p: 1, backgroundColor }}
    >
      <CumResultsTitle entID={entID} />
      <SummaryView summary={result.summary} />

      <ResultBarChart resultsElection={electionDisplay} entID={entID} />
      <PartyToVotesStatsView partyToVotes={partyToVotes} />

      <ResultsReleasedView entID={entID} />
      {elections ? <HistoryView entID={entID} /> : null}
    </Stack>
  );
}
