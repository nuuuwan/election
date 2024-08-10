import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RefreshIcon from "@mui/icons-material/Refresh";
export default function BottomNavigationCustom({ gotoNextResult }) {
  const handleRefresh = function () {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <BottomNavigation>
      <BottomNavigationAction
        icon={<NavigateNextIcon />}
        onClick={gotoNextResult}
      />
      <BottomNavigationAction icon={<RefreshIcon />} onClick={handleRefresh} />
    </BottomNavigation>
  );
}
