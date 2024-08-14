import { Paper, Typography } from "@mui/material";
import { STYLE } from "../../nonview/constants";

export default function FutureElection({ election }) {
  const days = Math.floor((new Date(election.date) - new Date()) / 86400000);
  return (
    <Paper
      elevation={1}
      sx={{
        width: 100,
        p: 1.5,
        textAlign: "left",
        backgroundColor: STYLE.COLOR.LIGHTEST,
      }}
    >
      <Typography variant="h6" color={STYLE.COLOR.LIGHT}>
        Random Test Data!
      </Typography>
      <Typography variant="caption" color={STYLE.COLOR.DARK}>
        Election is in {days} days.
      </Typography>
    </Paper>
  );
}
