import { Box, MenuItem, Select, Typography } from "@mui/material";
import { Election } from "../../nonview/core";

function toValue(election) {
  return JSON.stringify({
    electionType: election.electionType,
    date: election.date,
  });
}

function fromValue(value) {
  return JSON.parse(value);
}

export default function ElectionSelector({ selectedElection, setElection }) {
  const onChange = function (event) {
    const { electionType, date } = fromValue(event.target.value);
    setElection(electionType, date);
  };
  const sortedElections = Election.listAllNoLoad().sort((a, b) =>
    b.date.localeCompare(a.date)
  );
  return (
    <Box>
      <Select value={toValue(selectedElection)} onChange={onChange}>
        {sortedElections.map(function (election, i) {
          return (
            <MenuItem key={i} value={toValue(election)}>
              <Typography variant="h4">{election.title}</Typography>
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}
