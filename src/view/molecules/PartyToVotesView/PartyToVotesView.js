import { Stack } from "@mui/material";
import PartyToVotesPieChart from "./PartyToVotesPieChart";
import PartyToVotesStatsView from "./PartyToVotesStatsView";
import { HistoryView } from "../../../view/molecules";
import { useContext } from "react";
import { DataContext } from "../../../nonview/core";

export default function PartyToVotesView({ entID, chartSize, result }) {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { elections } = data;
  const partyToVotes = result.partyToVotes;

  return (
    <Stack direction="column" gap={0}>
      <PartyToVotesPieChart partyToVotes={partyToVotes} chartSize={chartSize} />
      <Stack direction="row" gap={4} sx={{ margin: "auto" }}>
        <PartyToVotesStatsView partyToVotes={partyToVotes} />
        {elections ? <HistoryView entID={entID} /> : null}
      </Stack>
    </Stack>
  );
}
