import { Stack } from "@mui/material";
import PartyToVotesStatsView from "./PartyToVotesStatsView";

import PartyToVotesPieChart from "./PartyToVotesPieChart";

export default function PartyToVotesView({ entID, result }) {
  const partyToVotes = result.partyToVotes;

  return (
    <Stack direction="column" gap={2} alignItems="center">
      <PartyToVotesPieChart partyToVotes={partyToVotes} title={entID} />

      <PartyToVotesStatsView partyToVotes={partyToVotes} />
    </Stack>
  );
}
