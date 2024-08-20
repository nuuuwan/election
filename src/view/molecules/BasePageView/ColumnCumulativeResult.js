import { Box, Typography } from "@mui/material";

import { ResultSingleView, CitationsView } from "..";
import { Format } from "../../../nonview/base";
import CustomStack from "./CustomStack";
export default function ColumnCumulativeResult({
  electionDisplay,
  db,
  projectedElection,
}) {
  const electorsReleased = electionDisplay.resultLK.summary.electors;
  const electorsProjected = projectedElection.resultLK.summary.electors;
  const pReleased = electorsReleased / electorsProjected;
  const subTitleProgress = `Cumulative Total (${Format.percent(
    pReleased
  )} released)`;

  return (
    <CustomStack>
      <Box color={electionDisplay.color}>
        <Typography variant="body1">{subTitleProgress}</Typography>
        <Typography variant="h4">Islandwide</Typography>
      </Box>
      <ResultSingleView
        election={electionDisplay}
        elections={db.elections}
        entID={"LK"}
      />

      <CitationsView />
    </CustomStack>
  );
}
