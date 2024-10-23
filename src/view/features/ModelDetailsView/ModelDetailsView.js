import { Box, Typography } from "@mui/material";
import { Translate } from "../../../nonview";

export default function ModelDetailsView() {
  return (
    <Box>
      <Typography variant="h4">{Translate("Model Details")}</Typography>
    </Box>
  )
}