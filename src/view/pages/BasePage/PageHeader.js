import {
  AppBar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { EntView, ResultTimeView } from "../../../view/atoms";
import { useState } from "react";
import { useBasePageHandlerContext } from "./BasePageHandlerProvider";
import { Translate } from "../../../nonview/base";
import { Check } from "@mui/icons-material";

const STYLE_PAGE_HEADER = {
  SELECTOR: {
    position: "sticky",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 3000,
    padding: 0,
    margin: 0,
    color: "white",
    borderBottom: "1px solid #eee",
  },
};
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

          const isSelected = election.year === electionDisplay.year;

          return (
            <MenuItem
              key={iElection}
              onClick={onClick}
              sx={{ color: election.color }}
            >
              {election.title}

              <ListItemIcon>{isSelected ? <Check /> : null}</ListItemIcon>
            </MenuItem>
          );
        })}
    </>
  );
}

function CustomMenu() {
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

export default function PageHeader() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionProjected, activePDID } = data;
  const backgroundColor = electionProjected?.color || "gray";

  return (
    <Box sx={Object.assign({ backgroundColor }, STYLE_PAGE_HEADER.SELECTOR)}>
      <AppBar position="static" sx={{ backgroundColor }}>
        <Toolbar>
          <EntView entID={activePDID} direction="row" />

          <Box sx={{ flexGrow: 1 }} />

          <ResultTimeView entID="LK" sx={{color: "white"}} />

          <CustomMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
