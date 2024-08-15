import { Stack, Typography } from "@mui/material";

export default function LabelledStat({ label, valueStr, sx }) {
  return (
    <Stack
      direction="column"
      gap={0}
      sx={Object.assign({ alignItems: "center" }, sx)}
    >
      <Typography variant="body1" sx={{ textTransform: "uppercase" }}>
        {label}
      </Typography>
      <Typography variant="h5">{valueStr}</Typography>
    </Stack>
  );
}
