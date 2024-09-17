import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Translate } from "../../nonview/base";

export default function ResultTimeView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;
  const result = electionDisplay.resultIdx[entID];
  
  const label = result.resultTime || Translate("Not available")
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={0.3}
      sx={{ color: "lightgray" }}
    >
      <AccessTimeIcon />
      <Typography variant="body1">{label}</Typography>
    </Stack>
  );
}
