import { Box, Typography } from "@mui/material";

import { CustomSelect } from "../atoms";

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
          const color = election.color;

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
