import { Stack, CircularProgress, Typography } from "@mui/material";
import { STYLE, VERSION } from "../../../nonview/constants";
import { Election } from "../../../nonview/core";

export default function LoadingView({ electionType, date }) {
  const tempElection = new Election(electionType, date);
  return (
    <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
      <CircularProgress />
      <Typography variant="body1" color={STYLE.COLOR.LIGHT}>
        Loading {tempElection.title}
      </Typography>
      <Typography variant="caption" color={STYLE.COLOR.LIGHTER}>
        (v{VERSION.DATETIME_STR})
      </Typography>
    </Stack>
  );
}
