import { Stack } from "@mui/material";
import SummaryView from "../../view/molecules/SummaryView";
import PartyToVotesView from "./PartyToVotesView/PartyToVotesView";
import { useDataContext } from "../../nonview/core/DataProvider";

export default function ResultSingleView({
  entID,
  chartSize,
  isProjected = false,
}) {
  const data = useDataContext();
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
    <Stack direction="column" gap={2}>
      <SummaryView summary={result.summary} />
      <PartyToVotesView result={result} entID={entID} chartSize={chartSize} />
    </Stack>
  );
}
