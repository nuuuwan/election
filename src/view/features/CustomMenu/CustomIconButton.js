import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function CustomIconButton({ setAnchorEl }) {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ ml: 2 }}
      onClick={handleClick}
    >
      <MenuIcon />
    </IconButton>
  );
}
