import { Box, Typography } from "@mui/material";
import { Translate } from "../../nonview/base";

export default function NoResultsAlert({ election }) {
  return (
    <Box sx={{ paddingTop: 10, paddingBottom: 20, height: "90vh" }}>
      <Typography variant="h4">{Translate(election.title)}</Typography>
      <Typography variant="h1">{Translate("Await results")}...</Typography>
    </Box>
  );
}
