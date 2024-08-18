import { Stack } from "@mui/material";
import { FinalOutcomeView, ResultSingleView } from ".";

export default function PredictionView({ electionDisplay, predictedElection, db }) {

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
        nResultsDisplay={electionDisplay.nResults}
      />
    </Stack>
  );
}
