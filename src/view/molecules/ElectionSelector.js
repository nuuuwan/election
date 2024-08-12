import { Box, MenuItem, Select, Typography } from "@mui/material";
import { Party } from "../../nonview/core";

function toValue(election) {
  return JSON.stringify({
    electionType: election.electionType,
    date: election.date,
  });
}

function fromValue(value) {
  return JSON.parse(value);
}

export default function ElectionSelector({
  selectedElection,
  elections,
  setElection,
}) {
  const onChange = function (event) {
    const { electionType, date } = fromValue(event.target.value);
    setElection(electionType, date);
  };
  const sortedElections = elections.sort((a, b) =>
    b.date.localeCompare(a.date)
  );
  return (
    <Box>
      <Select value={toValue(selectedElection)} onChange={onChange}>
        {sortedElections.map(function (election, i) {
          let color = "#888";
          if (election.resultsIdx) {
            const resultLK = election.resultsIdx["LK"];
            const winningPartyID = resultLK.partyToVotes.winningPartyID;
            color = Party.fromID(winningPartyID).color;
          }

          return (
            <MenuItem key={i} value={toValue(election)} sx={{ color }}>
              <Typography variant="h4">{election.title}</Typography>
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}
