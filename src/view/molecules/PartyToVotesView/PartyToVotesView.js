import { Stack } from "@mui/material";
import PartyToVotesPieChart from "./PartyToVotesPieChart";
import PartyToVotesStatsView from "./PartyToVotesStatsView";
import { HistoryView } from "../../../view/molecules";

export default function PartyToVotesView({
  election,
  entID,
  chartSize,
  elections,
}) {
  const result = election.resultIdx[entID];
  const partyToVotes = result.partyToVotes;

  return (
    <Stack direction="column" gap={0}>
      <PartyToVotesPieChart partyToVotes={partyToVotes} chartSize={chartSize} />
      <Stack direction="row" gap={4} sx={{ margin: "auto" }}>
        <PartyToVotesStatsView partyToVotes={partyToVotes} />
        {elections ? (
          <HistoryView
            elections={elections}
            election={election}
            entID={entID}
          />
        ) : null}
      </Stack>
    </Stack>
  );
}
