import { Grid2, Stack } from '@mui/material';
import { useDataContext } from '../../nonview/core/DataProvider';
import CumResultsView from './CumResultsView/CumResultsView';
import { Format, Party, ProvinceUtils } from '../../nonview';
import { ExternalMedia } from '../../view';

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

function getTextLines({ entID, data }) {
  const { allRegionIdx, electionDisplay } = data;
  const ent = allRegionIdx[entID];
  const result = electionDisplay.getResult(entID);
  const partyToPVotesSortedOthered =
    result.partyToVotes.partyToPVotesSortedOthered;
  let lines = [`${ent.hashtagWithType}`, ''];
  for (const [partyID, pVotes] of Object.entries(partyToPVotesSortedOthered)) {
    const party = Party.fromID(partyID);
    lines.push(`${party.emoji} ${Format.percent(pVotes)} ${party.xTag}`);
  }
  return lines;
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
              <ExternalMedia
                id={'latest-result-' + resultType}
                textLines={getTextLines({ entID, data })}
              >
                <CumResultsView mode="ColumnView" entID={entID} />
              </ExternalMedia>
            </Grid2>
          );
        })}
      </Grid2>
    </Stack>
  );
}
