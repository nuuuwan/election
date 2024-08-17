import { Stack } from "@mui/material";
import { ElectionModel } from "../../nonview/core";
import { FinalOutcomeView, ResultSingleView } from ".";

export default function PredictionView({
  activeElection,
  nResultsDisplay,
  elections,
  pdIdx,
}) {
  const pdResultsList = activeElection.pdResultsList;

  const releasedPDIDList = pdResultsList
    .slice(0, nResultsDisplay + 1)
    .map((result) => result.entID);
  const nonReleasedPDIDList = Object.keys(pdIdx).filter(
    (pdID) => !releasedPDIDList.includes(pdID)
  );

  let resultLK = undefined;

  const electionModel = new ElectionModel(
    elections,
    activeElection,
    releasedPDIDList,
    nonReleasedPDIDList
  );
  const predictedElection = electionModel.getElectionNotReleasedPrediction();
  resultLK = predictedElection.resultLK;

  return (
    <Stack direction="column" gap={2}>
      <ResultSingleView
        election={predictedElection}
        entID="LK"
        chartSize={140}
        elections={elections}
      />
      <FinalOutcomeView result={resultLK} nResultsDisplay={nResultsDisplay} />
    </Stack>
  );
}
