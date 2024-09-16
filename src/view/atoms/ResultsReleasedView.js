import { Stack, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useDataContext } from "../../nonview/core/DataProvider";
import { Format, Translate } from "../../nonview/base";
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
    return (
      <Typography variant="h6" sx={{ opacity: 0.2 }}>
        {Translate("Final Result")}
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
  const color = electionDisplay.resultIdx[entID].color;

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={3}
      sx={{ color: "gray" }}
    >
      <LabelledStat label="Results" stat={pdDetails} />
      <LabelledStat label="Votes" stat={Format.percent(pElectors)} />
      {isComplete && <CheckCircleIcon sx={{color}} />}
    </Stack>
  );
}
