import { Box, Typography } from "@mui/material";

import { EntType, Format, Translate } from "../../nonview";
import CustomAlert from "../base/CustomAlert";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import { useDataContext } from "../../nonview/core/DataProvider";

export function ResultsReleasedAlert() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, entIdx, electionPrevious } = data;

  const entID = "LK";
  
  const isComplete = electionDisplay.isComplete(entID, entIdx);
  if (!isComplete) {
    return null;
  }

  const pElectors = electionDisplay.getPElectors(entID, entIdx, electionPrevious);

  return (
    <CustomAlert severity="warning">
      <Typography variant="body1">
        {Translate(
          '"%1 Released" is an estimate based on registered voter data from previous elections.',
          [Format.percent(pElectors)]
        )}
      </Typography>
    </CustomAlert>
  );
}



export  function ResultsReleasedTitlePercent() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, electionPrevious } = data;
  if (electionDisplay.baseEntType === EntType.ED) {
    return null;
  }

  const entIdx = electionDisplay.getEntIdx(data);

  const entID = "LK";


  const pElectors = electionDisplay.getPElectors(entID, entIdx, electionPrevious);

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h4" color="gray">
        <span style={{ color: "black" }}>{Format.percent(pElectors)}</span>{" "}
        {Translate("Released")}
      </Typography>
    </Box>
  );
}

export  function ResultsReleasedTitleNumber() {
  const data = useDataContext();
  if (!data) {
    return (
      <Typography variant="h4" color="gray" sx={{ marginBottom: 2 }}>
        {Translate("Results")}
      </Typography>
    );
  }
  const { electionDisplay,  } = data;
  if (electionDisplay.baseEntType === EntType.ED) {
    return null;
  }

  const entIdx = electionDisplay.getEntIdx(data);

  const entID = "LK";
  const { nResultsTotal, nResultsReleased } =
    electionDisplay.getNResultsReleasedAndTotal(entID, entIdx);

  return (
    <Typography variant="h4" color="gray" sx={{ marginBottom: 2 }}>
      <span style={{ color: "black" }}>
        {Translate("%1 of %2 Results", [nResultsReleased, nResultsTotal])}
      </span>{" "}
    </Typography>
  );
}


export default function ResultsReleasedTitle({ mode = "percent" }) {

  if (mode === "percent") {
    return <ResultsReleasedTitlePercent />;
  }

  return <ResultsReleasedTitleNumber />
}
