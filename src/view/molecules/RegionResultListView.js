import { Box, Grid2, Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";
import { Bellwether } from "../../nonview/core";
import { ArrayX, Translate } from "../../nonview/base";

function RegionResultListViewGroup({ title, entIDList }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }

  if (!entIDList) {
    return null;
  }

  const { electionDisplay } = data;
  const resultLK = electionDisplay.resultIdx["LK"];
  const winnerPartyID = resultLK.winningPartyID;

  const isMobile = window.innerWidth < 1080;
  const direction = isMobile ? "column" : "row";

  const sortedEntIDs = ArrayX.sort(entIDList, function (entID) {
    const result = electionDisplay.resultIdx[entID];
    if (!result) {
      return 0;
    }
    const partyToVotes = result.partyToVotes;
    return -partyToVotes.partyToPVotesSorted[winnerPartyID];
  });

  return (
    <Box>
      <Typography variant="h4">{Translate(title)}</Typography>

      {isMobile ? (
        <Grid2 container spacing={2} rowSpacing={3} justifyContent="center">
          {sortedEntIDs.map(function (entID) {
            return (
              <Grid2 key={entID}>
                {" "}
                <CumResultsView entID={entID} direction={direction} />
              </Grid2>
            );
          })}
        </Grid2>
      ) : (
        <table>
          {sortedEntIDs.map(function (entID) {
            return (
              <CumResultsView key={entID} entID={entID} direction={direction} />
            );
          })}
        </table>
      )}
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
  const nAll = electionDisplay.pdResultList.length;
  const latestResults = pdResultList
    .splice(nAll - N_DISPLAY, nAll)
    .reverse()
    .map((x) => x.entID);

  const groupToEntIDList = {
    Ethnicity: Object.keys(ezIdx),
    Provinces: Object.keys(provinceIdx),
    "Electoral Districts": Object.keys(edIdx),
    Bellwethers: bellwetherEntIDList,
    "Latest Results": latestResults,
  };

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
