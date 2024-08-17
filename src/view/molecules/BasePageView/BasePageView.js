import { Box } from "@mui/material";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import PageFooter from "./PageFooter";

export default function BasePageView({
  election,
  isPlaying,
  //
  electionDisplay,
  db,
  //
  pauseAnimation,
  playAnimation,
  setActivePDID,
  setElection,
  setNResultsDisplay,
}) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <PageHeader
        electionDisplay={electionDisplay}
        db={db}
        setElection={setElection}
      />
      <PageBody
        election={election}
        electionDisplay={electionDisplay}
        //
        db={db}
        //
        setActivePDID={setActivePDID}
      />
      <PageFooter
        electionDisplay={electionDisplay}
        election={election}
        isPlaying={isPlaying}
        //
        playAnimation={playAnimation}
        pauseAnimation={pauseAnimation}
        setNResultsDisplay={setNResultsDisplay}
      />
    </Box>
  );
}
