import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { EntType, Translate } from "../../nonview";

function EntViewName({ entID }) {
  const data = useDataContext();
  if (!data || !entID) {
    return null;
  }

  const { allRegionIdx } = data;
  const ent = allRegionIdx[entID];

  return (
    <Typography variant={"h4"}>
      {Translate(ent.name)}
    </Typography>
  );
}

function EntViewType({ entID }) {
  if (!entID) {
    return null;
  }

  const entType = EntType.fromID(entID);

  const label = entType.shortName;

  return (
    <Typography variant="h4" sx={{ opacity: 0.5 }}>
      {Translate(label)}
    </Typography>
  );
}

export default function EntView({
  entID,
  sx = {},

}) {
  return (
    <Stack
      direction={"row"}
      sx={Object.assign({ alignItems: "center" }, sx)}
      gap={0.5}
    >
      <EntViewName entID={entID} />
      <EntViewType entID={entID}  />
    </Stack>
  );
}
