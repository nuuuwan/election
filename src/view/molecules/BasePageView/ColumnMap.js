import { Box, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import { HexagonMap } from "../../molecules";
export default function ColumnMap({
  election,
  electionDisplay,
  db,
  setActivePDID,
}) {
  const resultLKDisplay = electionDisplay.resultLK;
  const subTitleProgress = `${electionDisplay.nResults}/${election.nResults} Results`;

  return (
    <Box color={STYLE.COLOR.LIGHT}>
      <Box
        sx={Object.assign({}, STYLE.BODY_HEADER, {
          color: resultLKDisplay.winningPartyColor,
        })}
      >
        <Typography variant="caption">{subTitleProgress}</Typography>
        <Typography variant="h4">Maps</Typography>
      </Box>
      <HexagonMap
        election={electionDisplay}
        db={db}
        setActivePDID={setActivePDID}
      />
    </Box>
  );
}
