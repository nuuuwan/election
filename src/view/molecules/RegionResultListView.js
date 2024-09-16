import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { CumResultsColumnView, CumResultsViewTableRowView } from "./CumResultsView";
import { Bellwether } from "../../nonview/core";
import { ArrayX, Translate } from "../../nonview/base";

function RegionResultListColumnViewGroup ({sortedEntIDs}) {
return (
  <Grid2 container spacing={2} rowSpacing={3} justifyContent="center">
          {sortedEntIDs.map(function (entID) {
            return (
              <Grid2 key={entID}>
                <CumResultsColumnView entID={entID} />
              </Grid2>
            );
          })}
        </Grid2>
)
}

function RegionResultListTableView({sortedEntIDs}) {
return (
  <table>
  {sortedEntIDs.map(function (entID) {
    return (
      <CumResultsViewTableRowView key={entID} entID={entID} />
    );
  })}
</table>
)
}

function getSortedEntIDs({entIDList, electionDisplay}) {

  const winnerPartyID = electionDisplay.resultIdx["LK"].winningPartyID;

  return ArrayX.sort(entIDList, function (entID) {
    const result = electionDisplay.resultIdx[entID];
    if (!result) {
      return 0;
    }
    return -result.partyToVotes.partyToPVotesSorted[winnerPartyID];
  });
}

function RegionResultListViewGroup({ title, entIDList }) {
  const data = useDataContext();
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down('lg'));
  
  if (!data) {
    return null;
  }
  if (!entIDList) {
    return null;
  }
  const { electionDisplay } = data;
  const sortedEntIDs = getSortedEntIDs({entIDList, electionDisplay});

  return (
    <Box>
      <Typography variant="h4">{Translate(title)}</Typography>
      {isSmallerScreen ? (
         <RegionResultListColumnViewGroup sortedEntIDs={sortedEntIDs} />
      ) : (
        <RegionResultListTableView sortedEntIDs={sortedEntIDs} />
      )}
    </Box>
  );
}

function getGroupToEntIDList(data) {
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
  const nAll = electionDisplay.pdResultList.length;
  const latestResults = pdResultList
    .splice(nAll - N_DISPLAY, nAll)
    .reverse()
    .map((x) => x.entID);

return {
  Ethnicity: Object.keys(ezIdx),
  Provinces: Object.keys(provinceIdx),
  "Electoral Districts": Object.keys(edIdx),
  Bellwethers: bellwetherEntIDList,
  "Latest Results": latestResults,
}
}

export default function RegionResultListView() {
  const data = useDataContext();

  if (!data) {
    return null;
  }




  const groupToEntIDList =getGroupToEntIDList(data);

  return (
    <Stack direction="column" alignItems="center" gap={5}>
      {Object.entries(groupToEntIDList).map(function ([title, entIDList]) {
        return (
          <RegionResultListViewGroup
            key={title}
            title={title}
            entIDList={entIDList}
          />
        );
      })}
    </Stack>
  );
}
