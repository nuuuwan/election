import { Stack } from "@mui/material";
import PartyToVotesPieChart from "./PartyToVotesPieChart";
import PartyToVotesStatsView from "./PartyToVotesStatsView";
import { HistoryView } from "../../../view/molecules";
import { Result } from "../../../nonview/core";
export default function PartyToVotesView({
  election,
  entID,
  chartSize,
  elections,
  entIDs,
}) {
  let result;
  if (entIDs) {
    result = Result.fromList(
      entID,
      entIDs.map((entID) => election.resultsIdx[entID])
    );
  } else {
    result = election.resultsIdx[entID];
  }

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
            entIDs={entIDs}
          />
        ) : null}
      </Stack>
    </Stack>
  );
}
