import { Grid2, Stack } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { CumResultsColumnView } from "./CumResultsView";
import { EntType, ProvinceUtils } from "../../nonview";

function getResultList({ allRegionIdx, electionDisplay, activeEntID }) {
  const resultIdx = electionDisplay.resultIdx;

  const ent = allRegionIdx[activeEntID];

  let resultList;
  const resultLK = resultIdx["LK"];
  if (electionDisplay.baseEntType === EntType.PD) {
    const resultPD = electionDisplay.resultIdx[activeEntID];
    const resultED = resultIdx[ent.d.ed_id];
    const resultProvince = resultIdx[ProvinceUtils.getProvinceIDForPDEnt(ent)];
    resultList = [resultPD, resultED, resultProvince, resultLK];
  } else if (electionDisplay.baseEntType === EntType.ED) {
    const resultED = resultIdx[activeEntID];
    const resultProvince =
      resultIdx[ProvinceUtils.getProvinceIDForEDID(activeEntID)];
    resultList = [resultED, resultProvince, resultLK];
  }

  return resultList;
}

export default function LatestResultListView() {
  const data = useDataContext();
  const { allRegionIdx, electionDisplay, activeEntID } = data;

  const resultList = getResultList({
    allRegionIdx,
    electionDisplay,
    activeEntID,
  });

  return (
    <Stack direction="column" sx={{ color: resultList[0].color }}>
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
