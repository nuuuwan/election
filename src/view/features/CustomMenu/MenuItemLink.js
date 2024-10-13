import { MenuItem, ListItemIcon } from "@mui/material";
import { Translate } from "../../../nonview";

export default function MenuItemLink({ label, href, Icon }) {
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
