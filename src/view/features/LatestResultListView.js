import { Grid2, Stack } from '@mui/material';
import { useDataContext } from '../../nonview/core/DataProvider';
import CumResultsView from './CumResultsView/CumResultsView';
import { ProvinceUtils } from '../../nonview';

function getResultsIdx({ allRegionIdx, electionDisplay, activeEntID }) {
  const resultIdx = electionDisplay.resultIdx;

  const ent = allRegionIdx[activeEntID];

  const resultLK = resultIdx.LK;

  const resultPD = electionDisplay.resultIdx[activeEntID];
  const resultED = resultIdx[ent.d.ed_id];
  const resultProvince = resultIdx[ProvinceUtils.getProvinceIDForPDEnt(ent)];

  return {
    pd: resultPD,
    ed: resultED,
    province: resultProvince,
    lk: resultLK,
  };
}

export default function LatestResultListView() {
  const data = useDataContext();
  const { allRegionIdx, electionDisplay, activeEntID } = data;

  const resultsIdx = getResultsIdx({
    allRegionIdx,
    electionDisplay,
    activeEntID,
  });

  return (
    <Stack direction="column">
      <Grid2 container justifyContent="center">
        {Object.entries(resultsIdx).map(function ([resultType, result]) {
          return (
            <Grid2 key={result.entID}>
              <div id={'latest-result-' + resultType}>
                <CumResultsView mode="ColumnView" entID={result.entID} />
              </div>
            </Grid2>
          );
        })}
      </Grid2>
    </Stack>
  );
}
