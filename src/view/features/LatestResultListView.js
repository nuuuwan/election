import { Grid2, Stack } from '@mui/material';
import { useDataContext } from '../../nonview/core/DataProvider';
import CumResultsView from './CumResultsView/CumResultsView';
import { ProvinceUtils } from '../../nonview';

function getResultList({ allRegionIdx, electionDisplay, activeEntID }) {
  const resultIdx = electionDisplay.resultIdx;

  const ent = allRegionIdx[activeEntID];

  const resultLK = resultIdx.LK;

  const resultPD = electionDisplay.resultIdx[activeEntID];
  const resultED = resultIdx[ent.d.ed_id];
  const resultProvince = resultIdx[ProvinceUtils.getProvinceIDForPDEnt(ent)];

  return [resultPD, resultED, resultProvince, resultLK];
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
              <CumResultsView mode="ColumnView" entID={result.entID} />
            </Grid2>
          );
        })}
      </Grid2>
    </Stack>
  );
}
