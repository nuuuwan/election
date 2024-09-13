import { Box, Grid, Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";
import { Bellwether } from "../../nonview/core";

function RegionResultListViewGroup({ title, entIDList1 }) {
  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      <Grid container spacing={1}>
        {entIDList1.map(function (entID) {
          return (
            <Grid item xs={12} md={12} xl={12} key={entID}>
              <CumResultsView entID={entID} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default function RegionResultListView() {
  const data = useDataContext();

  if (!data) {
    return null;
  }
  const { provinceIdx, edIdx, pdIdx, elections, election } = data;

  const infoList = Bellwether.getBestBellwetherInfoList(
    elections,
    election,
    pdIdx
  );

  const N_DISPLAY = 12;
  const entIDList3 = infoList
    .filter(function (info) {
      return (
        info.error < 0.1 && info.nSame > info.n * 0.5 && info.entID !== "LK"
      );
    })
    .slice(0, N_DISPLAY)
    .map((x) => x.entID);

  return (
    <Stack direction="column" alignItems="center">
      <RegionResultListViewGroup title="Islandwide" entIDList1={["LK"]} />
      <RegionResultListViewGroup
        title="Provinces"
        entIDList1={Object.keys(provinceIdx)}
      />
      <RegionResultListViewGroup
        title="Electoral Districts"
        entIDList1={Object.keys(edIdx)}
      />
      <RegionResultListViewGroup title="Bellwethers" entIDList1={entIDList3} />
    </Stack>
  );
}
