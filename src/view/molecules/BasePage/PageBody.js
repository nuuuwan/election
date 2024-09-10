import { Box, Grid, Typography } from "@mui/material";
import { Translate } from "../../../nonview/base";
import ColumnLatestResult from "./ColumnLatestResult";
import ColumnCumulativeResult from "./ColumnCumulativeResult";
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

function getColumns() {
  return [
    <ColumnLatestResult />,
    <ColumnCumulativeResult />,
    <ColumnProjection />,
    <ColumnMap />,
  ];
}

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
        <Grid container rowSpacing={4}>
          {getColumns().map(function (column, i) {
            return (
              <Grid item key={i} xs={12} md={6} xl={3} sx={STYLE.GRID_ITEM}>
                {column}
              </Grid>
            );
          })}
        </Grid>
        </IfElse> 
    </Box>
  );
}
