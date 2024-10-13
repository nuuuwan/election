import { Typography } from "@mui/material";
import { Format, Translate, FinalOutcome } from "../../../nonview";

import { useDataContext } from "../../../nonview/core/DataProvider";

export default function Confidence() {
  const data = useDataContext();
  const { electionDisplay, entIdx, electionPrevious } = data;

  const { nResultsTotal, nResultsReleased } =
    electionDisplay.getNResultsReleasedAndTotal("LK", entIdx, electionPrevious);

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
