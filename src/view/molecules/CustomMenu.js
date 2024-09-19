import { useState } from "react";
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";
import Check from "@mui/icons-material/Check";

import { useDataContext } from "../../nonview/core/DataProvider";
import { useBasePageHandlerContext } from "../pages/BasePage/BasePageHandlerProvider";
import { Translate } from "../../nonview/base";

const LANG_TO_LABEL = {
  si: "සිංහල",
  ta: "தமிழ்",
  en: "English",
};

function MenuItemLink({ label, href, Icon }) {
  const onClick = function () {
    window.open(href, "_blank");
  };

  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>

      {Translate(label)}
    </MenuItem>
  );
}

function LangMenuItemList({ handleClose }) {
  const data = useDataContext();
  const { setLang } = useBasePageHandlerContext();
  if (!data) {
    return null;
  }
  const { lang: selectedLang } = data;

  return (
    <>
      {["si", "ta", "en"].map(function (lang) {
        const isSelected = lang === selectedLang;
        const onClick = function () {
          handleClose();
          setLang(lang);
        };
        return (
          <MenuItem key={lang} onClick={onClick} disabled={isSelected}>
            <ListItemIcon>{isSelected ? <Check /> : null}</ListItemIcon>
            {LANG_TO_LABEL[lang]}
          </MenuItem>
        );
      })}
    </>
  );
}

function RefreshMenuItem() {
  const onClickRefresh = function () {
    localStorage.clear();
    window.location = "/prespoll";
  };

  return (
    <MenuItem onClick={onClickRefresh}>
      <ListItemIcon>
        <RefreshIcon />
      </ListItemIcon>
      {Translate("Refresh App")}
    </MenuItem>
  );
}

function ElectionMenuItemList({ handleClose }) {
  const data = useDataContext();
  const { setElection } = useBasePageHandlerContext();
  if (!data) {
    return null;
  }
  const { elections, electionDisplay } = data;
  return (
    <>
      {elections
        .slice()
        .reverse()
        .map(function (election, iElection) {
          const onClick = function () {
            handleClose();
            setElection(election);
          };

          const isSelected = election.date === electionDisplay.date;

          return (
            <MenuItem
              key={iElection}
              onClick={onClick}
              sx={{ color: election.color }}
            >
              <ListItemIcon>{isSelected ? <Check /> : null}</ListItemIcon>
              {election.title}
            </MenuItem>
          );
        })}
    </>
  );
}

export default function CustomMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = function () {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
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

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ zIndex: 5000 }}
        dense
      >
        <ElectionMenuItemList handleClose={handleClose} />
        <Divider />

        <LangMenuItemList handleClose={handleClose} />
        <Divider />

        <MenuItemLink
          label="Source Code"
          href="https://github.com/nuuuwan/prespoll/"
          Icon={GitHubIcon}
        />

        <MenuItemLink
          label="Report Bugs"
          href="https://github.com/nuuuwan/prespoll/issues"
          Icon={BugReportIcon}
        />

        <Divider />
        <RefreshMenuItem />
      </Menu>
    </>
  );
}
