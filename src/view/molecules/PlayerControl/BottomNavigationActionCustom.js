import {

    BottomNavigationAction,

  } from "@mui/material";
  

  import { STYLE } from "../../../nonview/constants";


export default  function BottomNavigationActionCustom({ Icon, onClick, disabled }) {
  const color = disabled ? STYLE.COLOR.LIGHTER : STYLE.COLOR.DARKER;
  return (
    <BottomNavigationAction
      onClick={onClick}
      disabled={disabled}
      sx={{ color }}
      icon={<Icon sx={{ m: 0, p: 0 }} />}
    />
  );
}

