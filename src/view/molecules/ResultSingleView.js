import { Stack } from "@mui/material";
import SummaryView from "../../view/molecules/SummaryView";
import PartyToVotesView from "./PartyToVotesView/PartyToVotesView";
import { useContext } from "react";
import { DataContext } from "../../nonview/core";

export default function ResultSingleView({
  entID,
  chartSize,
  isProjected = false,
}) {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }

  const { electionDisplay, projectedElection } = data;

  const result = (isProjected ? projectedElection : electionDisplay).getResult(
    entID
  );

  if (!result) {
    return null;
  }

  return (
    <Stack direction="column" gap={0}>
      <SummaryView summary={result.summary} />
      <PartyToVotesView result={result} entID={entID} chartSize={chartSize} />
    </Stack>
  );
}
