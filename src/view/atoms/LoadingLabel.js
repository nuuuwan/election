import { Box, Typography } from "@mui/material";

export default function LoadingLabel() {
  return (
    <Box sx={{ m: 2, p: 2 }}>
      <Typography variant="h6" color="secondary">
        Loading...
      </Typography>
    </Box>
  );
}
