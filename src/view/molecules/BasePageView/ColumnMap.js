import { Box, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import { HexagonMap } from "../../molecules";
export default function ColumnMap({
  election,
  electionDisplay,
  pdIdx,
  setActivePDID,
}) {
  const resultLKDisplay = electionDisplay.resultLK;
  const resultsIdxDisplay = electionDisplay.resultsIdx;
  const subTitleProgress = `${electionDisplay.nResults}/${election.nResults} Results`;

  return (
    <Box color={STYLE.COLOR.LIGHT}>
      <Box
        sx={Object.assign({}, STYLE.BODY_HEADER, {
          color: resultLKDisplay.winningPartyColor,
        })}
      >
        <Typography variant="caption">{subTitleProgress}</Typography>
        <Typography variant="h4">The Map</Typography>
      </Box>
      <HexagonMap
        resultsIdx={resultsIdxDisplay}
        pdIdx={pdIdx}
        setActivePDID={setActivePDID}
      />
    </Box>
  );
}
