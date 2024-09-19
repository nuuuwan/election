import { Grid2, Stack } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { CumResultsColumnView } from "./CumResultsView";
import { EntType, ProvinceUtils } from "../../nonview/base";

export default function LatestResultListView() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { allRegionIdx, electionDisplay, activeEntID } = data;
  const resultIdx = electionDisplay.resultIdx;

  const ent = allRegionIdx[activeEntID];

  let resultList, resultBaseEnt;
  const resultLK = resultIdx["LK"];

  if (electionDisplay.baseEntType === EntType.PD) {
    const resultPD = electionDisplay.resultIdx[activeEntID];
    const resultED = resultIdx[ent.d.ed_id];
    const resultProvince = resultIdx[ProvinceUtils.getProvinceIDForPDEnt(ent)];
    resultList = [resultPD, resultED, resultProvince, resultLK];
    resultBaseEnt = resultPD;
  } else if (electionDisplay.baseEntType === EntType.ED) {
    const resultED = resultIdx[activeEntID];
    const resultProvince =
      resultIdx[ProvinceUtils.getProvinceIDForEDID(activeEntID)];
    resultList = [resultED, resultProvince, resultLK];
    resultBaseEnt = resultED;
  }

  return (
    <Stack direction="column" sx={{ color: resultBaseEnt.color }}>
      <Grid2 container justifyContent="center">
        {resultList.map(function (result) {
          return (
            <Grid2 key={result.entID}>
              <CumResultsColumnView entID={result.entID} />
            </Grid2>
          );
        })}
      </Grid2>
    </Stack>
  );
}
