import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import { Time } from "../../nonview/base";

export default function ResultTimeView({ entID, sx }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;
  const result = electionDisplay.resultIdx[entID];

  let title = "-";
  let subTitle = null;
  if (result.resultTime) {
    const timeResult = Time.fromString(result.resultTime);
    title = timeResult.dateTimeString;
    subTitle = timeResult.secondsFromNowHumanized;
  }

  return (
    <Stack direction="column" sx={Object.assign({ color: "gray" }, sx)}>
      <Typography variant="caption">{title}</Typography>
      <Typography variant="body1">{subTitle}</Typography>
    </Stack>
  );
}
