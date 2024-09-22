import { Box, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { EntType, Format, Translate } from "../../nonview/base";
import CustomAlert from "./CustomAlert";

export function ResultsReleasedAlert() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, entIdx, electionPrevious } = data;

  const entID = "LK";
  const { nResultsTotal, nResultsReleased, pElectors } =
    electionDisplay.getReleaseStats(entID, entIdx, electionPrevious);

  const isComplete = nResultsReleased < nResultsTotal;
  if (!isComplete) {
    return null;
  }

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

export default function ResultsReleasedTitle({ mode = "percent" }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, electionPrevious } = data;
  if (electionDisplay.baseEntType === EntType.ED) {
    return null;
  }

  const entIdx = electionDisplay.getEntIdx(data);

  const entID = "LK";
  const { nResultsTotal, nResultsReleased, pElectors } =
    electionDisplay.getReleaseStats(entID, entIdx, electionPrevious);

  if (mode === "percent") {
    return (
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4" color="gray">
          <span style={{ color: "black" }}>{Format.percent(pElectors)}</span>{" "}
          {Translate("Released")}
        </Typography>
      </Box>
    );
  }

  return (
    <Typography variant="h4" color="gray" sx={{ marginBottom: 2 }}>
      <span style={{ color: "black" }}>
        {Translate("%1 of %2 Results", [nResultsReleased, nResultsTotal])}
      </span>{" "}
    </Typography>
  );
}
