import { Box, Typography } from "@mui/material";
import { Bellwether } from "../../nonview/core";
import { Format, Translate } from "../../nonview/base";
import { STYLE } from "../../nonview/constants";

function PerfectBellwether({ n, ent }) {
  return (
    <Box>
      <Typography variant="h6">{Translate("Perfect Bellwether")}</Typography>
      <Typography variant="caption">
        {Translate(
          "Results in %1 have matched Final National Result in all %2 previous Presidential Elections.",
          [Translate(ent.name), n]
        )}
      </Typography>
    </Box>
  );
}

function PercentageBellwether({ error, ent }) {
  return (
    <Box color={STYLE.COLOR.LIGHT}>
      <Typography variant="caption">
        {Translate(
          "Historically, Party Vote percentages in %1, have varied from the National Result by %2, on average.",
          [Translate(ent.name), Format.percentError(error)]
        )}
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
