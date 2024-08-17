import { Stack } from "@mui/material";
import { ElectionModel } from "../../nonview/core";
import { FinalOutcomeView, ResultSingleView } from ".";

export default function PredictionView({
  activeElection,
  electionDisplay,
  elections,
  pdIdx,
}) {
  const nResultsDisplay = electionDisplay.nResults;
  const releasedPDIDList = activeElection.pdIDList;
  const nonReleasedPDIDList = Object.keys(pdIdx).filter(
    (pdID) => !releasedPDIDList.includes(pdID)
  );

  const electionModel = new ElectionModel(
    elections,
    activeElection,
    releasedPDIDList,
    nonReleasedPDIDList
  );
  const predictedElection = electionModel.getElectionNotReleasedPrediction();

  return (
    <Stack direction="column" gap={2}>
      <ResultSingleView
        election={predictedElection}
        entID="LK"
        chartSize={140}
        elections={elections}
      />
      <FinalOutcomeView
        election={predictedElection}
        nResultsDisplay={nResultsDisplay}
      />
    </Stack>
  );
}
