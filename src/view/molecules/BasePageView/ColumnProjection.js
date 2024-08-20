import { Box, Stack, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import { PredictionView } from "../../molecules";
export default function ColumnProjection({
  projectedElection,
  electionDisplay,
  db,
}) {
  return (
    <Stack direction="column" gap={1}>
      <Box
        sx={{
            color: projectedElection
              ? projectedElection.color
              : STYLE.COLOR.LIGHT,
          }}
      >
        <Typography variant="caption">Final Result</Typography>
        <Typography variant="h4">Projected</Typography>
      </Box>
      <PredictionView
        electionDisplay={electionDisplay}
        db={db}
        projectedElection={projectedElection}
      />
    </Stack>
  );
}
