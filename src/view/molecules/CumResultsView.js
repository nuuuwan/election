import { Box, Grid2 } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { EntView, ResultsReleasedView } from "../../view/atoms";
import { ResultBarChart, HistoryView, SummaryView } from ".";

import PartyToVotesStatsView from "../../view/molecules/PartyToVotesStatsView";

export default function CumResultsView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;

  const result = electionDisplay.resultIdx[entID];
  if (!result) {
    return null;
  }

  const contentList = [
    <EntView entID={entID} useLongName={true} />,
    <ResultBarChart resultsElection={electionDisplay} entID={entID} />,
    <PartyToVotesStatsView partyToVotes={result.partyToVotes} />,

    <HistoryView entID={entID} />,

    <SummaryView summary={result.summary} />,
    <ResultsReleasedView entID={entID} />,
  ];

  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      {contentList.map(function (content, i) {
        return (
          <Grid2 key={i}>
            <Box
              sx={{ height: 50, width: 250, p: 0.5, m: 0.1 }}
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              display="flex"
            >
              {content}
            </Box>
          </Grid2>
        );
      })}
    </Grid2>
  );
}
