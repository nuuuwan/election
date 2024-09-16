import { Box, Typography } from "@mui/material";
import { Translate } from "../../nonview/base";

export default function NoResultsAlert() {
  return (
    <Box sx={{ paddingTop: 10, paddingBottom: 20, height: "90vh" }}>
      <Typography variant="h1">{Translate("Await results")}...</Typography>
    </Box>
  );
}
