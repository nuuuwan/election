import { Grid2, Stack, Typography } from "@mui/material";
import { Format } from "../../nonview/base";
import { Bellwether, Election } from "../../nonview/core";
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
      <Typography variant="caption" sx={{ fontSize: "80%" }}>
        {Format.percentVotes(pWinner)}
      </Typography>
    </Stack>
  );
}

function BellwetherShortView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election, elections } = data;

  const { n, nSame, error } = Bellwether.getStats(elections, election, entID);

  return (
    <Stack direction="column" sx={{m: 0, p: 0}}>
      <Typography variant="body1" color="secondary">
        {nSame}/{n}
      </Typography>
      <Typography variant="body1" color="secondary">
        {error ? "±" + Format.percent(error) : ""}
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

  const previousElectionsDisplay = previousElections
    .map(function (previousElection) {
      return previousElection.getSubsetElectionByPDIDList(election.pdIDList);
    });

  return (
    <Stack direction="row" gap={0.1} sx={{  m:0.5, marginLeft: 2, marginRight: 2 }} alignItems="center">
    <Grid2 container alignItems="center">
      {previousElectionsDisplay.map(function (electionForRow, i) {
        return (
          <Grid2 key={i} sx={{width: 40}}>
            <HistoryViewRow electionForRow={electionForRow} entID={entID} />
          </Grid2>
        );
      })}
 <BellwetherShortView entID={entID} />
    </Grid2>
    </Stack>
  );
}
