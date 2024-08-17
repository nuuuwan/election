import { Box } from "@mui/material";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import PageFooter from "./PageFooter";

export default function BasePageView({
  activePDID,
  edIdx,
  election,
  elections,
  isPlaying,
  nResultsDisplay,
  nResultsReleased,
  pauseAnimation,
  pdIdx,
  playAnimation,
  result,
  resultDisplayPDIDs,
  resultLKDisplay,
  resultsIdx,
  resultsIdxDisplay,
  setActivePDID,
  setElection,
  setNResultsDisplay,
  subTitleProgress,
}) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <PageHeader
        election={election}
        elections={elections}
        nResultsDisplay={nResultsDisplay}
        setElection={setElection}
      />
      <PageBody
        election={election}
        elections={elections}
        nResultsDisplay={nResultsDisplay}
        activePDID={activePDID}
        pdIdx={pdIdx}
        edIdx={edIdx}
        subTitleProgress={subTitleProgress}
        resultsIdxDisplay={resultsIdxDisplay}
        resultLKDisplay={resultLKDisplay}
        result={result}
        setActivePDID={setActivePDID}
        resultsIdx={resultsIdx}
        resultDisplayPDIDs={resultDisplayPDIDs}
      />
      <PageFooter
        nResultsDisplay={nResultsDisplay}
        isPlaying={isPlaying}
        playAnimation={playAnimation}
        pauseAnimation={pauseAnimation}
        nResultsReleased={nResultsReleased}
        setNResultsDisplay={setNResultsDisplay}
      />
    </Box>
  );
}
