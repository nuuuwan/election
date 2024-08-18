import { Box, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import { PredictionView } from "../../molecules";
export default function ColumnProjection({
  projectedElection,
  electionDisplay,
  db,
}) {
  return (
    <Box color={projectedElection ? projectedElection.color : STYLE.COLOR.LIGHT}>
      <Box sx={STYLE.BODY_HEADER}>
        <Typography variant="caption">Final Result</Typography>
        <Typography variant="h4">Projected</Typography>
      </Box>
      <PredictionView
        electionDisplay={electionDisplay}
        db={db}
        projectedElection={projectedElection}
      />
    </Box>
  );
}
