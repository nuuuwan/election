import { Box, Typography } from "@mui/material";
import { Party } from "../../nonview";

export default function ParliamentViewCircle({ partyID, seats }) {
    let background = Party.fromID(partyID).color;
    let border = "1px solid " + background;
    let color = "white";

    if (partyID === Party.ERROR.id) {
        background = "white";
        border = "1px dashed gray";
        color = "gray";
    }

    const dim = 34;
    const fontSize = dim * 0.5;
    return (
        <Box
            key={partyID}
            sx={{
                width: dim,
                height: dim,
                background,
                margin: 0.1,
                padding: 0,
                borderRadius: dim / 2,
                border,

                alignItems: "center",
                alignContent: "center",
            }}
        >
            <Typography variant="h5" sx={{ color, fontSize }}>
                {seats}
            </Typography>
        </Box>
    );
}
