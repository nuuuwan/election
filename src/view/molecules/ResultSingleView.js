import { Stack } from "@mui/material";
import SummaryView from "../../view/molecules/SummaryView";
import PartyToVotesView from "./PartyToVotesView";
import { Party } from "../../nonview/core";
import { EntView } from "../../view/organisms";

export default function ResultSingleView({ result }) {
  const winningParty = Party.fromID(result.partyToVotes.winningPartyID);
  return (
    <Stack direction="column" gap={0}>
      <EntView entID={result.entID} sx={{ color: winningParty.color }} />
      <PartyToVotesView partyToVotes={result.partyToVotes} />
      <SummaryView summary={result.summary} />
    </Stack>
  );
}
