import { Stack, Typography } from "@mui/material";

export default function LabelledStat({ label, valueStr, sx }) {
  return (
    <Stack
      direction="row"
      gap={2}
      sx={Object.assign({ alignItems: "center" }, sx)}
    >
      <Typography variant="body1" sx={{ textAlign: "right", width: "50%" }}>
        {label}
      </Typography>
      <Typography variant="h4" sx={{ textAlign: "left", width: "50%" }}>
        {valueStr}
      </Typography>
    </Stack>
  );
}
