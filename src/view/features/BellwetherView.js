import { Typography } from "@mui/material";
import { Bellwether, Format, Translate } from "../../nonview";

import { CustomAlert, CustomLoadingProgress } from "..";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";

export default function BellwetherView() {
    const data = useDataSlowContext();
    if (!data) {
        return <CustomLoadingProgress />;
    }
    const { allRegionIdx, electionDisplay, electionHistory, activeEntID } = data;

    const { n, nSame, error } = Bellwether.getStats(
        electionHistory,
        electionDisplay,
        activeEntID
    );
    if (n === 0) {
        return null;
    }

    const ent = allRegionIdx[activeEntID];

    return (
        <CustomAlert>
            <Typography variant="body1">
                {Translate(
                    "In %1 out of the last %2 Presidential Elections, the candidate who won in %3 also won nationally. Historically, the average variation in party vote percentages from the national result has been %4. However, it's important to note that past performance does not guarantee future outcomes.",
                    [nSame, n, Translate(ent.name), Format.percent(error)]
                )}
            </Typography>
        </CustomAlert>
    );
}
