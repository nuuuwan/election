import { Box, Typography } from "@mui/material";

import CustomStack from "./CustomStack";

import { FinalOutcomeView, PredictionView } from "../../molecules";
import { STYLE } from "../../../nonview/constants";
export default function ColumnProjection({
  projectedElection,
  electionDisplay,
  db,
}) {
  return (
    <CustomStack>
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
      <PredictionView db={db} projectedElection={projectedElection} />
      <FinalOutcomeView
        election={projectedElection}
        nResultsDisplay={electionDisplay.nResults}
      />
    </CustomStack>
  );
}
