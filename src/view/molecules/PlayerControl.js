import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useState } from "react";

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
          defaultValue={nResultsDisplay}
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
          Icon={NavigateBeforeIcon}
          onClick={() => setNResultsDisplay(nResultsDisplay - 1)}
          disabled={nResultsDisplay === 1}
        />
        <BottomNavigationActionCustom
          Icon={NavigateNextIcon}
          onClick={() => setNResultsDisplay(nResultsDisplay + 1)}
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
