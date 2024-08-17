import { Stack } from "@mui/material";
import SummaryView from "../../view/molecules/SummaryView";
import PartyToVotesView from "./PartyToVotesView/PartyToVotesView";

export default function ResultSingleView({
  election,
  elections,
  entID,
  chartSize,
}) {
  const result = election.resultsIdx[entID];

  if (!result) {
    return null;
  }

  return (
    <Stack direction="column" gap={0}>
      <SummaryView summary={result.summary} />
      <PartyToVotesView
        election={election}
        entID={entID}
        chartSize={chartSize}
        elections={elections}
      />
    </Stack>
  );
}
