import { Box, Stack, Typography } from "@mui/material";

import { CustomSelect } from "../atoms";

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
        renderMenuItemInner={function (election, i) {
          const color = election.color;

          return (
            <Stack direction="column" gap={0}>
              <Typography variant="h4" color={color}>
                {election.title}
              </Typography>
              <Typography variant="caption" color={color}>
                {new Date(election.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </Typography>
            </Stack>
          );
        }}
        getDividerKey={function (election) {
          return election.date.substring(0, 3);
        }}
        reverse={true}
      ></CustomSelect>
    </Box>
  );
}
