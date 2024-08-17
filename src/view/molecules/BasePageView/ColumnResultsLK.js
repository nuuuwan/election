import { Box, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import { ResultSingleView } from "../../molecules";
export default function ColumnResultsLK({
  election,
  elections,
  resultLKDisplay,
  subTitleProgress,
  resultDisplayPDIDs,
}) {
  return (
    <Box color={STYLE.COLOR.LIGHT}>
      <Box
        sx={Object.assign({}, STYLE.BODY_HEADER, {
          color: resultLKDisplay.winningPartyColor,
        })}
      >
        <Typography variant="caption">{subTitleProgress}</Typography>
        <Typography variant="h4">Islandwide</Typography>
      </Box>
      <ResultSingleView
        election={election}
        elections={elections}
        entID={"LK"}
        entIDs={resultDisplayPDIDs}
      />
    </Box>
  );
}
