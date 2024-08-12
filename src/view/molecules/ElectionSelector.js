import { Box, Divider, MenuItem, Select, Typography } from "@mui/material";
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
  let prevDecade = undefined;
  return (
    <Box>
      <Select
        value={toValue(selectedElection)}
        onChange={onChange}
        sx={{
          border: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      >
        {sortedElections.reduce(function (innerItems, election, i) {
          let color = "#888";

          const decade = election.date.substring(0, 3);
          if (prevDecade !== decade && i !== 0) {
            innerItems.push(<Divider key={`divider-${i}`} />);
          }
          prevDecade = decade;

          if (election.resultsIdx) {
            const resultLK = election.resultsIdx["LK"];
            const winningPartyID = resultLK.partyToVotes.winningPartyID;
            color = Party.fromID(winningPartyID).color;
          }

          const innerItem = (
            <MenuItem key={i} value={toValue(election)} sx={{ color }}>
              <Typography variant="h5">{election.title}</Typography>
            </MenuItem>
          );
          innerItems.push(innerItem);

          return innerItems;
        }, [])}
      </Select>
    </Box>
  );
}
