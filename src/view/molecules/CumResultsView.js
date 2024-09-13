import { Box, Grid, Stack } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { EntView, ResultsReleasedView } from "../../view/atoms";
import { ResultBarChart, HistoryView, SummaryView } from ".";

import PartyToVotesStatsView from "../../view/molecules/PartyToVotesStatsView";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

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

  return (
    <Box sx={{ m: 0, p: 0, color: result.color }}>
      <Stack direction="column">
        <Grid container sx={{ justifyContent: "center", alignItems: "center" }}>
          {[
            <EntView entID={entID} useLongName={true} />,
            <ResultBarChart resultsElection={electionDisplay} entID={entID} />,
            <PartyToVotesStatsView partyToVotes={result.partyToVotes} />,
            <SummaryView summary={result.summary} />,
            <HistoryView entID={entID} />,
            <ResultsReleasedView entID={entID} />,
          ].map(function (item, i) {
            return (
              <Grid2
                item
                xs={12}
                md={12}
                xl={2}
                key={i}
                sx={{ padding: 0.5, minWidth: 200 }}
              >
                {item}
              </Grid2>
            );
          })}
        </Grid>
      </Stack>
    </Box>
  );
}
