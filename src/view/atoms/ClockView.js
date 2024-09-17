import { Box, Typography } from "@mui/material";
import { Time } from "../../nonview/base";

export default function ClockView() {
    
    const time = Time.now().yyyymmdd_hhmm;
    return (
        <Box>
            <Typography variant="h6">{time}</Typography>
        </Box>
    );
}