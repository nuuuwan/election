import { Box, Typography } from "@mui/material";

import { CustomSelect } from "../atoms";

function renderValue(election, i) {
  const color = election.color;
  return (
    <Typography variant="h4" sx={{ color: "white", backgroundColor: color }}>
      {election.title}
    </Typography>
  );
}

function renderMenuItemInner(election, i) {
  const color = election.color;
  return (
    <Typography variant="h6" sx={{ color }}>
      {election.title}
    </Typography>
  );
}

export default function ElectionSelector({
  selectedElection,
  elections,
  setElection,
}) {
  const presidentialElections = elections.filter(
    (election) => election.electionType === "Presidential"
  );

  return (
    <Box>
      <CustomSelect
        value={selectedElection}
        onChange={setElection}
        dataList={presidentialElections}
        getID={function (election) {
          return election.date;
        }}
        renderValue={renderValue}
        renderMenuItemInner={renderMenuItemInner}
        getDividerKey={function (election) {
          return election.date.substring(0, 3);
        }}
        reverse={true}
      ></CustomSelect>
    </Box>
  );
}
