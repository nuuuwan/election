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
  const result = election.getResult(entID);
  const partyToVotes = result.partyToVotes;

  return (
    <Stack direction="column" gap={0}>
      <PartyToVotesPieChart partyToVotes={partyToVotes} chartSize={chartSize} />
      <Stack direction="row" gap={4} sx={{ margin: "auto" }}>
        <PartyToVotesStatsView partyToVotes={partyToVotes} election={election} />
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
