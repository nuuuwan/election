import { Box, Typography } from "@mui/material";
import { STYLE } from "../../nonview/constants";

export default function FutureElection({ election }) {
  const days = Math.floor((new Date(election.date) - new Date()) / 86400000);
  return (
    <Box
      sx={{
        width: 100,
        p: 1,
        textAlign: "center",
      }}
    >
      <Typography variant="caption" color={STYLE.COLOR.DARK}>
        Election is in {days} days.
      </Typography>
    </Box>
  );
}
