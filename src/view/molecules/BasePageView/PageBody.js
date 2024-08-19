import { Box, Grid, Typography } from "@mui/material";

import ColumnLatestResult from "./ColumnLatestResult";
import ColumnCumulativeResult from "./ColumnCumulativeResult";
import ColumnMap from "./ColumnMap";
import ColumnProjection from "./ColumnProjection";

const STYLE = {
  BOX: { paddingTop: 7, paddingBottom: 10 },
  GRID_ITEM: {
    paddingBottom: 5,
  },
};

function getColumns(
  election,
  electionDisplay,
  db,
  projectedElection,
  setActivePDID
) {
  return [
    <ColumnLatestResult
      election={election}
      electionDisplay={electionDisplay}
      db={db}
      setActivePDID={setActivePDID}
    />,
    <ColumnCumulativeResult
      election={election}
      electionDisplay={electionDisplay}
      db={db}
      projectedElection={projectedElection}
    />,
    <ColumnProjection
      projectedElection={projectedElection}
      electionDisplay={electionDisplay}
      db={db}
    />,

    <ColumnMap
      election={election}
      electionDisplay={electionDisplay}
      db={db}
      setActivePDID={setActivePDID}
    />,
  ];
}

export default function PageBody({
  election,
  electionDisplay,
  db,
  projectedElection,
  setActivePDID,
}) {
  return (
    <Box sx={STYLE.BOX}>
      {electionDisplay.nResults === 0 ? (
        <Typography variant="h3" sx={{ paddingTop: 10, paddingBottom: 20 }}>
          Await results...
        </Typography>
      ) : (
        <Grid container rowSpacing={4}>
          {getColumns(
            election,
            electionDisplay,
            db,
            projectedElection,
            setActivePDID
          ).map(function (column, i) {
            return (
              <Grid key={i} item xs={12} md={6} xl={3} sx={STYLE.GRID_ITEM}>
                {column}
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
