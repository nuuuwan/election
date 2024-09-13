import {  Box, Grid, Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";
import { Bellwether } from "../../nonview/core";




function RegionResultListViewGroup({title, entIDList1}) {
  return (
    <Box>
    <Typography variant="h4">{title}</Typography>
    <Grid container spacing={1}>
    {entIDList1.map(function (entID) {

      return (

     
        <Grid item xs={12} md={3} xl={2}  key={entID} >
          <CumResultsView entID={entID} />
        </Grid> 
      );
    })}
    </Grid></Box>
  )
}

export default function RegionResultListView() {
  const data = useDataContext();


  if (!data) {
    return null;
  }
  const {  provinceIdx, edIdx, pdIdx, elections, election } = data;
  const entIDList1 = ['LK'].concat(Object.keys(provinceIdx));
  const entIDList2 = Object.keys(edIdx);

  const infoList = Bellwether.getBestBellwetherInfoList(
    elections,
    election,
    pdIdx
  );

  const N_DISPLAY = 12;
  const entIDList3 = infoList.filter(function (info) {
    return (
      info.error < 0.1 && info.nSame > info.n * 0.5 && info.entID !== "LK"
    );
  })
  .slice(0, N_DISPLAY).map(x => x.entID)    ;

  return (
    <Stack direction="column" alignItems="center">
      <RegionResultListViewGroup title="Bellwethers" entIDList1={entIDList3} />
      <RegionResultListViewGroup title="Islandwide & Provinces" entIDList1={entIDList1} />
      <RegionResultListViewGroup title="Electoral Districts" entIDList1={entIDList2} />
    </Stack>
  );
}
