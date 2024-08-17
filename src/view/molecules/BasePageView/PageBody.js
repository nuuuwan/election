import { Box, Grid } from "@mui/material";
import CitationsView from "./CitationsView";

import ColumnResults from "./ColumnResults";
import ColumnResultsLK from "./ColumnResultsLK";
import ColumnMap from "./ColumnMap";
import ColumnProjection from "./ColumnProjection";

export default function PageBody({
  activePDID,
  edIdx,
  election,
  elections,
  nResultsDisplay,
  pdIdx,
  result,
  resultLKDisplay,
  resultsIdx,
  resultsIdxDisplay,
  resultDisplayPDIDs,
  setActivePDID,
  subTitleProgress,
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
            activePDID={activePDID}
            pdIdx={pdIdx}
            edIdx={edIdx}
            election={election}
            elections={elections}
            resultsIdx={resultsIdx}
            setActivePDID={setActivePDID}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <ColumnResultsLK
            election={election}
            elections={elections}
            subTitleProgress={subTitleProgress}
            resultLKDisplay={resultLKDisplay}
            resultDisplayPDIDs={resultDisplayPDIDs}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <ColumnMap
            pdIdx={pdIdx}
            subTitleProgress={subTitleProgress}
            resultsIdxDisplay={resultsIdxDisplay}
            resultLKDisplay={resultLKDisplay}
            result={result}
            setActivePDID={setActivePDID}
          />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <ColumnProjection
            election={election}
            nResultsDisplay={nResultsDisplay}
            elections={elections}
            pdIdx={pdIdx}
          />
        </Grid>
      </Grid>
      <CitationsView />
    </Box>
  );
}
