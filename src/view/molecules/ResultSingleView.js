import { Stack, Typography } from "@mui/material";
import SummaryView from "../../view/molecules/SummaryView";
import PartyToVotesView from "./PartyToVotesView/PartyToVotesView";
import { Party } from "../../nonview/core";
import { EntView } from "../../view/organisms";

export default function ResultSingleView({ result, superTitle }) {
  if (!result) {
    return null;
  }
  const entID = result.entID;
  const winningParty = Party.fromID(result.partyToVotes.winningPartyID);
  return (
    <Stack key={entID} direction="column" gap={1}>
      <Typography
        variant="body1"
        sx={{
          color: winningParty.color,
          textTransform: "uppercase",
        }}
      >
        {superTitle}
      </Typography>
      <EntView
        entID={entID}
        sx={{
          backgroundColor: winningParty.color,
          color: "white",
          p: 0.5,
          borderRadius: 2,
        }}
      />
      <SummaryView summary={result.summary} />
      <PartyToVotesView partyToVotes={result.partyToVotes} />
    </Stack>
  );
}
