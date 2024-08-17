import { Box, Grid } from "@mui/material";
import CitationsView from "./CitationsView";

import ColumnResults from "./ColumnResults";
import ColumnResultsLK from "./ColumnResultsLK";
import ColumnMap from "./ColumnMap";
import ColumnProjection from "./ColumnProjection";

export default function PageBody({
  election,
  electionDisplay,
  //
  elections,
  pdIdx,
  edIdx,
  //
  setActivePDID,
}) {
  return (
    <Box
      sx={{
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <Grid container rowSpacing={5}>
        <Grid item xs={12} md={6} xl={3}>
          <ColumnResults
            election={election}
            electionDisplay={electionDisplay}
            pdIdx={pdIdx}
            edIdx={edIdx}
            elections={elections}
            setActivePDID={setActivePDID}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <ColumnResultsLK
            election={election}
            electionDisplay={electionDisplay}
            elections={elections}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <ColumnMap
            election={election}
            electionDisplay={electionDisplay}
            pdIdx={pdIdx}
            setActivePDID={setActivePDID}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <ColumnProjection
            election={election}
            electionDisplay={electionDisplay}
            elections={elections}
            pdIdx={pdIdx}
          />
        </Grid>
      </Grid>
      <CitationsView />
    </Box>
  );
}
