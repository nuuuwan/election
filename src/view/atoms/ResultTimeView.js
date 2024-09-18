import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import { Time, Translate } from "../../nonview/base";

export default function ResultTimeView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;
  const result = electionDisplay.resultIdx[entID];

  let title = Translate("Not available");
  let subTitle = null;
  if (result.resultTime) {
    const timeResult = Time.fromString(result.resultTime);
    title = timeResult.dateTimeString;
    subTitle = timeResult.secondsFromNowHumanized;
  }

 return (

    <Stack
      direction="column"
      sx={{ color: "lightgray" }}
    >

      <Typography variant="caption">{title}</Typography>
      <Typography variant="body1">{subTitle}</Typography>
    </Stack>
  );
}
