import { Box, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import { ResultSingleView, PDSelector } from "..";
import BellwetherView from "../BellwetherView";

export default function ColumnLatestResult({
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
  const color = electionDisplay.getResult(activePDID).winningPartyColor;
  return (
    <Box>
      <Box sx={STYLE.BODY_HEADER}>
        <Typography variant="caption" component="div" color={color}>
          Latest Result ({electionDisplay.nResults})
        </Typography>
        <PDSelector
          election={election}
          activePDID={activePDID}
          db={db}
          setActivePDID={setActivePDID}
        />
      </Box>
      <ResultSingleView
        election={electionDisplay}
        elections={db.elections}
        entID={activePDID}
      />
      <BellwetherView
        elections={db.elections}
        electionDisplay={electionDisplay}
      />
    </Box>
  );
}
