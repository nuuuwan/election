import { Box, Grid } from "@mui/material";

import ColumnLatestResult from "./ColumnLatestResult";

import ColumnMap from "./ColumnMap";
import ColumnProjection from "./ColumnProjection";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { IfElse, NoResultsAlert } from "../../atoms";

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
            <ColumnMap />
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={STYLE.GRID_ITEM}>
            <ColumnProjection />
          </Grid>
        </Grid>
      </IfElse>
    </Box>
  );
}
