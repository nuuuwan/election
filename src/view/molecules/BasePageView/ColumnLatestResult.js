import { Box, Typography } from "@mui/material";
import { Translate } from "../../../nonview/base";
import {
  ResultSingleView,
  PDSelector,
  BellwetherView,
} from "../../../view/molecules";
import CustomStack from "./CustomStack";

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
    <CustomStack>
      <Typography variant="body1" color={color}>
        {Translate("Latest Result")} ({electionDisplay.nResults})
      </Typography>

      <Box>
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
        db={db}
      />
    </CustomStack>
  );
}
