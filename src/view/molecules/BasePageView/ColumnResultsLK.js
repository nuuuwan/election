import { Box, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import { ResultSingleView } from "../../molecules";
export default function ColumnResultsLK({
  election,
  electionDisplay,
  elections,
}) {

  const subTitleProgress = `${electionDisplay.nResults}/${election.nResults} Results`;

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
        elections={elections}
        entID={"LK"}
      />
    </Box>
  );
}
