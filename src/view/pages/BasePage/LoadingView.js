import { Stack, CircularProgress, Typography } from "@mui/material";
import {  VERSION } from "../../../nonview/constants";
import { Election } from "../../../nonview/core";

export default function LoadingView({ electionType, date }) {
  const tempElection = new Election(electionType, date);
  return (
    <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
      <CircularProgress />
      <Typography variant="body1" color={"secondary"}>
        Loading {tempElection.title}
      </Typography>
      <Typography variant="caption" color={"secondary"}>
        (v{VERSION.DATETIME_STR})
      </Typography>
    </Stack>
  );
}
