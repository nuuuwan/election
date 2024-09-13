import { Card, Grid, Stack, Typography } from "@mui/material";

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
  const resultNum = election.pdResultList.indexOf(result);

  return (
    <Card sx={{ m: 1, p: 1 }}>
      <Stack direction="column" gap={0.5}>
        <Grid container spacing={1}>
          {[
            <Stack direction="column">
              <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
                {resultNum > 0 ? (
                  <Typography variant="body1">{resultNum + 1}.</Typography>
                ) : null}
                <EntView entID={entID} useLongName={true} />
              </Stack>
              <ResultBarChart resultsElection={election} entID={entID} />
            </Stack>,
            <PartyToVotesStatsView partyToVotes={result.partyToVotes} />,
            <SummaryView summary={result.summary} />,
            elections ? <HistoryView entID={entID} /> : null,
          ].map(function (item, i) {
            return (
              <Grid2 item xs={12} md={6} xl={3} key={i}>
                {item}
              </Grid2>
            );
          })}
        </Grid>
      </Stack>
    </Card>
  );
}
