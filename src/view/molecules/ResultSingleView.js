import { Stack, Typography } from "@mui/material";
import SummaryView from "../../view/molecules/SummaryView";
import PartyToVotesView from "./PartyToVotesView";
import { Party } from "../../nonview/core";
export default function ResultSingleView({ result }) {
  const winningParty = Party.fromID(result.partyToVotes.winningPartyID);
  return (
    <Stack direction="column">
      <Typography variant="h3" color={winningParty.color}>
        {result.entityID}
      </Typography>
      <PartyToVotesView partyToVotes={result.partyToVotes} />
      <SummaryView summary={result.summary} />
    </Stack>
  );
}
