import { Box, Typography } from "@mui/material";
import { Translate } from "../../nonview/base";
import { useDataContext } from "../../nonview/core/DataProvider";

export default function NoResultsAlert() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election,  } = data;

  return (
    <Box sx={{ paddingTop: 10, paddingBottom: 20, height: "90vh" }}>
    <Typography variant="h2">{election.titleLong}</Typography>
    <Typography variant="h5">{Translate("Await results")}...</Typography>
  </Box>
  );
}
