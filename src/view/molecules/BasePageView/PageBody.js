import { Box, Grid, Typography } from "@mui/material";
import CitationsView from "./CitationsView";

import ColumnResults from "./ColumnResults";
import ColumnResultsLK from "./ColumnResultsLK";
import ColumnMap from "./ColumnMap";
import ColumnProjection from "./ColumnProjection";

const STYLE = {
  paddingTop: 10,
  paddingBottom: 10,
};

function getColumns(election, electionDisplay, db, setActivePDID) {
  return [
    <ColumnResults
      election={election}
      electionDisplay={electionDisplay}
      db={db}
      setActivePDID={setActivePDID}
    />,
    <ColumnResultsLK
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
      election={election}
      electionDisplay={electionDisplay}
      db={db}
    />,
  ];
}

export default function PageBody({
  election,
  electionDisplay,
  db,
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
          {getColumns(election, electionDisplay, db, setActivePDID).map(
            function (column, i) {
              return (
                <Grid key={i} item xs={12} md={6} xl={3}>
                  {column}
                </Grid>
              );
            }
          )}
        </Grid>
      )}

      <CitationsView />
    </Box>
  );
}
