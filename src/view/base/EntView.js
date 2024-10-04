import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { EntType, Translate } from "../../nonview";

function EntViewName({ entID, num, isNationalListMode, isSmall }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }

  if (!entID) {
    return null;
  }

  const { allRegionIdx } = data;

  const ent = allRegionIdx[entID];

  if (!ent) {
    console.error(`EntViewName: ent for ${entID} not found`);
    return null;
  }

  let numPart = "";
  if (num !== null) {
    numPart = `${num}. `;
  }

  let name = ent.name;
  if (isNationalListMode && entID === "LK") {
    name = 'National List';
  }

  return <Typography variant={isSmall? "body1" : "h5"}>{numPart + Translate(name)}</Typography>;
}

function EntViewType({ entID , isSmall}) {
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
    <Typography variant={isSmall? "body1" : "h5"} sx={{ opacity: 0.5 }}>
      {Translate(label)}
    </Typography>
  );
}

export default function EntView({
  entID,
  sx = {},
  isNationalListMode=false,
  num = null,
  isSmall=false,
}) {
  return (
    <Stack
      direction={"row"}
      sx={Object.assign({ alignItems: "center" }, sx)}
      gap={0.5}
    >
      <EntViewName entID={entID} num={num} isNationalListMode={isNationalListMode} isSmall={isSmall} />
      <EntViewType entID={entID} isSmall={isSmall} />
    </Stack>
  );
}
