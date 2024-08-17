import { Box, Typography } from "@mui/material";
import { Bellwether } from "../../nonview/core";
import { Format } from "../../nonview/base";
import { STYLE } from "../../nonview/constants";

function PerfectBellwether({ n }) {
  return (
    <Box>
      <Typography variant="h6">Perfect Bellwether</Typography>
      <Typography variant="caption">
        Results have matched Final National Result in all {n} previous
        Presidential Elections.
      </Typography>
    </Box>
  );
}

function PercentageBellwether({ error }) {
  return (
    <Box color={STYLE.COLOR.LIGHT}>
      <Typography variant="caption">
        Historically, Party Vote percentages vary from the National Result by{" "}
        {Format.percentError(error)}, on average.
      </Typography>
    </Box>
  );
}

export default function BellwetherView({ elections, electionDisplay }) {
  const { n, nSame, error } = Bellwether.getStats(elections, electionDisplay);
  if (n === 0) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 320, p: 1, margin: "auto" }}>
      {n === nSame ? <PerfectBellwether n={n} /> : null}
      <PercentageBellwether error={error} />
    </Box>
  );
}
