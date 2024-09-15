import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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

  if (nResultsTotal <= 1) {
    return null;
  }

  const title = (
    <Stack direction="row" alignItems="center">
      <Typography variant="h6">{nResultsReleased}</Typography>
      <Typography variant="caption">/{nResultsTotal}</Typography>
    </Stack>
  );


  return (
    <Stack direction="row" alignItems="center">
      {nResultsReleased === nResultsTotal ? <CheckCircleIcon /> : null}
      {title}
    </Stack>
  );
}
