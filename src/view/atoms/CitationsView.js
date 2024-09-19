import { Typography } from "@mui/material";
import { VERSION } from "../../nonview/constants";
import { Translate } from "../../nonview/base";
import { useDataContext } from "../../nonview/core/DataProvider";
export default function CitationsView() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { appTime } = data;

  const lines = [
    "v" + VERSION.DATETIME_STR,
    Translate("Source Data by %1", ["elections.gov.lk"]),
    Translate("Visualization & Analysis by %1", ["@nuuuwan"]),
    appTime,
  ];

  const content = lines.join(" · ");

  return (
    <Typography variant="caption" color={"secondary"}>
      {content}
    </Typography>
  );
}
