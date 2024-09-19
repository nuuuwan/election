import { Box, TableCell, TableRow } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import { Color } from "../../nonview/base";
import {
  ResultBarChart,
  HistoryView,
  SummaryView,
  PartyToVotesStatsView,
} from "../../view/molecules";
import { EntView, ResultsReleasedView, ResultTimeView } from "../../view/atoms";

function getContentList({ entID, result, electionDisplay }) {
  return [
    <EntView
      entID={entID}
      useLongName={true}
      sx={{ color: result.color, p: 0.5 }}
    />,

    <PartyToVotesStatsView partyToVotes={result.partyToVotes} />,
    <ResultBarChart resultsElection={electionDisplay} entID={entID} />,

    <SummaryView summary={result.summary} />,

    <HistoryView entID={entID} />,

    <ResultsReleasedView entID={entID} />,
    <ResultTimeView entID={entID} />,
  ];
}

export function CumResultsColumnView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, activePDID } = data;
  const result = electionDisplay.resultIdx[entID];
  if (!result) {
    return null;
  }

  const contentList = getContentList({ entID, result, electionDisplay });

  const isActiveEnt = activePDID === entID;
  const backgroundColor = isActiveEnt
    ? Color.getColorWithAlpha(result.color, 0.1)
    : "white";

  return (
    <Box sx={{ backgroundColor, borderRadius: 4, width: 240, p: 1.0, m:0.5 }}>
      {contentList.map(function (content, i) {
        return (
          <Box
            key={i}
            sx={{ marginBottom: 1 }}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            display="flex"
          >
            {content}
          </Box>
        );
      })}
    </Box>
  );
}

export function CumResultsViewTableRowView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
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
            style={{ padding: 12, borderBottom: "1px solid #eee", textAlign: "center" }}
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
