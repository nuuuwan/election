import { Box, Typography, useMediaQuery } from "@mui/material";

import { CustomSelect } from "../atoms";

import { useTheme } from "@emotion/react";
import { useDataContext } from "../../nonview/core/DataProvider";
import { useBasePageHandlerContext } from "./BasePage/BasePageHandlerProvider";

function getRenderValue(colorElection, isSmallScreen) {
  const renderValue = function (election, i) {
    const color =
      colorElection && colorElection.date === election.date
        ? colorElection.color
        : "primary";
    return (
      <Typography variant={isSmallScreen ? "h6" : "h2"} color={color}>
        {election.title}
      </Typography>
    );
  };
  return renderValue;
}

function renderMenuItemInner(election, i) {
  const color = election.color;
  return (
    <Typography variant="h6" color={color}>
      {election.title}
    </Typography>
  );
}

export default function ElectionSelector({ colorElection }) {
  const {setElection} = useBasePageHandlerContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { elections, electionDisplay } = data;

  const presidentialElections = elections.filter(
    (election) => election.electionType === "Presidential"
  );

  return (
    <Box>
      <CustomSelect
        value={electionDisplay}
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
