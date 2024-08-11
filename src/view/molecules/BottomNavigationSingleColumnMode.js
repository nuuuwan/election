import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import SingleColumnMode from "../pages/BasePage/SingleColumnMode";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function BottomNavigationSingleColumnMode({
  selectedSingleColumnMode,
  setSingleColumnMode,
}) {
  const handleRefresh = function () {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <BottomNavigation sx={{ backgroundColor: "#f0f0f0" }}>
      {SingleColumnMode.listAll().map(function (singleColumnMode) {
        const onClick = function () {
          setSingleColumnMode(singleColumnMode);
        };
        const isSelected = selectedSingleColumnMode.id === singleColumnMode.id;

        return (
          <BottomNavigationAction
            key={singleColumnMode.id}
            icon={<singleColumnMode.Icon />}
            onClick={onClick}
            sx={{ color: isSelected ? "#444" : "#ccc" }}
            label={singleColumnMode.description}
          />
        );
      })}
      <BottomNavigationAction icon={<RefreshIcon />} onClick={handleRefresh} />
    </BottomNavigation>
  );
}
