import { Stack, Typography } from "@mui/material";
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
    return <Typography variant="h6" sx={{opacity: 0.2}}>{Translate("Final Result")}</Typography>;
  }

  const isComplete = nResultsReleased === nResultsTotal;
  const opacity = isComplete ? 0.2 : 1;

  const pdDetails = (
    <Stack direction="row" alignItems="center">
      <Typography variant="h6">{nResultsReleased}</Typography>
      <Typography variant="h6" sx={{ opacity: 0.5 }}>
        /{nResultsTotal}
      </Typography>
    </Stack>
  );

  return (
    <Stack direction="row" alignItems="center" gap={3} sx={{opacity, color: "black"}}>
      <LabelledStat label="Results" stat={pdDetails} />
      <LabelledStat label="Votes" stat={Format.percent(pElectors)} />
    </Stack>
  );
}
