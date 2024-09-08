import { useContext } from "react";
import { ResultSingleView } from ".";
import { DataContext } from "../../nonview/core";

export default function PredictionView({ projectedElection }) {
  const db = useContext(DataContext);
  if (!db) {
    return null;
  }
  return (
    <ResultSingleView
      election={projectedElection}
      entID="LK"
      elections={db.elections}
    />
  );
}
