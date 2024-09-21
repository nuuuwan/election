import { Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

export default function ElectionSmallTitle() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;
  return (
    <Typography variant="caption" sx={{ color: "lightgray", fontSize: "40%" }}>
      {electionDisplay.hashTag}
    </Typography>
  );
}
