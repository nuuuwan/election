import { Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { EntType, Translate } from "../../nonview/base";

export default function EntView({ entID, useLongName = false }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { allRegionIdx } = data;

  const ent = allRegionIdx[entID];
  const entType = EntType.fromID(entID);

  const label = useLongName ? entType.longName : entType.shortName;

  return (
    <Typography variant="h6">
      {Translate(ent.name)}{" "}
      <span style={{ fontSize: "67%", opacity: 0.5 }}>{Translate(label)}</span>
    </Typography>
  );
}
