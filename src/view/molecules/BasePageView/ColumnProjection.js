import { Box, Typography } from "@mui/material";

import CustomStack from "./CustomStack";

import { FinalOutcomeView, PredictionView } from "../../molecules";
import { Translate } from "../../../nonview/base";

export default function ColumnProjection({
  projectedElection,
  electionDisplay,
  db,
}) {
  return (
    <CustomStack>
      <Box color={projectedElection.color}>
        <Typography variant="body1">{Translate("Final Result")}</Typography>
        <Typography variant="h4">{Translate("Projected")}</Typography>
      </Box>

      <PredictionView db={db} projectedElection={projectedElection} />
      <FinalOutcomeView
        election={projectedElection}
        nResultsDisplay={electionDisplay.nResults}
      />
    </CustomStack>
  );
}
