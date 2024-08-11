import { BottomNavigation, BottomNavigationAction } from "@mui/material";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";


function BottomNavigationActionCustom({ icon, onClick, disabled }) {
  const color = disabled ? "#ccc" : "#000";
  return (
    <BottomNavigationAction
      icon={icon}
      onClick={onClick}
      disabled={disabled}
      sx={{ color }}
    />
  );
}

export default function BottomNavigationPlayer({
  gotoFirstResult,
  gotoPreviousResult,
  gotoNextResult,
  gotoLastResult,
  iResult,
  nResults,
}) {
  return (
    <BottomNavigation sx={{ backgroundColor: "#f8f8f8" }}>
      <BottomNavigationActionCustom
        icon={<FirstPageIcon />}
        onClick={gotoFirstResult}
        disabled={iResult === 0}
      />
      <BottomNavigationActionCustom
        icon={<NavigateBeforeIcon />}
        onClick={gotoPreviousResult}
        disabled={iResult === 0}
      />
      <BottomNavigationActionCustom
        icon={<NavigateNextIcon />}
        onClick={gotoNextResult}
        disabled={iResult === nResults - 1}
      />
      <BottomNavigationActionCustom
        icon={<LastPageIcon />}
        onClick={gotoLastResult}
        disabled={iResult === nResults - 1}
      />
    </BottomNavigation>
  );
}
