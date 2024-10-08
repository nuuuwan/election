import { Box, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import { Color } from "../../nonview";
import {
  ResultBarChart,
  HistoryView,
  SummaryView,
  PartyToVotesStatsView,
} from "../../view";
import { EntView, ResultsReleasedView, ElectionSmallTitle } from "../../view";

function getContentList({ entID, activeEntID, result, electionDisplay }) {
  const baseEntIDList = electionDisplay.baseEntIDList;
  const iEnt = baseEntIDList.indexOf(entID);
  let num = null;
  if (iEnt !== -1) {
    num = iEnt + 1;
  }

  let color = result.color;
  let background = "white";

  if (entID === activeEntID) {
    [color, background] = [background, color];
  }

  const sx = { color, background, p: 1, borderRadius: 1 };

  return [
    <Stack direction="row" gap={0.5} alignItems="center" sx={sx}>
      {num ? <Typography variant="h4">{num}.</Typography> : null}
      <EntView
        entID={entID}
      />
    </Stack>,

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

  const contentList = getContentList({ entID, activeEntID, result, electionDisplay });

  return (
    <Box sx={{ borderRadius: 4, width: 260, p: 0.5, m: 0.5 }}>
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
