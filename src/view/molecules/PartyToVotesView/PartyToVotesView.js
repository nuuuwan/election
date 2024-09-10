import { Stack } from "@mui/material";
import PartyToVotesStatsView from "./PartyToVotesStatsView";
import { HistoryView } from "../../../view/molecules";
import { useDataContext } from "../../../nonview/core/DataProvider";
import PartyToVotesPieChart from "./PartyToVotesPieChart";

export default function PartyToVotesView({ entID, chartSize, result }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { elections } = data;
  const partyToVotes = result.partyToVotes;

  return (
    <Stack direction="column" gap={0} alignItems="center">
      <PartyToVotesPieChart
        partyToVotes={partyToVotes}
        chartSize={chartSize}
        title={entID}
      />

        <PartyToVotesStatsView partyToVotes={partyToVotes} />
        {elections ? <HistoryView entID={entID} /> : null}

    </Stack>
  );
}
