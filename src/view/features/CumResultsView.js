import { Box, TableCell, TableRow } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import { Color } from "../../nonview";
import {
  ResultBarChart,
  HistoryView,
  SummaryView,
  PartyToVotesStatsView,
} from "../../view";
import { EntView, ResultsReleasedView, ElectionSmallTitle } from "../../view";

function getContentList({ entID, result, electionDisplay }) {
  const baseEntIDList = electionDisplay.baseEntIDList;
  const iEnt = baseEntIDList.indexOf(entID);
  let num = null;
  if (iEnt !== -1) {
    num = iEnt + 1;
  }

  return [
    <EntView
      entID={entID}
      useLongName={false}
      sx={{ color: result.color, p: 0.5 }}
      num={num}
    />,

    <PartyToVotesStatsView partyToVotes={result.partyToVotes} />,
    <ResultBarChart resultsElection={electionDisplay} entID={entID} />,

    <SummaryView summary={result.summary} />,

    <HistoryView entID={entID} />,

    <ResultsReleasedView entID={entID} />,
  ];
}

export function CumResultsColumnView({ entID }) {
  const data = useDataContext();
  const { electionDisplay, activeEntID } = data;
  const result = electionDisplay.resultIdx[entID];
  if (!result) {
    return null;
  }

  const contentList = getContentList({ entID, result, electionDisplay });

  const isActiveEnt = activeEntID === entID;
  const backgroundColor = isActiveEnt
    ? Color.getColorWithAlpha(result.color, 0.1)
    : "white";

  return (
    <Box sx={{ backgroundColor, borderRadius: 4, width: 240, p: 0.5, m: 0.5 }}>
      {contentList.map(function (content, i) {
        return (
          <Box
            key={i}
            sx={{ marginBottom: 0.5 }}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            display="flex"
          >
            {content}
          </Box>
        );
      })}
      <ElectionSmallTitle />
    </Box>
  );
}

export function CumResultsViewTableRowView({ entID }) {
  const data = useDataContext();
  const { electionDisplay } = data;
  const result = electionDisplay.resultIdx[entID];
  if (!result) {
    return null;
  }
  const contentList = getContentList({ entID, result, electionDisplay });

  return (
    <TableRow>
      {contentList.map(function (content, i) {
        return (
          <TableCell
            key={i}
            style={{
              padding: 12,
              borderBottom: "1px solid #eee",
              textAlign: "center",
            }}
          >
            {content}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

const CumResultsView = null;
export default CumResultsView;
