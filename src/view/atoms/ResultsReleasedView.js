import { Stack, Typography } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { Format, Translate } from "../../nonview/base";
import LabelledStat from "./LabelledStat";

export default function ResultsReleasedView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay,  electionPrevious, entIdx } = data;



  const { nResultsTotal, nResultsReleased, pElectors } =
    electionDisplay.getReleaseStats(entID, entIdx, electionPrevious);

  if (nResultsTotal <= 1) {
    return (
      <Typography variant="h6" color="gray">
        {Translate("Final")}
      </Typography>
    );
  }

  const pdDetails = (
    <Stack direction="row" alignItems="center">
      <Typography variant="h6">{nResultsReleased}</Typography>
      <Typography variant="h6" sx={{ opacity: 0.5 }}>
        /{nResultsTotal}
      </Typography>
    </Stack>
  );

  const isComplete = nResultsReleased === nResultsTotal;

  return (
    <Stack direction="row" alignItems="center" gap={3} sx={{ color: "gray" }}>
      <LabelledStat label="Results" stat={pdDetails} />
      <LabelledStat label="Released" stat={Format.percent(pElectors)} />
      {isComplete && "✓"}
    </Stack>
  );
}
