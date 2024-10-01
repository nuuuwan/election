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

export default function ParliamentaryFinalOutcomeView() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }

  const { electionProjected } = data;
  const resultLK = electionProjected.resultLK;
  const winningPartyID = resultLK.partyToVotes.winningPartyID;
  const secondPartyID = Object.keys(resultLK.partyToVotes.partyToVotes)[1];

  const seats = Seats.fromElection(electionProjected);
  const partyToSeats = seats.partyToSeats;
  const nSeatsMin = partyToSeats[winningPartyID];
  const nSeats2ndMax =
    partyToSeats[secondPartyID] + (seats.partyToUFG[secondPartyID] || 0);

  if (nSeats2ndMax >= nSeatsMin) {
    return (
      <Box>
        <Typography variant="h5">{Translate("Too close to call.")}</Typography>
      </Box>
    );
  }

  const ufg = seats.partyToUFG[winningPartyID] || 0;
  const nSeatsBest = nSeatsMin + ufg;

  const messageMin = getMessage(nSeatsMin);
  const messageMax = getMessage(nSeatsBest);

  let message;
  if (messageMin === messageMax) {
    message = ` a ${messageMin}`;
  } else {
    message = `, at worst a ${messageMin}, and at best a ${messageMax}`;
  }

  return (
    <Box>
      <Typography variant="h5">
        {Translate("%1 projected to win%2", [
          winningPartyID,
          Translate(message),
        ])}
      </Typography>
    </Box>
  );
}
