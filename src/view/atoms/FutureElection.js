import { Alert, Box, Typography } from "@mui/material";

export default function FutureElection({ election }) {
  return (
    <Box>
      <Alert severity="info" sx={{ m: 1, p: 1 }}>
        <Typography variant="h4">
          This election is scheduled for {election.date}.
        </Typography>
        <Typography variant="h6">
          We will provide the results once they are available.
        </Typography>{" "}
      </Alert>
    </Box>
  );
}
