import MenuItemLink from "./MenuItemLink";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";

export default function LinkMenuItemList() {
  return (
    <>
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
    </>
  );
}
