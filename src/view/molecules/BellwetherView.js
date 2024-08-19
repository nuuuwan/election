import { Box, Typography } from "@mui/material";
import { Bellwether } from "../../nonview/core";
import { Format } from "../../nonview/base";
import { STYLE } from "../../nonview/constants";

function PerfectBellwether({ n, ent }) {
  return (
    <Box>
      <Typography variant="h6">Perfect Bellwether</Typography>
      <Typography variant="caption">
        Results in {ent.name} have matched Final National Result in all {n}{" "}
        previous Presidential Elections.
      </Typography>
    </Box>
  );
}

function PercentageBellwether({ error, ent }) {
  return (
    <Box color={STYLE.COLOR.LIGHT}>
      <Typography variant="caption">
        Historically, Party Vote percentages in {ent.name}, have varied from the
        National Result by {Format.percentError(error)}, on average.
      </Typography>
    </Box>
  );
}

export default function BellwetherView({ elections, electionDisplay, db }) {
  const { n, nSame, error } = Bellwether.getStats(elections, electionDisplay);
  if (n === 0) {
    return null;
  }
  const pdID = electionDisplay.finalPDID;
  const ent = db.pdIdx[pdID];

  return (
    <Box sx={STYLE.MESSAGE}>
      {n === nSame ? <PerfectBellwether n={n} ent={ent} /> : null}
      <PercentageBellwether error={error} ent={ent} />
    </Box>
  );
}
