import { Typography } from "@mui/material";
import { VERSION } from "../../nonview/constants";
import { Translate } from "../../nonview/base";
export default function CitationsView() {
  const lines = [
    Translate("Source Data by %1", ["elections.gov.lk"]),
    Translate("Music by %1", ["@bensound"]),
    Translate("Visualization & Analysis by %1", ["@nuuuwan"]),
    "v" + VERSION.DATETIME_STR,
  ];

  const content = lines.join(" · ");

  return (
    <Typography variant="caption" color={"secondary"}>
      {content}
    </Typography>
  );
}
