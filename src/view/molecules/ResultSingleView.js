import { Box, Stack, Typography } from "@mui/material";
import SummaryView from "../../view/molecules/SummaryView";
import PartyToVotesView from "./PartyToVotesView/PartyToVotesView";

export default function ResultSingleView({ result }) {
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
  const entID = result.entID;

  return (
    <Stack key={entID} direction="column" gap={0}>
      <SummaryView summary={result.summary} />
      <PartyToVotesView partyToVotes={result.partyToVotes} />
    </Stack>
  );
}
