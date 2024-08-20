import { Box, Typography } from "@mui/material";

import { HexagonMap } from "../../molecules";

import CustomStack from "./CustomStack";

export default function ColumnMap({
  election,
  electionDisplay,
  db,
  setActivePDID,
}) {
  const resultLKDisplay = electionDisplay.resultLK;
  const subTitleProgress = `${electionDisplay.nResults}/${election.nResults} Results`;

  return (
    <CustomStack>
      <Box
        sx={{
          color: resultLKDisplay.winningPartyColor,
        }}
      >
        <Typography variant="caption">{subTitleProgress}</Typography>
        <Typography variant="h4">Maps</Typography>
      </Box>
      <HexagonMap
        election={electionDisplay}
        db={db}
        setActivePDID={setActivePDID}
      />
    </CustomStack>
  );
}
