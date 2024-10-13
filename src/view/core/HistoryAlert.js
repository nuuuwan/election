import { Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { Format, Translate } from "../../nonview";
import { CustomAlert } from "..";

export default function HistoryAlert() {
    const data = useDataContext();
    const { nResultsDisplay, electionPrevious } = data;

    if (!electionPrevious) {
        return null;
    }

    const year = electionPrevious.year;
    const partyToVotes = electionPrevious.resultLK.partyToVotes;
    const winningPartyID = partyToVotes.winningPartyID;
    const pWinner = partyToVotes.pWinner;

    return (
        <CustomAlert severity="warning">
            <Typography variant="body1">
                {Translate(
                    "Past history refers to results released so far, not the final outcome. For example, in %1, in the %2 polling divisions where results had been released, the %3 was leading nationwide with %4.",
                    [year, nResultsDisplay, winningPartyID, Format.percent(pWinner)]
                )}
            </Typography>
        </CustomAlert>
    );
}
