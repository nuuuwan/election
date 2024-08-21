import { Box, Typography } from "@mui/material";

import { CustomSelect } from "../atoms";
import { STYLE } from "../../nonview/constants";

function getRenderValue(colorElection) {
  const renderValue = function (election, i) {
    const color =
      colorElection && colorElection.date === election.date
        ? colorElection.color
        : STYLE.COLOR.LIGHTEST;
    return (
      <Typography variant="h6" sx={{ color: "white", backgroundColor: color }}>
        {election.title}
      </Typography>
    );
  };
  return renderValue;
}

function renderMenuItemInner(election, i) {
  const color = election.color;
  return (
    <Typography variant="h4" sx={{ color }}>
      {election.title}
    </Typography>
  );
}

export default function ElectionSelector({
  selectedElection,
  elections,
  setElection,
  colorElection,
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
        renderValue={getRenderValue(colorElection)}
        renderMenuItemInner={renderMenuItemInner}
        getDividerKey={function (election) {
          return election.date.substring(0, 3);
        }}
        reverse={true}
      ></CustomSelect>
    </Box>
  );
}
