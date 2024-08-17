import { Box, Paper } from "@mui/material";

import { STYLE } from "../../../nonview/constants";
import { FinalOutcome } from "../../../nonview/core";
import FinalOutcomeViewRenderUtils from "./FinalOutcomeViewRenderUtils";

export default function FinalOutcomeView({ election, nResultsDisplay }) {
  const finalOutcome = new FinalOutcome(election, nResultsDisplay);
  return (
    <Paper
      sx={{
        width: "fit-content",
        margin: "auto",
        p: 0.5,
        backgroundColor: STYLE.COLOR.LIGHTEST,
        elevation: 2,
      }}
    >
      {FinalOutcomeViewRenderUtils.renderInsights(finalOutcome).map(function (
        insight,
        i
      ) {
        return (
          <Box key={i} sx={{ textAlign: "center", alignItems: "center" }}>
            {insight}
          </Box>
        );
      })}
    </Paper>
  );
}
