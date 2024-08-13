import { Box, MenuItem, Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { CustomSelect } from "../atoms";

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
  return (
    <Box>
      <CustomSelect
        value={selectedElection}
        onChange={setElection}
        dataList={elections}
        getID={function (election) {
          return election.date;
        }}
        renderMenuItemInner={function (election, i) {
          let color = "#888";
          if (election.resultsIdx) {
            const resultLK = election.resultsIdx["LK"];
            const winningPartyID = resultLK.partyToVotes.winningPartyID;
            color = Party.fromID(winningPartyID).color;
          }

          return (
            <Typography variant="h5" color={color}>
              {election.title}
            </Typography>
          );
        }}
        getDividerKey={function (election) {
          return election.date.substring(0, 3);
        }}
      ></CustomSelect>
    </Box>
  );
}
