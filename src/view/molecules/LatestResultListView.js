import { Grid2, Stack } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";
import { ProvinceUtils } from "../../nonview/base";
import { PDSelector } from "../atoms";

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

  return (
    <Stack direction="column" sx={{ color: resultPD.color }}>
      <PDSelector />

      <Grid2 container spacing={2} rowSpacing={3} justifyContent="center">
        {[resultPD, resultED, resultProvince, resultLK].map(function (result) {
          if (!result) {
            return null;
          }
          return (
            <Grid2
              xs={12}
              md={12}
              xl={12}
              key={result.entID}
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <CumResultsView entID={result.entID} />
            </Grid2>
          );
        })}
      </Grid2>
    </Stack>
  );
}
