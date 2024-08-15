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

  let resultsLK = undefined;

  const electionModel = new ElectionModel(
    elections,
    activeElection,
    releasedPDIDList,
    nonReleasedPDIDList
  );
  const predictedElection = electionModel.getElectionNotReleasedPrediction();
  resultsLK = predictedElection.resultsIdx["LK"];

  return (
    <Stack direction="column" gap={0.25}>
      <ResultSingleView result={resultsLK} chartSize={150} />
      <FinalOutcomeView result={resultsLK} nResultsDisplay={nResultsDisplay} />
    </Stack>
  );
}
