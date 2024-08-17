import { Box, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import { ResultSingleView, PDSelector } from "../../molecules";

export default function ColumnResults({
  activePDID,
  pdIdx,
  edIdx,
  election,
  elections,
  resultsIdx,
  setActivePDID,
}) {
  if (!activePDID) {
    return (
      <Box>
        <Typography variant="h6">No results released.</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Box sx={STYLE.BODY_HEADER}>
        <PDSelector
          resultsIdx={resultsIdx}
          activePDID={activePDID}
          pdIdx={pdIdx}
          edIdx={edIdx}
          setActivePDID={setActivePDID}
        />
      </Box>
      <ResultSingleView
        election={election}
        elections={elections}
        entID={activePDID}
      />
    </Box>
  );
}
