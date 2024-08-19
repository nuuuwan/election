import { Box, Typography } from "@mui/material";

const STYLE_TESTING_LABEL = {
    BOX: {
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",},
    LABEL: {
        fontSize: 60,
        opacity: 0.1,
        backgroundColor: "red",
        color: "white",
        padding: 2,
        borderRadius: 2,
    },
};

export default function TestingLabel({election}) {
    if (!election.isFuture) {
        return null;
    }
    return (
        <Box sx={STYLE_TESTING_LABEL.BOX}>
            <Typography  sx={STYLE_TESTING_LABEL.LABEL}>Test Data</Typography>
        </Box>
    );
}