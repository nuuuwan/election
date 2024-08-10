import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function BottomNavigationCustom() {
  return (
    <BottomNavigation>
      <BottomNavigationAction icon={<NavigateNextIcon />} />
    </BottomNavigation>
  );
}
