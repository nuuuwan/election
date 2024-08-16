import { Stack, Typography } from "@mui/material";
import {Election, Result} from "../../nonview/core";
import {PartyView} from "../../view/atoms";
const N_DISPLAY = 3;
    
function HistoryViewRow({election, entID, i, entIDs} ) {
    let result;
    if (entIDs) {
        result = Result.fromList(entID, entIDs.map(
            entID => election.resultsIdx[entID]
        ));
    }else {
        result = election.resultsIdx[entID];
    }
        const opacity = (1 - i/N_DISPLAY) * 0.5 + 0.5;
    const winningPartyID = result.partyToVotes.winningPartyID;
    return (
        <Stack direction="column" gap={0.5} sx={{alignItems: "center", opacity}}>
            <Typography variant="caption">{election.year}</Typography>
            <PartyView partyID={winningPartyID} />
        </Stack>
    );
}

export default function HistoryView({elections, election, entID, entIDs}) {
    const previousElections = Election.getPreviousElectionsOfSameType(elections, election).reverse().slice(0, N_DISPLAY);
    return (<Stack direction="column" gap={0.1} >{
        
        previousElections.map(
            function(election, i) {
                return <HistoryViewRow key={i} election={election} entID={entID} i={i} entIDs={entIDs} />
            }
        )
    }</Stack>);
}