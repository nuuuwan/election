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
    <SummaryView summary={result.summary} />,
    <ResultBarChart resultsElection={electionDisplay} entID={entID} />,
    <PartyToVotesStatsView partyToVotes={result.partyToVotes} />,

    <HistoryView entID={entID} />,

    <ResultsReleasedView entID={entID} />,
  ];

  return (
    <Grid2
      container
      sx={{ width: "100%", color: result.color }}
      justifyContent="center"
      alignContent="center"
      alignItems="center"
    >
      {contentList.map(function (content, i) {
        return (
          <Grid2 key={i} xs={12} md={6} xl={2}>
            <Box
              sx={{ minWidth: 200, p: 0.5 }}
              display="flex"
              justifyContent="center"
            >
              {content}
            </Box>
          </Grid2>
        );
      })}
    </Grid2>
  );
}
