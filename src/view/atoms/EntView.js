import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { EntType, Translate } from "../../nonview/base";

export default function EntView({
  entID,
  useLongName = false,
  sx = {},
  direction = "column",
}) {
  const data = useDataContext();
  if (!data) {
    return null;
  }

  if (!entID) {
    return null;
  }

  const { allRegionIdx } = data;

  const ent = allRegionIdx[entID];

  const entType = EntType.fromID(entID);

  const label = useLongName ? entType.longName : entType.shortName;

  return (
    <Stack
      direction={direction}
      sx={Object.assign({ alignItems: "center" }, sx)}
      gap={1}
    >
      <Typography variant="h5">{Translate(ent.name)}</Typography>
      <Typography variant="h5" sx={{ opacity: 0.5 }}>
        {Translate(label)}
      </Typography>
    </Stack>
  );
}
