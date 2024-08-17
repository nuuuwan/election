import { Stack } from "@mui/material";
import { ElectionModel } from "../../nonview/core";
import { FinalOutcomeView, ResultSingleView } from ".";

export default function PredictionView({
  activeElection,
  electionDisplay,
  db,
}) {
  const nResultsDisplay = electionDisplay.nResults;
  const releasedPDIDList = activeElection.pdIDList;
  const nonReleasedPDIDList = Object.keys(db.pdIdx).filter(
    (pdID) => !releasedPDIDList.includes(pdID)
  );

  const electionModel = new ElectionModel(
    db.elections,
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
        elections={db.elections}
      />
      <FinalOutcomeView
        election={predictedElection}
        nResultsDisplay={nResultsDisplay}
      />
    </Stack>
  );
}
