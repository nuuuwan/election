import { Box, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import { ResultSingleView, PDSelector } from "../../molecules";

export default function ColumnResults({
  election,
  electionDisplay,
  db,
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
          db={db}
          setActivePDID={setActivePDID}
        />
      </Box>
      <ResultSingleView
        election={election}
        elections={db.elections}
        entID={activePDID}
      />
    </Box>
  );
}
