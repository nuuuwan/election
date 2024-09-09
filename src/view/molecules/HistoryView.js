import { Stack, Typography } from "@mui/material";
import { Color, Format } from "../../nonview/base";
import { DataContext, Election, Party } from "../../nonview/core";
import { PartyView } from "../../view/atoms";
import { useContext } from "react";

const N_DISPLAY = 3;

function HistoryViewRow({  entID,electionForRow }) {


  const result = electionForRow.getResult(entID);
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
        {electionForRow.year}
      </Typography>

      <PartyView
        partyID={winningPartyID}
        textColor={textColor}

      />
      <Typography variant="caption">{Format.percentVotes(pWinner)}</Typography>
    </Stack>
  );
}

export default function HistoryView({  entID }) {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { election, elections } = data;

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
      {displayElections.map(function (electionForRow, i) {
        return <HistoryViewRow key={i} electionForRow={electionForRow} entID={entID} />;
      })}
    </Stack>
  );
}
