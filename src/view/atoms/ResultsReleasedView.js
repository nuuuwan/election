import { Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import { Translate } from "../../nonview/base";

export default function ResultsReleasedView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, pdIdx } = data;

  const { nResultsTotal, nResultsReleased } = electionDisplay.getReleaseStats(
    entID,
    pdIdx
  );

  let label = "";
  if (nResultsTotal > 1) {
    label = `${nResultsReleased}/${nResultsTotal} ${Translate(
      "Results Released"
    )}`;
  }

  if (nResultsReleased === nResultsTotal) {
    label += ` (${Translate("Final")})`;
  }

  return (
    <Typography variant="body1" color={"secondary"}>
      {label}
    </Typography>
  );
}
