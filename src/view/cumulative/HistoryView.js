import { Grid2, Stack, Typography } from '@mui/material';
import { Format } from '../../nonview';

import {
  CustomLoadingProgress,
  ExternalMediaCustomData,
  PartyView,
} from '../../view';

import { useDataSlowContext } from '../../nonview/core/DataSlowProvider';

function HistoryViewRow({ entID, electionForRow }) {
  let result = null;
  try {
    result = electionForRow.getResult(entID);
  } catch (error) {
    result = null;
  }
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
    <Stack direction="column" gap={0} sx={{ color, alignItems: 'center' }}>
      <Typography variant="caption" sx={{ opacity: 0.5 }}>
        {electionForRow.year}
      </Typography>
      <PartyView partyID={winningPartyID} />
      <Typography variant="caption">{Format.percent(pWinner)}</Typography>
    </Stack>
  );
}

function getCustomData({ entID, previousElectionsDisplay }) {
  return {
    yearToWinningParty: Object.fromEntries(
      previousElectionsDisplay
        .map(function (electionForRow) {
          const electionYear = electionForRow.year;
          const result = electionForRow.getResultSafe(entID);
          if (!result) {
            return null;
          }
          const winningPartyID = result.partyToVotes.winningPartyID;
          return [electionYear, winningPartyID];
        })
        .filter(function (x) {
          return x;
        }),
    ),
  };
}

export default function HistoryView({ entID }) {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { election, electionHistory } = data;
  const previousElections = electionHistory.previousElectionList;

  const previousElectionsDisplay = previousElections
    .map(function (previousElection) {
      return previousElection.getSubsetElectionByEntIDList(
        election.baseEntIDList,
      );
    })
    .reverse();

  return (
    <Stack direction="column" alignItems="center">
      <Grid2 container alignItems="center" gap={0.15}>
        <ExternalMediaCustomData
          customData={getCustomData({ entID, previousElectionsDisplay })}
        />
        {previousElectionsDisplay.map(function (electionForRow, i) {
          return (
            <Grid2 key={i} sx={{ width: 'fit-content' }}>
              <HistoryViewRow electionForRow={electionForRow} entID={entID} />
            </Grid2>
          );
        })}
      </Grid2>
    </Stack>
  );
}
