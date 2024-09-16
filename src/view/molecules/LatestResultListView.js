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
  const pdEnt = pdIdx[activePDID];
  const resultIdx = electionDisplay.resultIdx;

  const resultPD = electionDisplay.resultIdx[activePDID];
  const resultED = resultIdx[pdEnt.d.ed_id];
  const resultProvince = resultIdx[ProvinceUtils.getProvinceIDForPDEnt(pdEnt)];
  const resultLK = resultIdx["LK"];

  return (
    <Stack direction="column" sx={{ color: resultPD.color }}>
      <PDSelector />
      <Grid2 container spacing={2} justifyContent="center">
        {[resultPD, resultED, resultProvince, resultLK].map(function (result) {
          return (
            <Grid2 key={result.entID}>
              <CumResultsView entID={result.entID} />
            </Grid2>
          );
        })}
      </Grid2>
    </Stack>
  );
}
