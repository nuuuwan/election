import { Box } from "@mui/material";
import { CitationsView, PlayerControl } from "../../../view/molecules";
import { STYLE } from "../../../nonview/constants";


const STYLE_FOOTER = {
  BOX: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2000,
    backgroundColor: STYLE.COLOR.LIGHTEST,
    padding: 1,
  },
}

export default function PageFooter({
  electionDisplay,
  election,
  //
  setNResultsDisplay,
}) {
  return (
    <Box sx={STYLE_FOOTER.BOX}>
    <CitationsView />
    <PlayerControl
      key={electionDisplay.nResults}
      electionDisplay={electionDisplay}
      election={election}
      setNResultsDisplay={setNResultsDisplay}
    />
    </Box>
  );
}
