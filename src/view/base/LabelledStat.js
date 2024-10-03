import { Stack, Typography } from "@mui/material";
import { Translate } from "../../nonview";
export default function LabelledStat({ label, stat, sx }) {
  let renderedLabel = label;
  if (typeof label === "string") {
    renderedLabel = (
      <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
        {Translate(label)}
      </Typography>
    );
  }

  let renderedStat = stat;
  if (typeof stat === "string") {
    renderedStat = <Typography variant="body1">{stat}</Typography>;
  }

  return (
    <Stack direction="column" sx={Object.assign({ alignItems: "center" }, sx)}>
      {renderedStat}
      {renderedLabel}
    </Stack>
  );
}
