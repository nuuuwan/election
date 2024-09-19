import { Grid2, Stack, Typography } from "@mui/material";
import { Format } from "../../nonview/base";
import { Election } from "../../nonview/core";
import { PartyView } from "../../view/atoms";
import { useDataContext } from "../../nonview/core/DataProvider";

function HistoryViewRow({ entID, electionForRow }) {
  const result = electionForRow.getResult(entID);
  if (!result) {
    return null;
  }

  const winningPartyID = result.partyToVotes.winningPartyID;
  if (!winningPartyID) {
    return null;
  }

  const pWinner = result.partyToVotes.pWinner;
  const color = result.color;

  return (
    <Stack direction="column" gap={0} sx={{ color, alignItems: "center" }}>
      <Typography variant="caption" sx={{ fontSize: "64%", opacity: 0.5 }}>
        {electionForRow.year}
      </Typography>

      <PartyView partyID={winningPartyID} />
      <Typography variant="caption" sx={{ fontSize: "64%" }}>
        {Format.percent(pWinner)}
      </Typography>
    </Stack>
  );
}

export default function HistoryView({ entID }) {
  const data = useDataContext();
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

  return (
    <Stack direction="column" alignItems="center">
      {" "}
      <Grid2 container alignItems="center" gap={0.15}>
        {previousElectionsDisplay.map(function (electionForRow, i) {
          return (
            <Grid2 key={i} sx={{ width: "fit-content" }}>
              <HistoryViewRow electionForRow={electionForRow} entID={entID} />
            </Grid2>
          );
        })}
      </Grid2>
    </Stack>
  );
}
