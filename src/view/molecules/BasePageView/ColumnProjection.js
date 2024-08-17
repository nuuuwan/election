import { Box, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import { PredictionView } from "../../molecules";
export default function ColumnProjection({ election, electionDisplay, db }) {
  return (
    <Box color={STYLE.COLOR.DARK}>
      <Box sx={STYLE.BODY_HEADER}>
        <Typography variant="caption">Final Result</Typography>
        <Typography variant="h4">Projected</Typography>
      </Box>
      <PredictionView
        election={election}
        electionDisplay={electionDisplay}
        db={db}
      />
    </Box>
  );
}
