import { Stack, Typography } from "@mui/material";

export default function LabelledStat({ label, valueStr, sx }) {
  return (
    <Stack
      direction="column"
      gap={0}
      sx={Object.assign({ alignItems: "center" }, sx)}
    >
      <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
        {label}
      </Typography>
      <Typography variant="h4">{valueStr}</Typography>
    </Stack>
  );
}
