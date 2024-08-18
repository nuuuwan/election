import { Box } from "@mui/material";

import { STYLE } from "../../../nonview/constants";
import { FinalOutcome } from "../../../nonview/core";
import FinalOutcomeViewRenderUtils from "./FinalOutcomeViewRenderUtils";

export default function FinalOutcomeView({ election, nResultsDisplay }) {
  const finalOutcome = new FinalOutcome(election, nResultsDisplay);
  return (
    <Box sx={STYLE.MESSAGE}>
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
    </Box>
  );
}
