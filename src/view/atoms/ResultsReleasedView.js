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

  const { nResultsTotal, nResultsReleased, pElectors } =
    electionDisplay.getReleaseStats(entID, pdIdx, electionPrevious);

  if (nResultsTotal <= 1) {
    return null;
  }

  const pdDetails = (
    <Stack direction="row" alignItems="center">
      <Typography variant="h6">{nResultsReleased}</Typography>
      <Typography variant="h6" sx={{ opacity: 0.5 }}>
        /{nResultsTotal}
      </Typography>
    </Stack>
  );

  return (
    <Stack direction="row" alignItems="center" gap={1} sx={{ color: "gray" }}>
      <LabelledStat label="Results" valueStr={pdDetails} />
      <LabelledStat label="Votes" valueStr={Format.percent(pElectors)} />
    </Stack>
  );
}
