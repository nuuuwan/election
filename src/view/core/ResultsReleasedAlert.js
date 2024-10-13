import { Typography } from "@mui/material";

import { Format, Translate } from "../../nonview";
import CustomAlert from "../base/CustomAlert";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import CustomLoadingProgress from "../base/CustomLoadingProgress";

export default function ResultsReleasedAlert() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionDisplay, entIdx, electionPrevious } = data;

  const entID = "LK";

  const isComplete = electionDisplay.isComplete(entID, entIdx);
  if (!isComplete) {
    return null;
  }

  const pElectors = electionDisplay.getPElectors(
    entID,
    entIdx,
    electionPrevious
  );

  return (
    <CustomAlert severity="warning">
      <Typography variant="body1">
        {Translate(
          '"%1 Released" is an estimate based on registered voter data from previous electionHistory.',
          [Format.percent(pElectors)]
        )}
      </Typography>
    </CustomAlert>
  );
}
