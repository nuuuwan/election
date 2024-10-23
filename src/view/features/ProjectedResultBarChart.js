import { Color, Format, Party } from '../../nonview';

import { useDataSlowContext } from '../../nonview/core/DataSlowProvider';
import CustomLoadingProgress from '../base/CustomLoadingProgress';
import SVGBarChart from '../base/SVGBarChart.js/SVGBarChart';

function formatRowValue(data) {
  const pVotesMin = data.pVotesMin;
  const pVotesError = data.pVotesError;
  const pVotesMax = pVotesMin + pVotesError;
  return Format.percentRange(pVotesMin, pVotesMax);
}

export default function ProjectedResultBarChart() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionProjectedWithError, electionProjected, electionDisplay } =
    data;
  const election =
    electionProjectedWithError || electionProjected || electionDisplay;
  const resultLK = election.resultLK;
  const partyToPVotesSortedOthered =
    resultLK.partyToVotes.partyToPVotesSortedOthered;
  return (
    <SVGBarChart
      dataList={Object.entries(partyToPVotesSortedOthered)
        .filter((entry) => !Party.fromID(entry[0]).isNonParty)
        .map(function ([partyID, pVotes]) {
          const pVotesError =
            resultLK.partyToVotes.partyToPVotes[Party.ERROR.id] || 0;
          return {
            partyID,
            pVotesMin: pVotes,
            pVotesError,
          };
        })}
      getValues={function (data) {
        return [data.pVotesMin, data.pVotesError];
      }}
      getColor={function (data, i, pVotes, j) {
        const color = Party.fromID(data.partyID).color;
        if (j === 0) {
          return color;
        }
        return Color.getColorWithAlpha(color, 0.5);
      }}
      formatRowValue={formatRowValue}
      sx={{ width: 360, height: 180 }}
    />
  );
}
