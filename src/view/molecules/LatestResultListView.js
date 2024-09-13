import { Grid, Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";

import { CustomPagination } from "../atoms";

const N_DISPLAY = 6;

export default function LatestResultListView() {
  const data = useDataContext();

  if (!data) {
    return null;
  }
  const { election, nResultsDisplay } = data;
  const pdResultList = election.pdResultList;

  const resultListDisplay = pdResultList
    .slice(Math.max(0, nResultsDisplay - N_DISPLAY), nResultsDisplay)
    .reverse();

  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h4">Results</Typography>
      <CustomPagination />

      <Grid container spacing={1}>
        {resultListDisplay.map(function (result) {
          return (
            <Grid item xs={12} md={6} xl={6} key={result.entID}>
              <CumResultsView entID={result.entID} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
