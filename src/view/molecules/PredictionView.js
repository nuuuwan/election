import { ResultSingleView } from ".";

export default function PredictionView({ projectedElection, db }) {
  return (
    <ResultSingleView
      election={projectedElection}
      entID="LK"
      elections={db.elections}
    />
  );
}
