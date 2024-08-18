import { Box, Typography } from "@mui/material";
import { STYLE } from "../../../nonview/constants";
import { ResultSingleView, CitationsView } from "..";

export default function ColumnCumulativeResult({ election, electionDisplay, db }) {
  const subTitleProgress = `Cumulative Total (${electionDisplay.nResults}/${election.nResults})`;

  return (
    <Box color={STYLE.COLOR.LIGHT}>
      <Box
        sx={Object.assign({}, STYLE.BODY_HEADER, {
          color: electionDisplay.resultLK.winningPartyColor,
        })}
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
    </Box>
  );
}
