import { Stack } from "@mui/material";
import SummaryView from "../../view/molecules/SummaryView";
import PartyToVotesView from "./PartyToVotesView/PartyToVotesView";
import { Party } from "../../nonview/core";
import { EntView } from "../../view/organisms";

export default function ResultSingleView({ result }) {
  if (!result) {
    return null;
  }
  const pdID = result.entID;
  const edID = pdID.substring(0, 5);
  const winningParty = Party.fromID(result.partyToVotes.winningPartyID);
  return (
    <Stack key={pdID} direction="column" gap={0}>
      <EntView entID={pdID} sx={{ color: winningParty.color }} />
      {pdID !== "LK" ? (
        <EntView
          entID={edID}
          sx={{ color: winningParty.color, fontSize: "150%" }}
        />
      ) : null}

      <PartyToVotesView partyToVotes={result.partyToVotes} />
      <SummaryView summary={result.summary} />
    </Stack>
  );
}
