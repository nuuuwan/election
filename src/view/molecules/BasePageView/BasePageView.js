import { Box } from "@mui/material";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import PageFooter from "./PageFooter";

export default function BasePageView({
  election,
  isPlaying,
  //
  electionDisplay,
  edIdx,
  pdIdx,
  elections,
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
        elections={elections}
        setElection={setElection}
      />
      <PageBody
        election={election}
        electionDisplay={electionDisplay}
        //
        elections={elections}
        pdIdx={pdIdx}
        edIdx={edIdx}
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
