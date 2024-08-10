import { Stack, Typography } from "@mui/material";

export default function LabelledStat({ label, valueStr, sx }) {
  return (
    <Stack direction="column" gap={0} sx={Object.assign({}, sx)}>
      <Typography variant="caption" sx={{ opacity: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="h4">{valueStr}</Typography>
    </Stack>
  );
}
