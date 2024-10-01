import { Stack, Typography } from "@mui/material";

import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import { EntType, Format, Translate } from "../../nonview";
import LabelledStat from "../base/LabelledStat";

export default function ResultsReleasedView({ entID }) {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, electionPrevious, entIdx } = data;

  const { nResultsTotal, nResultsReleased,  } =
    electionDisplay.getNResultsReleasedAndTotal(entID, entIdx, );
const pElectors = electionDisplay.getPElectors(entID, entIdx, electionPrevious)
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

  return (
    <Stack direction="row" alignItems="center" gap={3} sx={{ color: "gray" }}>
      <LabelledStat label="Results" stat={pdDetails} />

      {electionDisplay.baseEntType === EntType.ED ? null : (
        <LabelledStat label="Released" stat={Format.percent(pElectors)} />
      )}
    </Stack>
  );
}
