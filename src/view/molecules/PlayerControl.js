import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  IconButton,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CachedIcon from "@mui/icons-material/Cached";

import { useState } from "react";
import { STYLE } from "../../nonview/constants";

const STYLE_PLAYER_CONTROL = {
  BOX: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2000,
    paddingTop: 1,
    backgroundColor: STYLE.COLOR.LIGHTEST,
  },
  BOTTOM_NAVIGATION: {
    backgroundColor: STYLE.COLOR.LIGHTEST,
  },
};

const N_JUMP_STEPS = 10;

function BottomNavigationActionCustom({ Icon, onClick, disabled }) {
  const color = disabled ? STYLE.COLOR.LIGHTER : STYLE.COLOR.DARKER;
  return (
    <BottomNavigationAction
      onClick={onClick}
      disabled={disabled}
      sx={{ color }}
      icon={<Icon sx={{ m: 0, p: 0 }} />}
    />
  );
}

function getBottomNavigationActionConfigs(
  setNResultsDisplay,
  nResultsDisplay,
  nResults
) {
  return [
    {
      Icon: Replay10Icon,
      onClick: () =>
        setNResultsDisplay(Math.max(0, nResultsDisplay - N_JUMP_STEPS)),
      disabled: nResultsDisplay === 0,
    },
    {
      Icon: KeyboardArrowLeftIcon,
      onClick: () => setNResultsDisplay(Math.max(0, nResultsDisplay - 1)),
      disabled: nResultsDisplay === 0,
    },

    {
      Icon: KeyboardArrowRightIcon,
      onClick: () =>
        setNResultsDisplay(Math.min(nResults, nResultsDisplay + 1)),
      disabled: nResultsDisplay === nResults,
    },
    {
      Icon: Forward10Icon,
      onClick: () =>
        setNResultsDisplay(Math.min(nResults, nResultsDisplay + N_JUMP_STEPS)),
      disabled: nResultsDisplay === nResults,
    },
  ];
}

function RefreshButton() {
  const onClickRefresh = function () {
    console.debug(window.location.pathname);
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <IconButton onClick={onClickRefresh} sx={{ color: STYLE.COLOR.LIGHT }}>
      <CachedIcon />
    </IconButton>
  );
}

function BottomNavigationCustom({
  nResultsDisplay,
  nResults,
  setNResultsDisplay,
}) {
  return (
    <BottomNavigation sx={STYLE_PLAYER_CONTROL.BOTTOM_NAVIGATION}>
      {getBottomNavigationActionConfigs(
        setNResultsDisplay,
        nResultsDisplay,
        nResults
      ).map(function (config, i) {
        return (
          <BottomNavigationActionCustom
            key={i}
            Icon={config.Icon}
            onClick={config.onClick}
            disabled={config.disabled}
          />
        );
      })}
    </BottomNavigation>
  );
}

function CustomSlider({
  nResultsDisplayUpdated,
  nResults,
  onChange,
  onChangeCommitted,
}) {
  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        alignItems: "center",
        marginLeft: 2,
        marginRight: 2,
      }}
    >
      <Typography variant="h6">{nResultsDisplayUpdated}</Typography>
      <Slider
        aria-label="Always visible"
        value={nResultsDisplayUpdated}
        min={0}
        max={nResults}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
      />
      <Typography variant="h6" color={STYLE.COLOR.LIGHT}>
        {nResults}
      </Typography>
      <RefreshButton />
    </Stack>
  );
}

export default function PlayerControl({
  electionDisplay,
  election,
  setNResultsDisplay,
}) {
  const nResultsDisplay = electionDisplay.nResults;
  const nResults = election.nResults;

  const [nResultsDisplayUpdated, setNResultsDisplayUpdated] =
    useState(nResultsDisplay);
  const onChangeCommitted = function (__, value) {
    setNResultsDisplayUpdated(value);
    setNResultsDisplay(value);
  };
  const onChange = function (__, value) {
    setNResultsDisplayUpdated(value);
  };

  return (
    <Box sx={STYLE_PLAYER_CONTROL.BOX}>
      <CustomSlider
        nResultsDisplayUpdated={nResultsDisplayUpdated}
        nResults={nResults}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
      />
      <BottomNavigationCustom
        nResultsDisplay={nResultsDisplay}
        nResults={nResults}
        setNResultsDisplay={setNResultsDisplay}
      />
    </Box>
  );
}
