import { Box, Stack } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { EntView, ResultsReleasedView } from "../../view/atoms";
import { ResultBarChart, HistoryView, SummaryView } from ".";

import PartyToVotesStatsView from "../../view/molecules/PartyToVotesStatsView";

export default function CumResultsView({ entID, direction="column" }) {
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

    <ResultsReleasedView entID={entID} />,

    <HistoryView entID={entID} />,
  ];

  return (
    <Stack
      direction={direction}
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      {contentList.map(function (content, i) {
        return (

            <Box key={i}
              sx={{ height: 50, width: 250, p: 0.2, m: 0.1 }}
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              display="flex"
            >
              {content}
            </Box>

        );
      })}
    </Stack>
  );
}
