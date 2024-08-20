import { Box, Typography } from "@mui/material";

import CustomStack from "./CustomStack";

import { FinalOutcomeView, PredictionView } from "../../molecules";

export default function ColumnProjection({
  projectedElection,
  electionDisplay,
  db,
}) {
  return (
    <CustomStack>
            <Box color={projectedElection.color}>
      <Typography variant="body1">Final Result</Typography>
      <Typography variant="h4">Projected</Typography>
      </Box>

      <PredictionView db={db} projectedElection={projectedElection} />
      <FinalOutcomeView
        election={projectedElection}
        nResultsDisplay={electionDisplay.nResults}
      />
    </CustomStack>
  );
}
