import { Stack } from "@mui/material";
import PartyToVotesStatsView from "./PartyToVotesStatsView";
import { HistoryView } from "../../../view/molecules";
import { useDataContext } from "../../../nonview/core/DataProvider";
import PartyToVotesBarChart from "./PartyToVotesBarChart";

export default function PartyToVotesView({ entID, chartSize, result }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { elections } = data;
  const partyToVotes = result.partyToVotes;

  return (
    <Stack direction="column" gap={0}>
      <PartyToVotesBarChart partyToVotes={partyToVotes} chartSize={chartSize} title={entID} />
      <Stack direction="row" gap={4} sx={{ margin: "auto" }}>
        <PartyToVotesStatsView partyToVotes={partyToVotes} />
        {elections ? <HistoryView entID={entID} /> : null}
      </Stack>
    </Stack>
  );
}
