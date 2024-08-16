import { Stack } from "@mui/material";
import PartyToVotesPieChart from "./PartyToVotesPieChart";
import PartyToVotesStatsView from "./PartyToVotesStatsView";
import {HistoryView} from "../../../view/molecules"
export default function PartyToVotesView({ election, entID, chartSize , elections, entIDs}) {
  const partyToVotes = election.resultsIdx[entID].partyToVotes;

  return (
    <Stack direction="column" gap={0.1}>
      <PartyToVotesPieChart partyToVotes={partyToVotes} chartSize={chartSize} />
      <Stack direction="row" gap={2} sx={{margin: "auto"}}>
      <PartyToVotesStatsView partyToVotes={partyToVotes} />
      {elections ? (<HistoryView elections={elections} election={election} entID={entID} entIDs={entIDs} />): null}
      </Stack >
    </Stack>
  );
}
