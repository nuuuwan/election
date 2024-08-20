import { Box, Stack, Typography } from "@mui/material";
import { STYLE } from "../../../nonview/constants";
import { ResultSingleView, CitationsView } from "..";
import { Format } from "../../../nonview/base";

export default function ColumnCumulativeResult({
  election,
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
    <Stack direction="column" gap={1}>
      <Box
        sx={{
          color: electionDisplay.resultLK.winningPartyColor,
        }}
      >
        <Typography variant="caption">{subTitleProgress}</Typography>
        <Typography variant="h4">Islandwide</Typography>
      </Box>
      <ResultSingleView
        election={electionDisplay}
        elections={db.elections}
        entID={"LK"}
      />

      <CitationsView />
    </Stack>
  );
}
