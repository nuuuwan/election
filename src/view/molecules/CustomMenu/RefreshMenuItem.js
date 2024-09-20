import { MenuItem, ListItemIcon } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Translate } from "../../../nonview/base";

export default function RefreshMenuItem() {
  const onClickRefresh = function () {
    localStorage.clear();
    window.location = "/prespoll";
  };

  return (
    <MenuItem onClick={onClickRefresh}>
      <ListItemIcon>
        <RefreshIcon />
      </ListItemIcon>
      {Translate("Refresh App")}
    </MenuItem>
  );
}
