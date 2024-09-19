import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  Grid2,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import {
  CumResultsColumnView,
  CumResultsViewTableRowView,
} from "./CumResultsView";
import { Bellwether } from "../../nonview/core";
import { Translate } from "../../nonview/base";
import { useState } from "react";

function RegionResultListColumnViewGroup({ sortedEntIDs }) {
  return (
    <Grid2 container spacing={1} rowSpacing={1} justifyContent="center">
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
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {[
              "Region or Group",
              "Votes by Party",
              "%",
              "Summary",
              "Past History",
              "Release Status",
              "Time Updated",
            ].map(function (title, iTitle) {
              return (
                <TableCell key={iTitle} sx={{ textAlign: "center" }}>
                  <Typography variant="h6" color="secondary">
                    {Translate(title)}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedEntIDs.map(function (entID) {
            return <CumResultsViewTableRowView key={entID} entID={entID} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function AggregatedResultViewGroup({ entIDList }) {
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("lg"));

  if (!entIDList) {
    return null;
  }

  return (
    <Box>
      {isSmallerScreen ? (
        <RegionResultListColumnViewGroup sortedEntIDs={entIDList} />
      ) : (
        <RegionResultListTableView sortedEntIDs={entIDList} />
      )}
    </Box>
  );
}

function getLatestEntIDList(data) {
  const N_LATEST = 10;
  const { electionDisplay } = data;
  const latestResultList = electionDisplay.baseResultList
    .slice()
    .reverse()
    .slice(0, N_LATEST);
  return latestResultList.map((result) => result.entID);
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
    "Latest Results": getLatestEntIDList,
    Provinces: getProvinceEntIDList,
    "Electoral Districts": getElectoralDistrictEntIDList,
    Ethnicities: getEthnicityEntIDList,
    Bellwethers: getBellwetherEntIDList,
  };
}

function TabSelector({ value, onChange, dataList }) {
  return (
    <Box sx={{ justifyContent: "center", display: "flex" }}>
      <Tabs value={value}>
        {dataList.map(function (data, iData) {
          const onClick = function () {
            onChange(data);
          };
          return (
            <Tab
              key={iData}
              value={data}
              label={Translate(data)}
              onClick={onClick}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}

export default function AggregatedResultView() {
  const data = useDataContext();

  const groupToEntIDListGetter = getGroupToEntIDListGetter(data);
  const groupList = Object.keys(groupToEntIDListGetter);

  const [group, setGroup] = useState(groupList[0]);

  if (!data) {
    return null;
  }

  return (
    <Box>
      <TabSelector value={group} onChange={setGroup} dataList={groupList} />

      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <AggregatedResultViewGroup
          entIDList={groupToEntIDListGetter[group](data)}
        />
      </Box>
    </Box>
  );
}
