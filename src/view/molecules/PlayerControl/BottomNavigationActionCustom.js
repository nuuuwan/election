import { BottomNavigationAction } from "@mui/material";



export default function BottomNavigationActionCustom({
  Icon,
  onClick,
  disabled,
}) {
  const color = disabled ? "secondary" : "primary";
  return (
    <BottomNavigationAction
      onClick={onClick}
      disabled={disabled}
      sx={{ color }}
      icon={<Icon sx={{ m: 0, p: 0 }} />}
    />
  );
}
