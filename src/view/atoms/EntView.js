import { Stack, Typography } from "@mui/material";
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
    <Stack direction="column" sx={{ justifyContent: "left" }}>
      <Typography variant="h5">{Translate(ent.name)}</Typography>
      <Typography variant="body1" sx={{ opacity: 0.5 }}>
        {Translate(label)}
      </Typography>
    </Stack>
  );
}
