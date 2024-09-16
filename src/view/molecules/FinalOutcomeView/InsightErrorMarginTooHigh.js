import { Box, Typography } from "@mui/material";
import { Translate } from "../../../nonview/base";

export default function InsightErrorMarginTooHigh() {
  return (
    <Box sx={{ maxWidth: 320 }}>
      <Typography variant="h2">{Translate("Await")}...</Typography>
      <Typography variant="h6">
        {"Our models needs more data to make a projection."}
      </Typography>
    </Box>
  );
}
