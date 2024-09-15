
import { Stack, Typography } from "@mui/material";
import { Translate } from "../../nonview/base";
export default function LabelledStat({ label, stat, sx}) {
  
  let renderedLabel = label;
  if (typeof label === "string") {
    renderedLabel = (<Typography variant="caption" sx={{ textTransform: "uppercase" }}>
        {Translate(label)}
      </Typography>);
  }

  let renderedStat = stat;
  if (typeof stat === "string") {
    renderedStat = <Typography variant="h5">{stat}</Typography>;
  }
  
  return (
    <Stack direction="column" gap={0.5} sx={sx}>
      {renderedStat}
      {renderedLabel}
    </Stack>
  );
}
