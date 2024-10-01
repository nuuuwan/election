import { Typography } from "@mui/material";
import { Format, Translate } from "../../../nonview";
import { FinalOutcome } from "../../../nonview";

import { useDataSlowContext } from "../../../nonview/core/DataSlowProvider";

export default function Confidence() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, entIdx, electionPrevious } = data;

  const { nResultsTotal, nResultsReleased } = electionDisplay.getReleaseStats(
    "LK",
    entIdx,
    electionPrevious
  );

  const isComplete = nResultsReleased === nResultsTotal;
  if (isComplete) {
    return null;
  }

  return (
    <Typography variant="caption">
      &gt;{Format.percent(FinalOutcome.P_BASE)} {Translate("Confidence")}
    </Typography>
  );
}
