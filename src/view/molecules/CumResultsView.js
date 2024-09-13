import { Box, Grid, Stack } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { EntView } from "../../view/atoms";
import { ResultBarChart, HistoryView, SummaryView } from ".";

import PartyToVotesStatsView from "../../view/molecules/PartyToVotesStatsView";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function CumResultsView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election, elections } = data;

  const result = election.resultIdx[entID];

  return (
    <Box sx={{ m: 0, p: 0 }}>
      <Stack direction="column">
        <Grid container sx={{ justifyContent: "center", alignItems: "center" }}>
          {[
            <EntView entID={entID} useLongName={true} />,
            <ResultBarChart resultsElection={election} entID={entID} />,
            <PartyToVotesStatsView partyToVotes={result.partyToVotes} />,
            <SummaryView summary={result.summary} />,
            elections ? <HistoryView entID={entID} /> : null,
          ].map(function (item, i) {
            return (
              <Grid2 item xs={12} md={12} xl={2} key={i}>
                <Box sx={{ margin: 0.25, marginLeft: 1, marginRight: 1 }}>
                  {item}
                </Box>
              </Grid2>
            );
          })}
        </Grid>
      </Stack>
    </Box>
  );
}
