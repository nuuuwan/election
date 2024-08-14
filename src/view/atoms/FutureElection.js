import { Paper, Typography } from "@mui/material";
import { STYLE } from "../../nonview/constants";

export default function FutureElection({ election }) {
  const days = Math.floor((new Date(election.date) - new Date()) / 86400000);
  return (
    <Paper
      elevation={1}
      sx={{
        width: "fit-content",
        margin: "auto",
        p: 1.5,
        backgroundColor: STYLE.COLOR.LIGHTEST,
      }}
    >
      <Typography variant="h4">This election is in {days} days.</Typography>
      <Typography variant="body1">
        We will provide the results once they are available.
      </Typography>
      <Typography variant="caption" color="orange">
        Here are some imaginary election results, purely for testing purposes.
      </Typography>{" "}
    </Paper>
  );
}
