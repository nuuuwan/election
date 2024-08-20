import { Stack } from "@mui/material";
import { ResultSingleView } from ".";

export default function PredictionView({ projectedElection, db }) {
  return (
    <Stack direction="column" gap={0}>
      <ResultSingleView
        election={projectedElection}
        entID="LK"
        elections={db.elections}
      />
    </Stack>
  );
}
