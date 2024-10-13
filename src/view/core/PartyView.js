import { Typography } from "@mui/material";
import { Party } from "../../nonview";

const STYLE_LABEL = {
    padding: 0.2,
    margin: 0.0,
    borderRadius: 1,
    width: 24,
    textAlign: "center",
};

export default function PartyView({ partyID, sx }) {
    if (!partyID) {
        return null;
    }
    const party = Party.fromID(partyID);

    return (
        <Typography
            variant="caption"
            sx={Object.assign(
                {},
                STYLE_LABEL,
                { backgroundColor: party.color, color: "white" },
                sx
            )}
            component="span"
        >
            {party.id}
        </Typography>
    );
}
