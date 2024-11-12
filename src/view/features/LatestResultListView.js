import { Grid2, Stack } from '@mui/material';
import { useDataContext } from '../../nonview/core/DataProvider';
import CumResultsView from './CumResultsView/CumResultsView';

import { ExternalMedia } from '../../view';

function getResultsIdx({ allRegionIdx, electionDisplay, activeEntID }) {
  const resultIdx = electionDisplay.resultIdx;

  const ent = allRegionIdx[activeEntID];

  const resultLK = resultIdx.LK;

  const resultPD = electionDisplay.resultIdx[activeEntID];
  const resultED = resultIdx[ent.d.ed_id];
  const resultProvince = resultIdx[ent.d.province_id];

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
          const entID = result.entID;
          return (
            <Grid2 key={entID}>
              <ExternalMedia id={'latest-result-' + resultType}>
                <CumResultsView mode="ColumnView" entID={entID} />
              </ExternalMedia>
            </Grid2>
          );
        })}
      </Grid2>
    </Stack>
  );
}
