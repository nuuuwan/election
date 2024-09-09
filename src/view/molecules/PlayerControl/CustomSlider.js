import { Slider, Stack, Typography } from "@mui/material";

import { RefreshButton } from "../../atoms";

export default function CustomSlider({
  nResultsDisplayUpdated,
  nResults,
  onChange,
  onChangeCommitted,
  onClickEndValue,
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
      <Typography
        variant="h6"
        color={"secondary"}
        onClick={onClickEndValue}
        sx={{ cursor: nResults !== nResultsDisplayUpdated ? "pointer" : "" }}
      >
        {nResults}
      </Typography>
      <RefreshButton />
    </Stack>
  );
}
