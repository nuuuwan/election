import { Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { EntType, Translate } from "../../nonview/base";

export default function EntView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { allRegionIdx } = data;

  const ent = allRegionIdx[entID];
  const entType = EntType.fromID(entID);

  return (
    <Typography variant="h6">
      {Translate(ent.name)} {Translate(entType.shortName)}
    </Typography>
  );
}
