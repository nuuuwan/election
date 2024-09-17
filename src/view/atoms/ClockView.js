import { Box, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

export default function ClockView() {

    const data = useDataContext();
    if (!data) {
        return null
    }
    const {electionDisplay} = data;
    const lastResult = electionDisplay.pdResultList.slice().reverse()[0];

    return (
        <Box>
            <Typography variant="h6">{lastResult.resultTime}</Typography>
        </Box>
    );
}