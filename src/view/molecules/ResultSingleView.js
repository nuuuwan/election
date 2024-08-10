import { Stack, Typography } from "@mui/material";
import SummaryView from "../../view/molecules/SummaryView";
import PartyToVotesView from "./PartyToVotesView";
export default function ResultSingleView({ result }) {
  return (
    <Stack direction="column">
      <Typography variant="h3">{result.entityID}</Typography>
      <PartyToVotesView partyToVotes={result.partyToVotes} />
      <SummaryView summary={result.summary} />
    </Stack>
  );
}
