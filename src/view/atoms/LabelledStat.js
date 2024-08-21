import { Stack, Typography } from "@mui/material";
import { Translate } from "../../nonview/base";
export default function LabelledStat({ label, valueStr, sx }) {
  return (
    <Stack
      direction="column"
      gap={0}
      sx={Object.assign({ alignItems: "center" }, sx)}
    >
      <Typography variant="body2" sx={{ textTransform: "uppercase" }}>
        {Translate(label)}
      </Typography>
      <Typography variant="h5">{valueStr}</Typography>
    </Stack>
  );
}
