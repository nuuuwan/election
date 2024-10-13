import { Box, Typography } from "@mui/material";
import { Translate } from "../../../nonview";

export default function InsightTooCloseToCall() {
  return (
    <Box>
      <Typography variant="h4">{Translate("Too close to call")}</Typography>
    </Box>
  );
}
