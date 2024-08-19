import { IconButton } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { STYLE } from "../../nonview/constants";

export default function RefreshButton() {
  const onClickRefresh = function () {
    localStorage.clear();
    window.location = "/prespoll";
  };

  return (
    <IconButton onClick={onClickRefresh} sx={{ color: STYLE.COLOR.LIGHT }}>
      <CachedIcon />
    </IconButton>
  );
}
