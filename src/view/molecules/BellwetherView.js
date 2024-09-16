import { Box, Typography } from "@mui/material";
import { Bellwether } from "../../nonview/core";
import { Format, Translate } from "../../nonview/base";
import { useDataContext } from "../../nonview/core/DataProvider";

function getNumBellwetherText({ n,nSame, ent }) {
  return Translate(
    "Results in %1 have matched the Final National Result in %2/%3 previous Presidential Elections.",
    [Translate(ent.name), nSame, n]
  )
}

function getPercentageBellwetherText({ error,  }) {
  return Translate(
    "Historically, Party Vote percentages, have varied from the National Result by %1, on average.",
    [Format.percent(error)]
  )
}

export default function BellwetherView() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { pdIdx, electionDisplay, elections, activePDID } = data;

  const { n, nSame, error } = Bellwether.getStats(
    elections,
    electionDisplay,
    activePDID
  );
  if (n === 0) {
    return null;
  }

  const ent = pdIdx[activePDID];

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="caption">
        {getNumBellwetherText({ n, nSame, ent }) + " " + getPercentageBellwetherText({ error,  })}
      </Typography>
    </Box>
  );
}
