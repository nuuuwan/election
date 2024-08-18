import { Stack } from "@mui/material";
import { FinalOutcomeView, ResultSingleView } from ".";

export default function PredictionView({ electionDisplay, projectedElection, db }) {

  return (
    <Stack direction="column" gap={2}>
      <ResultSingleView
        election={projectedElection}
        entID="LK"
        chartSize={140}
        elections={db.elections}
      />
      <FinalOutcomeView
        election={projectedElection}
        nResultsDisplay={electionDisplay.nResults}
      />
    </Stack>
  );
}
