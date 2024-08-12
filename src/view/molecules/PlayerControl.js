import { Box, IconButton, Slider, Stack, Typography } from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";

function IconButtomCustom({ Icon, onClick, disabled }) {
  const color = disabled ? "#ccc" : "#000";
  return (
    <IconButton onClick={onClick} disabled={disabled} sx={{ color }}>
      <Icon />
    </IconButton>
  );
}

export default function PlayerControl({
  setNResultsDisplay,
  nResultsDisplay,
  nResults,
}) {
  const onChangeCommitted = function (__, value) {
    setNResultsDisplay(value);
  };
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 10,
        right: 10,
        zIndex: 2000,
        padding: 2,
        borderRadius: 8,
        backgroundColor: "#eee",
      }}
    >
      <Typography variant="caption" sx={{ color: "#888" }}>
        {nResultsDisplay} of {nResults}
      </Typography>
      <Slider
        aria-label="Always visible"
        defaultValue={nResultsDisplay}
        min={1}
        max={nResults}
        onChangeCommitted={onChangeCommitted}
      />
      <Stack direction="row" gap={0}>
        <IconButtomCustom
          Icon={FirstPageIcon}
          onClick={() => setNResultsDisplay(1)}
          disabled={nResultsDisplay === 1}
        />
        <IconButtomCustom
          Icon={NavigateBeforeIcon}
          onClick={() => setNResultsDisplay(nResultsDisplay - 1)}
          disabled={nResultsDisplay === 1}
        />
        <IconButtomCustom
          Icon={NavigateNextIcon}
          onClick={() => setNResultsDisplay(nResultsDisplay + 1)}
          disabled={nResultsDisplay === nResults}
        />
        <IconButtomCustom
          Icon={LastPageIcon}
          onClick={() => setNResultsDisplay(nResults)}
          disabled={nResultsDisplay === nResults}
        />
      </Stack>{" "}
    </Box>
  );
}
