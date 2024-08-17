import { Stack, Typography } from "@mui/material";
import { Color, Format } from "../../nonview/base";
import { Election, Party } from "../../nonview/core";
import { PartyView } from "../../view/atoms";

const N_DISPLAY = 3;

function HistoryViewRow({ election, entID }) {
  const result = election.resultsIdx[entID];
  if (!result) {
    return null;
  }

  const winningPartyID = result.partyToVotes.winningPartyID;
  const pWinner = result.partyToVotes.pWinner;
  const color = Party.fromID(winningPartyID).color;
  const opacity = Color.getOpacity(pWinner);
  const textColor = Color.getTextColor(color, opacity);

  return (
    <Stack
      direction="column"
      gap={0}
      sx={{ color, alignItems: "center", opacity }}
    >
      <Typography variant="caption" sx={{ fontSize: "50%" }}>
        {election.year}
      </Typography>

      <PartyView partyID={winningPartyID} textColor={textColor} />
      <Typography variant="caption">{Format.percentVotes(pWinner)}</Typography>
    </Stack>
  );
}

export default function HistoryView({ elections, election, entID }) {
  const previousElections = Election.getPreviousElectionsOfSameType(
    elections,
    election
  );

  const previousElectionsDisplay = previousElections.map(function (
    previousElection
  ) {
    return previousElection.getSubsetElectionByPDIDList(election.pdIDList);
  });

  const displayElections = previousElectionsDisplay
    .reverse()
    .slice(0, N_DISPLAY);

  return (
    <Stack direction="column" gap={1}>
      {displayElections.map(function (election, i) {
        return <HistoryViewRow key={i} election={election} entID={entID} />;
      })}
    </Stack>
  );
}
