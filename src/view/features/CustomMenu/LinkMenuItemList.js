import MenuItemLink from "./MenuItemLink";
import GitHubIcon from "@mui/icons-material/GitHub";
import BugReportIcon from "@mui/icons-material/BugReport";

export default function LinkMenuItemList() {
    return (
        <>
            <MenuItemLink
                label="Source Code"
                href="https://github.com/nuuuwan/election/"
                Icon={GitHubIcon}
            />

            <MenuItemLink
                label="Report Bugs"
                href="https://github.com/nuuuwan/election/issues"
                Icon={BugReportIcon}
            />
        </>
    );
}
