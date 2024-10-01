import { Box, Typography, useMediaQuery } from "@mui/material";

import { CustomSelect } from "..";

import { useTheme } from "@emotion/react";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import { useBasePageHandlerContext } from "../../view/pages/BasePage/BasePageHandlerProvider";

function getRenderValue(colorElection, isSmallScreen) {
  const renderValue = function (election, i) {
    return (
      <Typography
        variant={isSmallScreen ? "h5" : "h2"}
        sx={{
          color: "white",
        }}
      >
        {election.title}
      </Typography>
    );
  };
  return renderValue;
}

function renderMenuItemInner(election, i) {
  return (
    <Typography variant="h6" color={election.color}>
      {election.title}
    </Typography>
  );
}

export default function ElectionSelector({ colorElection }) {
  const { setElection } = useBasePageHandlerContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const data = useDataSlowContext();
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
