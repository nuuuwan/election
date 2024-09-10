import {  Grid, Stack, Typography } from "@mui/material";
import { ProvinceUtils, Translate } from "../../../nonview/base";
import { useDataContext } from "../../../nonview/core/DataProvider";
import {  LatestResultTitle } from "../../../view/atoms";
import {
  PDSelector,
  BellwetherView,
  MultiResultsBarChart,
  HistoryView,
  SummaryView,
} from "../../../view/molecules";
import CustomStack from "./CustomStack";
import PartyToVotesStatsView from "../PartyToVotesView/PartyToVotesStatsView";
import { Party } from "../../../nonview/core";

export default function ColumnLatestResult() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, elections, allRegionIdx } = data;
  const activePDID = electionDisplay.finalPDID;
  const activeEDID = activePDID.substring(0, 5);
  const activeProvinceID = ProvinceUtils.getProvinceIDForEDID(activeEDID);




  const entIDs = [activePDID, activeEDID, activeProvinceID, "LK"];

  return (
    <CustomStack>
      <LatestResultTitle />
      <PDSelector activePDID={activePDID} />



      <Grid container rowGap={1} gap={0} >
      {entIDs.map(
        function(entID, iEnt) {
          const result = electionDisplay.resultIdx[entID];
          const partyToVotes = result.partyToVotes;
          const ent = allRegionIdx[entID];
          const entName = ent.name;
          const winningPartyID = partyToVotes.winningPartyID;
          const color = Party.fromID(winningPartyID).color; 


          const entTypeLabel = ["PD", "ED", "Pr.", ""][iEnt];

          return (
            <Grid item xs={12} md={6} xl={6} key={entID}>
              <Stack direction="column" gap={1} alignItems="center" >
                <Typography variant="h6" color={color}>{Translate(entName)}{" "}{Translate(entTypeLabel)}</Typography>
                    <SummaryView summary={result.summary} />

                 
                    <MultiResultsBarChart
        resultsElection={electionDisplay}
        entIDs={[entID]}
      />

<PartyToVotesStatsView partyToVotes={partyToVotes} />
      {elections ? <HistoryView entID={entID} /> : null}
      </Stack>
            </Grid>
          )
        }
      )}
      </Grid>

        
       


      <BellwetherView />
    </CustomStack>
  );
}
