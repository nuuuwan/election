import { Grid, Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";
import { ProvinceUtils } from "../../nonview/base";
import { PD_ID_TO_GROUP_ID } from "../../nonview/constants";

export default function LatestResultListView() {
  const data = useDataContext();

  if (!data) {
    return null;
  }
  const { pdIdx, electionDisplay, activePDID } = data;
  const resultPD = electionDisplay.resultIdx[activePDID];
  const pdEnt = pdIdx[resultPD.entID];

  const resultIdx = electionDisplay.resultIdx;
  const resultED = resultIdx[pdEnt.d.ed_id];
  const resultProvince = resultIdx[ProvinceUtils.getProvinceIDForPDEnt(pdEnt)];
  const resultLK = resultIdx["LK"];

  const resultEZ = resultIdx[PD_ID_TO_GROUP_ID[activePDID]];
  if (!resultEZ) {
    console.debug(activePDID);
  }

  const iResult = electionDisplay.pdIDList.indexOf(activePDID) + 1;

  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{ color: resultPD.color }}
    >
      <Typography variant="h4">
        <span style={{ opacity: 0.5 }}>Result</span> #{iResult}
      </Typography>

      <Grid container spacing={1}>
        {[resultPD, resultED, resultProvince, resultLK, resultEZ].map(function (
          result
        ) {
          if (!result) {
            return null;
          }
          return (
            <Grid item xs={12} md={6} xl={6} key={result.entID}>
              <CumResultsView entID={result.entID} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
