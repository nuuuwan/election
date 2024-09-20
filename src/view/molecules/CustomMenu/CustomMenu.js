import { useState } from "react";
import { Divider, Menu } from "@mui/material";

import LangMenuItemList from "./LangMenuItemList";
import RefreshMenuItem from "./RefreshMenuItem";
import ElectionMenuItemList from "./ElectionMenuItemList";
import LinkMenuItemList from "./LinkMenuItemList";
import CustomIconButton from "./CustomIconButton";

export default function CustomMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = function () {
    setAnchorEl(null);
  };

  return (
    <>
      <CustomIconButton setAnchorEl={setAnchorEl} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ zIndex: 5000 }}
      >
        <ElectionMenuItemList handleClose={handleClose} />

        <Divider />
        <LangMenuItemList handleClose={handleClose} />

        <Divider />
        <LinkMenuItemList />

        <Divider />
        <RefreshMenuItem />
      </Menu>
    </>
  );
}
