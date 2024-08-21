import { Box, Typography } from "@mui/material";
import { VERSION, STYLE } from "../../nonview/constants";
import { Translate } from "../../nonview/base";
export default function CitationsView() {
  const lines = [
    Translate("Source Data by %1", ["elections.gov.lk"]),
    Translate("Music by %1", ["@bensound"]),
    Translate("Visualization & Analysis by %1", ["@nuuuwan"]),
  ];

  return (
    <Box
      sx={Object.assign(
        {
          color: STYLE.COLOR.LIGHT,
        },
        STYLE.MESSAGE
      )}
    >
      {lines.map(function (line, i) {
        return (
          <Typography key={i} variant="body1">
            {line}
          </Typography>
        );
      })}
      <Typography variant="caption">v{VERSION.DATETIME_STR}</Typography>
    </Box>
  );
}
