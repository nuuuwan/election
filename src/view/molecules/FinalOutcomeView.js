import { Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { PartyView } from "../atoms";

function Inner({ winningPartyID, pWinner, pUncertain }) {
  if (winningPartyID !== Party.UNCERTAIN.id) {
    if (pWinner > 0.5) {
      return (
        <>
          <PartyView partyID={winningPartyID} /> win projected
        </>
      );
    }

    if (pWinner + pUncertain < 0.5) {
      return <>2nd/3rd Preference Count Needed</>;
    }
  }

  if (pUncertain > 0.5) {
    return <>Too early to call</>;
  }

  return <>Too close call</>;
}

export default function FinalOutcomeView({ result }) {
  const winningPartyID = result.partyToVotes.winningPartyID;
  const pWinner = result.partyToVotes.pWinner;
  const pUncertain =
    result.partyToVotes.partyToPVotesSorted[Party.UNCERTAIN.id] || 0.0;

  return (
    <Typography variant="h6" sx={{ color: "gray" }}>
      <Inner
        winningPartyID={winningPartyID}
        pWinner={pWinner}
        pUncertain={pUncertain}
      />
    </Typography>
  );
}
