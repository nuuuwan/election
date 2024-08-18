import { Box, Grid, Typography } from "@mui/material";

import ColumnLatestResult from "./ColumnLatestResult";
import ColumnCumulativeResult from "./ColumnCumulativeResult";
import ColumnMap from "./ColumnMap";
import ColumnProjection from "./ColumnProjection";

const STYLE = {
  paddingTop: 10,
  paddingBottom: 10,
};

const STYLE_GRID = {
  paddingBottom: 10,
};

function getColumns(election, electionDisplay, db, projectedElection, setActivePDID, ) {
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
    />,
    <ColumnMap
      election={election}
      electionDisplay={electionDisplay}
      db={db}
      setActivePDID={setActivePDID}
    />,
    <ColumnProjection
      projectedElection={projectedElection}
      electionDisplay={electionDisplay}
      db={db}
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
    <Box sx={STYLE}>
      {electionDisplay.nResults === 0 ? (
        <Typography variant="h3" sx={{ paddingTop: 10, paddingBottom: 20 }}>
          Await results...
        </Typography>
      ) : (
        <Grid container rowSpacing={4}>
          {getColumns(election, electionDisplay, db, projectedElection, setActivePDID).map(
            function (column, i) {
              return (
                <Grid key={i} item xs={12} md={6} xl={3} sx={STYLE_GRID}>
                  {column}
                </Grid>
              );
            }
          )}
        </Grid>
      )}
    </Box>
  );
}
