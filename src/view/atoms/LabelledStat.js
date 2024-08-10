import { Stack, Typography } from "@mui/material";

export default function LabelledStat({ label, valueStr, sx }) {
  return (
    <Stack direction="column" gap={0} sx={Object.assign({}, sx)}>
      <Typography
        variant="h6"
        sx={{ opacity: 0.5, textTransform: "uppercase" }}
      >
        {label}
      </Typography>
      <Typography variant="h4">{valueStr}</Typography>
    </Stack>
  );
}
