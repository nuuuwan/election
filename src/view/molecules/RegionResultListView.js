import { Box, Grid, Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";
import { Bellwether } from "../../nonview/core";
import { ArrayX } from "../../nonview/base";

function RegionResultListViewGroup({ title, entIDList }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  
  if (!entIDList ) {
    return null;
  }
  
  const { electionDisplay } = data;
  const resultLK = electionDisplay.resultIdx["LK"];
  const winnerPartyID = resultLK.winningPartyID;

  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      <Grid container spacing={1}>
        {ArrayX.sort(
          entIDList, function(entID) {
            const partyToVotes = electionDisplay.resultIdx[entID].partyToVotes;
            return -partyToVotes.partyToPVotesSorted[winnerPartyID] ;
          }
        ).map(function (entID) {
          return (
            <Grid item xs={12} md={12} xl={12} key={entID}>
              <CumResultsView entID={entID} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default function RegionResultListView() {
  const data = useDataContext();

  if (!data) {
    return null;
  }
  const { provinceIdx, edIdx, pdIdx, ezIdx, elections, electionDisplay } = data;

  const infoList = Bellwether.getBestBellwetherInfoList(
    elections,
    electionDisplay,
    pdIdx
  );

  const N_DISPLAY = 10;
  const bellwetherEntIDList = infoList
    .filter(function (info) {
      return (
        info.error < 0.1 && info.nSame > info.n * 0.5 && info.entID !== "LK"
      );
    })
    .slice(0, N_DISPLAY)
    .map((x) => x.entID);

    const pdResultList = electionDisplay.pdResultList;
    const nAll = electionDisplay.pdResultList.length
    const latestResults = pdResultList.splice(nAll - N_DISPLAY, nAll).reverse().map(x => x.entID);

  return (
    <Stack direction="column" alignItems="center" gap={5}>
      <RegionResultListViewGroup title="Islandwide" entIDList={["LK"]} />


    
      <RegionResultListViewGroup
        title="Ethnicity"
        entIDList={Object.keys(ezIdx)}
      />      
      
      
      <RegionResultListViewGroup
        title="Provinces"
        entIDList={Object.keys(provinceIdx)}
      />
      <RegionResultListViewGroup
        title="Electoral Districts"
        entIDList={Object.keys(edIdx)}
      />
      <RegionResultListViewGroup
        title="Historical Bellwethers"
        entIDList={bellwetherEntIDList}
      /> 

      <RegionResultListViewGroup
      title="Latest Results"
      entIDList={latestResults}
    />
    </Stack>
  );
}
