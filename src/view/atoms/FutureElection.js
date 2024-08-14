import { Box, Typography } from "@mui/material";

export default function FutureElection({ election }) {
  const days = Math.floor((new Date(election.date) - new Date()) / 86400000);
  return (
    <Box sx={{ maxWidth: 800, margin: "auto" }}>
      <Typography variant="h4">This election is in {days} days.</Typography>
      <Typography variant="body1">
        We will provide the results once they are available.
      </Typography>
      <Typography variant="caption" color="orange">
        Here are some imaginary election results, purely for testing purposes.
      </Typography>{" "}
    </Box>
  );
}
