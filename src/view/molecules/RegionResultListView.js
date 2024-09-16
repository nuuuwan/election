import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Grid2 } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import {
  CumResultsColumnView,
  CumResultsViewTableRowView,
} from "./CumResultsView";
import { Bellwether } from "../../nonview/core";
import { ArrayX } from "../../nonview/base";
import { CustomSelect } from "../atoms";
import { useState } from "react";

function RegionResultListColumnViewGroup({ sortedEntIDs }) {
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
  );
}

function RegionResultListTableView({ sortedEntIDs }) {
  return (
    <table>
      {sortedEntIDs.map(function (entID) {
        return <CumResultsViewTableRowView key={entID} entID={entID} />;
      })}
    </table>
  );
}

function getSortedEntIDs({ entIDList, electionDisplay }) {
  const winnerPartyID = electionDisplay.resultIdx["LK"].winningPartyID;

  return ArrayX.sort(entIDList, function (entID) {
    const result = electionDisplay.resultIdx[entID];
    if (!result) {
      return 0;
    }
    return -result.partyToVotes.partyToPVotesSorted[winnerPartyID];
  });
}

function RegionResultListViewGroup({ entIDList }) {
  const data = useDataContext();
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("lg"));

  if (!data) {
    return null;
  }
  if (!entIDList) {
    return null;
  }
  const { electionDisplay } = data;
  const sortedEntIDs = getSortedEntIDs({ entIDList, electionDisplay });

  return (
    <Box>
      {isSmallerScreen ? (
        <RegionResultListColumnViewGroup sortedEntIDs={sortedEntIDs} />
      ) : (
        <RegionResultListTableView sortedEntIDs={sortedEntIDs} />
      )}
    </Box>
  );
}

function getProvinceEntIDList(data) {
  return Object.keys(data.provinceIdx);
}

function getElectoralDistrictEntIDList(data) {
  return Object.keys(data.edIdx);
}

function getEthnicityEntIDList(data) {
  return Object.keys(data.ezIdx);
}

function getBellwetherEntIDList(data) {
  const { elections, electionDisplay, pdIdx } = data;
  const infoList = Bellwether.getBestBellwetherInfoList(
    elections,
    electionDisplay,
    pdIdx
  );

  return infoList
    .filter(function (info) {
      return (
        info.error < 0.1 && info.nSame > info.n * 0.5 && info.entID !== "LK"
      );
    })
    .slice(0, 10)
    .map((x) => x.entID);
}

function getGroupToEntIDListGetter() {
  return {
    Provinces: getProvinceEntIDList,
    "Electoral Districts": getElectoralDistrictEntIDList,
    Ethnicities: getEthnicityEntIDList,
    Bellwethers: getBellwetherEntIDList,
  };
}

export default function RegionResultListView() {
  const data = useDataContext();

  const groupToEntIDListGetter = getGroupToEntIDListGetter(data);
  const groupList = Object.keys(groupToEntIDListGetter);

  const [group, setGroup] = useState(groupList[0]);

  if (!data) {
    return null;
  }

  return (
    <Box sx={{ borderTop: "1px solid #eee" }}>
      <CustomSelect value={group} onChange={setGroup} dataList={groupList} />

      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <RegionResultListViewGroup
          entIDList={groupToEntIDListGetter[group](data)}
        />
      </Box>
    </Box>
  );
}
