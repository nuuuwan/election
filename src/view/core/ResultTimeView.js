import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import { Time } from "../../nonview";

export default function ResultTimeView({
    entID,
    sx,
    hideBlank = false,
    bigMode = false,
}) {
    const data = useDataContext();
    const { electionDisplay } = data;
    if (!electionDisplay.resultIdx) {
        return null;
    }
    const result = electionDisplay.resultIdx[entID];

    let title = hideBlank ? null : "-";
    let subTitle = null;
    if (result.resultTime) {
        const timeResult = Time.fromString(result.resultTime);
        title = timeResult.dateTimeString;
        subTitle = timeResult.secondsFromNowHumanized;
    }

    if (bigMode) {
        return <Typography variant="h4">{title}</Typography>;
    }

    return (
        <Stack direction="column" sx={Object.assign({ color: "gray" }, sx)}>
            <Typography variant="caption">{title}</Typography>
            <Typography variant="body1">{subTitle}</Typography>
        </Stack>
    );
}
