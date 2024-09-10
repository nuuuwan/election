import { Box, Typography } from "@mui/material";
import { Bellwether } from "../../nonview/core";
import { Format, Translate } from "../../nonview/base";
import { useDataContext } from "../../nonview/core/DataProvider";

function PerfectBellwether({ n, ent }) {
  return (
    <Box>
      <Typography variant="h6">{Translate("Perfect Bellwether")}</Typography>
      <Typography variant="caption" color="secondary">
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
    <Box>
      <Typography variant="caption" color="secondary">
        {Translate(
          "Historically, Party Vote percentages in %1, have varied from the National Result by %2, on average.",
          [Translate(ent.name), Format.percentError(error)]
        )}
      </Typography>
    </Box>
  );
}

export default function BellwetherView() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { pdIdx, electionDisplay, elections } = data;

  const { n, nSame, error } = Bellwether.getStats(
    elections,
    electionDisplay,
    electionDisplay.finalPDID
  );
  if (n === 0) {
    return null;
  }
  const pdID = electionDisplay.finalPDID;
  const ent = pdIdx[pdID];

  return (
    <Box sx={{ maxWidth: 320 }}>
      {n === nSame ? <PerfectBellwether n={n} ent={ent} /> : null}
      <PercentageBellwether error={error} ent={ent} />
    </Box>
  );
}
