import { Slider, Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { useState } from "react";
import { useBasePageHandlerContext } from "../pages/BasePage/BasePageHandlerProvider";

export default function DisplaySlider() {
  const [valueDisplay, setValueDisplay] = useState(null);
  const data = useDataContext();
  const handlers = useBasePageHandlerContext();
  if (!data || !handlers) {
    return null;
  }
  const { nResultsDisplay } = data;
  const { setNResultsDisplay } = handlers;

  const onChange = function (event, value) {
    setValueDisplay(value);
  };

  const onChangeCommitted = function (event, value) {
    setNResultsDisplay(value);
  };

  return (
    <Stack direction="row" gap={2} alignItems="center">
      <Slider
        value={nResultsDisplay}
        min={0}
        max={182}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
      />
      <Stack direction="row" gap={0} alignItems="center">
      <Typography variant="h5">{valueDisplay || nResultsDisplay}</Typography>
      <Typography variant="body1" sx={{ color: "#888" }}>
        {"/182"}
      </Typography>
      </Stack>
    </Stack>  
  );
}
