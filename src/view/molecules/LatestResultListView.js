import { Grid, Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";

import { CustomPagination } from "../atoms";



export default function LatestResultListView() {
  const data = useDataContext();

  if (!data) {
    return null;
  }
  const { election, nResultsDisplay, pdIdx } = data;
  const pdResultList = election.pdResultList;

  const resultPD = pdResultList[nResultsDisplay - 1];
  const pdEnt = pdIdx[resultPD.entID];

  const resultIdx = election.resultIdx;
  const resultED = resultIdx[pdEnt.d.ed_id];
  const resultProvince = resultIdx[pdEnt.d.province_id];
  const resultLK = resultIdx["LK"];

  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h4">Latest Result</Typography>
      <CustomPagination />

      <Grid container spacing={1}>
        {[resultPD, resultED, resultProvince, resultLK].map(function (result) {

   
          const color = result.color;
          return (
            <Grid item xs={12} md={6} xl={6} key={result.entID} color={color} > 
                        <CumResultsView entID={result.entID} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
