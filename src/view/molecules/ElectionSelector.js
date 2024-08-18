import { Box, Stack, Typography } from "@mui/material";

import { CustomSelect } from "../atoms";

function renderMenuItemInner(election, i) {
  const color = election.color;
  return (
    <Stack direction="column" gap={0}>
      <Typography variant="h4" color={color}>
        {election.title}
      </Typography>
    </Stack>
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
        renderMenuItemInner={renderMenuItemInner}
        getDividerKey={function (election) {
          return election.date.substring(0, 3);
        }}
        reverse={true}
      ></CustomSelect>
    </Box>
  );
}
