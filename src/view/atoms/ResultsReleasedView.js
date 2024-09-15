import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { Format } from "../../nonview/base";
import LabelledStat from "./LabelledStat";

export default function ResultsReleasedView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, pdIdx, electionPrevious } = data;

  const { nResultsTotal, nResultsReleased, pElectors } = electionDisplay.getReleaseStats(
    entID,
    pdIdx,
    electionPrevious,
  );

  console.debug({electionPrevious});

  if (nResultsTotal <= 1) {
    return null;
  }

  const pdDetails = (
    <Stack direction="row" alignItems="center">
      <Typography variant="h6">{nResultsReleased}</Typography>
      <Typography variant="caption">/{nResultsTotal}</Typography>
    </Stack>
  );


  return (
    <Stack direction="row" alignItems="center" gap={1} sx={{color: "gray"}}>
      <LabelledStat label="Results Released" valueStr={pdDetails} />
      <LabelledStat label="Votes Counted" valueStr={Format.percent(pElectors)} />
    </Stack>
  );
}
