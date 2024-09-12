import { Box, Grid } from "@mui/material";

import ColumnLatestResult from "./ColumnLatestResult";


import ProjectionView from "../../molecules/ProjectionView";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { IfElse, MapTitle, NoResultsAlert, CustomStack } from "../../atoms";

import { HexMapView } from "../../molecules";

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
            <ColumnLatestResult />
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={STYLE.GRID_ITEM}>
          <CustomStack>
      <MapTitle />
      <HexMapView />
    </CustomStack>
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={STYLE.GRID_ITEM}>
            <ProjectionView />
          </Grid>
        </Grid>
      </IfElse>
    </Box>
  );
}
