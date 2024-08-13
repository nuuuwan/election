import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";

import { useState } from "react";

const N_JUMP_STEPS = 10;

function BottomNavigationActionCustom({ Icon, onClick, disabled }) {
  const color = disabled ? "#ccc" : "#000";
  return (
    <BottomNavigationAction
      onClick={onClick}
      disabled={disabled}
      sx={{ color }}
      icon={<Icon />}
    />
  );
}

export default function PlayerControl({
  setNResultsDisplay,
  nResultsDisplay,
  nResults,
}) {
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
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 2000,
        backgroundColor: "white",
      }}
    >
      <Stack
        direction="row"
        gap={2}
        sx={{
          alignItems: "center",
          p: 0,
          m: 0,
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <Typography variant="h6">{nResultsDisplayUpdated}</Typography>
        <Slider
          aria-label="Always visible"
          defaultValue={nResultsDisplayUpdated}
          min={1}
          max={nResults}
          onChange={onChange}
          onChangeCommitted={onChangeCommitted}
        />
        <Typography variant="h6" color="#888">
          {nResults}
        </Typography>
      </Stack>
      <BottomNavigation>
        <BottomNavigationActionCustom
          Icon={FirstPageIcon}
          onClick={() => setNResultsDisplay(1)}
          disabled={nResultsDisplay === 1}
        />
        <BottomNavigationActionCustom
          Icon={Replay10Icon}
          onClick={() =>
            setNResultsDisplay(Math.max(1, nResultsDisplay - N_JUMP_STEPS))
          }
          disabled={nResultsDisplay === 1}
        />
        <BottomNavigationActionCustom
          Icon={Forward10Icon}
          onClick={() =>
            setNResultsDisplay(
              Math.min(nResults, nResultsDisplay + N_JUMP_STEPS)
            )
          }
          disabled={nResultsDisplay === nResults}
        />
        <BottomNavigationActionCustom
          Icon={LastPageIcon}
          onClick={() => setNResultsDisplay(nResults)}
          disabled={nResultsDisplay === nResults}
        />
      </BottomNavigation>
    </Box>
  );
}
