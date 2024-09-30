import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { EntType, Translate } from "../../nonview";

function EntViewName({ entID, num }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }

  if (!entID) {
    return null;
  }

  const { allRegionIdx } = data;

  const ent = allRegionIdx[entID];

  let numPart = "";
  if (num !== null) {
    numPart = `${num}. `;
  }

  return <Typography variant="h5">{numPart + Translate(ent.name)}</Typography>;
}

function EntViewType({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }

  if (!entID) {
    return null;
  }

  const entType = EntType.fromID(entID);

  const label = entType.shortName;

  return (
    <Typography variant="h5" sx={{ opacity: 0.5 }}>
      {Translate(label)}
    </Typography>
  );
}

export default function EntView({
  entID,

  sx = {},

  num = null,
}) {
  return (
    <Stack
      direction={"row"}
      sx={Object.assign({ alignItems: "center" }, sx)}
      gap={1}
    >
      <EntViewName entID={entID} num={num} />
      <EntViewType entID={entID} />
    </Stack>
  );
}
