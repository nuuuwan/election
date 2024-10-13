import {
    CustomAlert,
    CustomLoadingProgress,
    CustomStack,
    ElectionSmallTitle,
    ProjectionTitle,
    FinalOutcomeView,
    ProjectedResultBarChart,
} from "../..";

import { FinalOutcome, Translate } from "../../../nonview";
import InsightErrorMarginTooHigh from "../FinalOutcomeView/InsightErrorMarginTooHigh";
import { ProjectionAlert } from "../../core/ProjectionTitle";

import { useDataSlowContext } from "../../../nonview/core/DataSlowProvider";
import { Typography } from "@mui/material";

function ProjectionViewInner() {
    const data = useDataSlowContext();
    if (!data) {
        return <CustomLoadingProgress />;
    }
    const { electionProjected, electionDisplay } = data;
    if (!electionProjected) {
        return (
            <CustomAlert severity="warning">
                <Typography variant="body1">
                    {Translate("No Previous Elections of Same Type to Train Model.")}
                </Typography>
            </CustomAlert>
        );
    }

    const finalOutcome = new FinalOutcome(
        electionProjected,
        electionDisplay.nResults
    );

    if (finalOutcome.isTooMuchError) {
        return <InsightErrorMarginTooHigh />;
    }

    return (
        <>
            <FinalOutcomeView finalOutcome={finalOutcome} />
            <ProjectedResultBarChart />
            <ElectionSmallTitle />
            <ProjectionAlert />
        </>
    );
}

export default function ProjectionViewPresidential() {
    return (
        <CustomStack>
            <ProjectionTitle />
            <ProjectionViewInner />
        </CustomStack>
    );
}
