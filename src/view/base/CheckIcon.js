import { ListItemIcon } from "@mui/material";
import Check from "@mui/icons-material/Check";

export default function CheckIcon({ isSelected }) {
  return <ListItemIcon>{isSelected ? <Check /> : null}</ListItemIcon>;
}
