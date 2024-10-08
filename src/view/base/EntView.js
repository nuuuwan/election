import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { EntType, Translate } from "../../nonview";


function EntViewName({ entID, num, isSmall }) {
  const data = useDataContext();
  if (!data || !entID) {
    return null;
  }

  const { allRegionIdx } = data;
  const ent = allRegionIdx[entID];

  const numPart = num ? `${num}. ` : "";

  return (
    <Typography variant={isSmall ? "body1" : "h5"}>
      {numPart + Translate(ent.name)}
    </Typography>
  );
}

function EntViewType({ entID, isSmall }) {
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
    <Typography variant={isSmall ? "body1" : "h5"} sx={{ opacity: 0.5 }}>
      {Translate(label)}
    </Typography>
  );
}

export default function EntView({
  entID,
  sx = {},
  num = null,
  isSmall = false,
}) {
  return (
    <Stack
      direction={"row"}
      sx={Object.assign({ alignItems: "center" }, sx)}
      gap={0.5}
    >
      <EntViewName
        entID={entID}
        num={num}
        isSmall={isSmall}
      />
      <EntViewType entID={entID} isSmall={isSmall} />
    </Stack>
  );
}
