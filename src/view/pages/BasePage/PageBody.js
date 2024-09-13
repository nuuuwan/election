import { Box, Grid } from "@mui/material";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { IfElse,  NoResultsAlert, CustomStack } from "../../atoms";
import {
  ProjectionView,
  HexMapView,
  LatestResultListView,
  RegionResultListView,
} from "../../molecules";

const STYLE = {
  BOX: { paddingTop: 1, paddingBottom: 20 },
  GRID_ITEM: {
    paddingBottom: 1,
  },
};

export default function PageBody() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;

  return (
    <Box sx={STYLE.BOX}>
      <IfElse condition={electionDisplay.nResults === 0}>
        <NoResultsAlert />
        <Grid container>
          <Grid item xs={12} md={12} xl={4} sx={STYLE.GRID_ITEM}>
            <LatestResultListView />
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={STYLE.GRID_ITEM}>
            <CustomStack>

              <HexMapView />
            </CustomStack>
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={STYLE.GRID_ITEM}>
            
            <ProjectionView />
          </Grid>

          <Grid item xs={12} md={12} xl={12} sx={STYLE.GRID_ITEM}>
            <RegionResultListView />
          </Grid>
        </Grid>
      </IfElse>
    </Box>
  );
}
