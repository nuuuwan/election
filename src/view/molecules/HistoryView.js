import { Stack, Typography } from "@mui/material";
import { Color, Format } from "../../nonview/base";
import { Election, Party } from "../../nonview/core";
import { PartyView } from "../../view/atoms";
import { useDataContext } from "../../nonview/core/DataProvider";

function HistoryViewRow({ entID, electionForRow }) {
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
    <Stack direction="column" gap={0} sx={{ color, alignItems: "center" }}>
      <Typography variant="caption" sx={{ fontSize: "67%" }}>
        {electionForRow.year}
      </Typography>

      <PartyView partyID={winningPartyID} textColor={textColor} />
      <Typography variant="caption" sx={{ fontSize: "67%" }}>
        {Format.percentVotes(pWinner)}
      </Typography>
    </Stack>
  );
}

export default function HistoryView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, elections } = data;

  const previousElections = Election.getPreviousElectionsOfSameType(
    elections,
    electionDisplay
  );

  const previousElectionsDisplay = previousElections
    .map(function (previousElection) {
      return previousElection.getSubsetElectionByPDIDList(
        electionDisplay.pdIDList
      );
    })
    .reverse();

  return (
    <Stack direction="row" gap={0.5} >
      {previousElectionsDisplay.map(function (electionForRow, i) {
        return (
          <HistoryViewRow
            key={i}
            electionForRow={electionForRow}
            entID={entID}
          />
        );
      })}
    </Stack>
  );
}
