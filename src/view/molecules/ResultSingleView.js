import { Box, Stack, Typography } from "@mui/material";
import SummaryView from "../../view/molecules/SummaryView";
import PartyToVotesView from "./PartyToVotesView/PartyToVotesView";

export default function ResultSingleView({ election, elections, entID, entIDs, chartSize }) {
  const result = election.resultsIdx[entID];
  if (!result) {
    return null;
  }
  if (result.summary.valid === 0) {
    return (
      <Box>
        <Typography variant="h6">No Results to Aggregate.</Typography>
      </Box>
    );
  }

  return (
    <Stack direction="column" gap={0}>
      <SummaryView summary={result.summary} />
      <PartyToVotesView
        election={election}
        entID={entID}
        chartSize={chartSize}
        elections={elections}
        entIDs={entIDs}
      />
    </Stack>
  );
}
