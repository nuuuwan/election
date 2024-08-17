import { Stack, Typography } from "@mui/material";
import { Format } from "../../nonview/base";
import { Election, Party } from "../../nonview/core";
import { PartyView } from "../../view/atoms";

const N_DISPLAY = 3;

function HistoryViewRow({ election, entID, i, entIDs }) {
  const result = election.resultsIdx[entID];
  const opacity = (1 - i / N_DISPLAY) * 0.25 + 0.5;
  const winningPartyID = result.partyToVotes.winningPartyID;
  const pWinner = result.partyToVotes.pWinner;
  const color = Party.fromID(winningPartyID).color;

  return (
    <Stack
      direction="column"
      gap={0}
      sx={{ opacity, color, alignItems: "center" }}
    >
      <Typography variant="caption" sx={{ fontSize: "50%" }}>
        {election.year}
      </Typography>

      <PartyView partyID={winningPartyID} />
      <Typography variant="caption">{Format.percentVotes(pWinner)}</Typography>
    </Stack>
  );
}

export default function HistoryView({ elections, election, entID, entIDs }) {
  const previousElections = Election.getPreviousElectionsOfSameType(
    elections,
    election
  )
    .reverse()
    .slice(0, N_DISPLAY);
  return (
    <Stack direction="column" gap={1}>
      {previousElections.map(function (election, i) {
        return (
          <HistoryViewRow
            key={i}
            election={election}
            entID={entID}
            i={i}
            entIDs={entIDs}
          />
        );
      })}
    </Stack>
  );
}
