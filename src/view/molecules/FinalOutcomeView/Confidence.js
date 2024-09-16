import { Typography } from "@mui/material";
import { Format, Translate } from "../../../nonview/base";
import { FinalOutcome } from "../../../nonview/core";
import { useDataContext } from "../../../nonview/core/DataProvider";

export default function Confidence() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, pdIdx, electionPrevious } = data;

  const { nResultsTotal, nResultsReleased } = electionDisplay.getReleaseStats(
    "LK",
    pdIdx,
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
