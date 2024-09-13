import { Box, Grid, Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";
import { Bellwether } from "../../nonview/core";

function RegionResultListViewGroup({ title, entIDList }) {
  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      <Grid container spacing={1}>
        {entIDList.map(function (entID) {
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
  const bellwetherEntIDList = infoList
    .filter(function (info) {
      return (
        info.error < 0.1 && info.nSame > info.n * 0.5 && info.entID !== "LK"
      );
    })
    .slice(0, N_DISPLAY)
    .map((x) => x.entID);

  return (
    <Stack direction="column" alignItems="center" gap={5}>
      <RegionResultListViewGroup title="Islandwide" entIDList={["LK"]} />
      <RegionResultListViewGroup
        title="Provinces"
        entIDList={Object.keys(provinceIdx)}
      />
      <RegionResultListViewGroup
        title="Electoral Districts"
        entIDList={Object.keys(edIdx)}
      />
      <RegionResultListViewGroup
        title="Historical Bellwethers"
        entIDList={bellwetherEntIDList}
      />
    </Stack>
  );
}
