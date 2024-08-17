import { Box, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import { ResultSingleView, PDSelector } from "../../molecules";

export default function ColumnResults({
  election,
  electionDisplay,
  pdIdx,
  edIdx,
  elections,
  setActivePDID,
}) {
  if (electionDisplay.nResults === 0) {
    return (
      <Box>
        <Typography variant="h6">No results released.</Typography>
      </Box>
    );
  }

  const activePDID = electionDisplay.finalPDID;

  return (
    <Box>
      <Box sx={STYLE.BODY_HEADER}>
        <PDSelector
          election={election}
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
