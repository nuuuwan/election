import { Divider, Stack, Typography } from "@mui/material";
import { VERSION, STYLE } from "../../nonview/constants";
import { Translate } from "../../nonview/base";
export default function CitationsView() {
  const lines = [
    Translate("Source Data by %1", ["elections.gov.lk"]),
    Translate("Music by %1", ["@bensound"]),
    Translate("Visualization & Analysis by %1", ["@nuuuwan"]),
  ];

  return (
    <Stack direction="row" gap={1} alignItems="center" justifyContent="center" color={STYLE.COLOR.LIGHT} divider={<Divider orientation="vertical" variant="middle" flexItem  />}>
      {lines.map(function (line, i) {
        return (
          <Typography key={i} variant="body1">
            {line}
          </Typography>
        );
      })}
      <Typography variant="caption">v{VERSION.DATETIME_STR}</Typography>
    </Stack>
  );
}
