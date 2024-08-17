import { Box, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import { HexagonMap } from "../../molecules";
export default function ColumnMap({
  pdIdx,
  subTitleProgress,
  resultsIdxDisplay,
  resultLKDisplay,
  result,
  setActivePDID,
}) {
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
        activeResult={result}
        setActivePDID={setActivePDID}
      />
    </Box>
  );
}
