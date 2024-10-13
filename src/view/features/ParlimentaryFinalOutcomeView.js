import { Box, Typography } from "@mui/material";

import { Seats, Translate } from "../../nonview";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import CustomLoadingProgress from "../base/CustomLoadingProgress";

function getMessage(nSeats) {
  if (nSeats >= 150) {
    return "⅔ Majority";
  }
  if (nSeats >= 113) {
    return "Simple Majority";
  }
  return "Plurality";
}

class ParliamentaryFinalOutcome {
  constructor(election) {
    this.election = election;
  }

  commonCompute() {
    const resultLK = this.election.resultLK;
    const winningPartyID = resultLK.partyToVotes.winningPartyID;
    const secondPartyID = Object.keys(resultLK.partyToVotes.partyToVotes)[1];

    const seats = Seats.fromElection(this.election);
    const partyToSeats = seats.getTotalPartyToSeats();
    const nSeatsMin = partyToSeats[winningPartyID];
    const nSeats2ndMax =
      partyToSeats[secondPartyID] + (seats.getPartyToUFG()[secondPartyID] || 0);

    return { nSeatsMin, nSeats2ndMax, seats, winningPartyID };
  }

  get isTooCloseToCall() {
    const { nSeatsMin, nSeats2ndMax } = this.commonCompute();
    return nSeats2ndMax >= nSeatsMin;
  }

  get outcomeMessage() {
    const { seats, winningPartyID, nSeatsMin } = this.commonCompute();

    const ufg = seats.getPartyToUFG()[winningPartyID] || 0;
    const nSeatsBest = nSeatsMin + ufg;

    const messageMin = getMessage(nSeatsMin);
    const messageMax = getMessage(nSeatsBest);

    let message;
    if (messageMin === messageMax) {
      message = ` a ${messageMin}`;
    } else {
      message = `, at worst a ${messageMin}, and at best a ${messageMax}`;
    }

    return Translate("%1 projected to win%2", [
      winningPartyID,
      Translate(message),
    ]);
  }
}

export default function ParliamentaryFinalOutcomeView() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionProjected } = data;
  if (!electionProjected) {
    return null;
  }

  const finalOutcome = new ParliamentaryFinalOutcome(electionProjected);

  if (finalOutcome.isTooCloseToCall) {
    return (
      <Box>
        <Typography variant="h5">{Translate("Too close to call.")}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5">{finalOutcome.outcomeMessage}</Typography>
    </Box>
  );
}
