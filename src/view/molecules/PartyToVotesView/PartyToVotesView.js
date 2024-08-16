import { Stack } from "@mui/material";
import PartyToVotesPieChart from "./PartyToVotesPieChart";
import PartyToVotesStatsView from "./PartyToVotesStatsView";

export default function PartyToVotesView({ partyToVotes, chartSize }) {
  return (
    <Stack direction="column" gap={0.1}>
      <PartyToVotesPieChart partyToVotes={partyToVotes} chartSize={chartSize} />
      <PartyToVotesStatsView partyToVotes={partyToVotes} />
    </Stack>
  );
}
