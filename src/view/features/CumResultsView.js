import { Box, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import {
  ResultBarChart,
  HistoryView,
  SummaryView,
  PartyToVotesStatsView,
  EntView,
  ResultsReleasedView,
  ElectionSmallTitle,
} from "../../view";

function getContentList({ entID, result, electionDisplay }) {
  const baseEntIDList = electionDisplay.baseEntIDList;
  const iEnt = baseEntIDList.indexOf(entID);
  let num = null;
  if (iEnt !== -1) {
    num = iEnt + 1;
  }

  const color = result.color;
  const background = "white";

  const sx = { color, background, p: 1, borderRadius: 1 };
  const partyToPVotes =
  electionDisplay.getResult(entID).partyToVotes.partyToPVotesSortedOthered;

  return [
    <Stack key="0" direction="row" gap={0.5} alignItems="center" sx={sx}>
      {num ? <Typography variant="h5">{num}.</Typography> : null}
      <EntView entID={entID} />
    </Stack>,

    <PartyToVotesStatsView key="1" partyToVotes={result.partyToVotes} />,
    <ResultBarChart key="2" partyToPVotes={partyToPVotes} />,

    <SummaryView key="3" summary={result.summary} />,

    <HistoryView key="4" entID={entID} />,

    <ResultsReleasedView key="5" entID={entID} />,
  ];
}

export function CumResultsColumnView({ entID }) {
  const data = useDataContext();
  const { electionDisplay, activeEntID } = data;
  const result = electionDisplay.resultIdx[entID];
  if (!result) {
    return null;
  }

  const contentList = getContentList({
    entID,
    activeEntID,
    result,
    electionDisplay,
  });

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
