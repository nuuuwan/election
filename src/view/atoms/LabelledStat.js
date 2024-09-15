import { Stack, Typography } from "@mui/material";
export default function LabelledStat({ label, valueStr, sx }) {
  return (
    <Stack
      direction="column"
      gap={0.5}
      sx={sx}
    >
      <Typography variant="h6">{valueStr}</Typography>
      <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
        {label}
      </Typography>
    </Stack>
  );
}
