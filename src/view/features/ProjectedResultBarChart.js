import { Box } from "@mui/material";

import { Color, Format, Party } from "../../nonview";

import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import CustomLoadingProgress from "../base/CustomLoadingProgress";
import SVGMultiBarChart from "../base/SVGBarChart.js/SVGBarChart";

export default function ProjectedResultBarChart() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionProjected } = data;

  const resultLK = electionProjected.resultLK;
  const partyToPVotesSortedOthered =
    resultLK.partyToVotes.partyToPVotesSortedOthered;

  return (
    <Box sx={{ p: 0, m: 0 }}>
      <SVGMultiBarChart
        dataList={Object.entries(partyToPVotesSortedOthered)
          .filter(([partyID, pVotes]) => !Party.fromID(partyID).isNonParty)
          .map(function ([partyID, pVotes]) {
            const pVotesError = partyToPVotesSortedOthered[Party.ERROR.id] || 0;
            return {
              partyID: partyID,
              pVotesMin: pVotes,
              pVotesError: pVotesError,
            };
          })}
        getValues={function (data, i) {
          return [data.pVotesMin, data.pVotesError];
        }}
        getColor={function (data, i, pVotes, j) {
          const color = Party.fromID(data.partyID).color;
          if (j === 0) {
            return color;
          }
          return Color.getColorWithAlpha(color, 0.5);
        }}
        formatRowValue={function (data, i) {
          const pVotesMin = data.pVotesMin;
          const pVotesError = data.pVotesError;
          const pVotesMax = pVotesMin + pVotesError;
          return Format.percentVotesRange(pVotesMin, pVotesMax);
        }}
        sx={{ width: 360, height: 180 }}
      />
    </Box>
  );
}
