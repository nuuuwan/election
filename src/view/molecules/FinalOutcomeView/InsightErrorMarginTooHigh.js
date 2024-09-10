import { Box, Typography } from "@mui/material";
import { Format, Translate } from "../../../nonview/base";
import { FinalOutcome } from "../../../nonview/core";

export default function InsightErrorMarginTooHigh() {
  return (
    <Box sx={{ maxWidth: "33%" }}>
      <Typography variant="h6">{Translate("Error Margin too High")}</Typography>
      <Typography variant="caption">
        {Translate("The voting preferences of")} &gt;
        {Format.percent(FinalOutcome.P_TOO_MUCH_UNCERTAINTY)}
        {Translate(
          "of votes are within the Error Margin. Please wait for more results"
        )}
        .
      </Typography>
    </Box>
  );
}
