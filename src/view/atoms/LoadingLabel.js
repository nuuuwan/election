import { Stack, CircularProgress, Typography } from "@mui/material";


export default function LoadingLabel() {
  return (
    <Stack direction="row" gap={1} sx={{m:2, p:2, alignItems: "center"}}>
      <CircularProgress />
      <Typography variant="h4" color="secondary">
        Loading...
      </Typography>
    </Stack>
  );
}
