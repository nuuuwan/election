import { Box, Typography, useMediaQuery } from "@mui/material";

import { CustomSelect } from "../atoms";
import { STYLE } from "../../nonview/constants";
import { useTheme } from "@emotion/react";

function getRenderValue(colorElection, isSmallScreen) {
 

  const renderValue = function (election, i) {
    const color =
      colorElection && colorElection.date === election.date
        ? colorElection.color
        : STYLE.COLOR.LIGHTEST;
    return (
      <Typography variant={isSmallScreen ? "h6" : "h2"} sx={{ color: "white", backgroundColor: color }}>
        {election.title}
      </Typography>
    );
  };
  return renderValue;
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
  colorElection,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
        renderValue={getRenderValue(colorElection, isSmallScreen)}
        renderMenuItemInner={renderMenuItemInner}
        getDividerKey={function (election) {
          return election.date.substring(0, 3);
        }}
        reverse={true}
      ></CustomSelect>
    </Box>
  );
}
