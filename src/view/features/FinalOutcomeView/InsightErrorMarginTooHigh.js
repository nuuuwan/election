import { Stack, Typography } from "@mui/material";
import { Translate } from "../../../nonview";

export default function InsightErrorMarginTooHigh() {
    return (
        <Stack direction="column" sx={{ m: 2 }} gap={2}>
            <Typography variant="h4">{Translate("Await Projection")}...</Typography>
            <Typography variant="h5">
                {"Our model needs more data before it can make a projection."}
            </Typography>
        </Stack>
    );
}
