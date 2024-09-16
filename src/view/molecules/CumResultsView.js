import { Box } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { EntView, ResultsReleasedView } from "../../view/atoms";
import { ResultBarChart, HistoryView, SummaryView } from ".";

import PartyToVotesStatsView from "../../view/molecules/PartyToVotesStatsView";
import { Color } from "../../nonview/base";

function getContentList({ entID, result, electionDisplay }) {
  return [
    <EntView
      entID={entID}
      useLongName={true}
      sx={{ color: result.color, p: 0.5 }}
    />,

    <SummaryView summary={result.summary} />,

    <ResultBarChart resultsElection={electionDisplay} entID={entID} />,
    <PartyToVotesStatsView partyToVotes={result.partyToVotes} />,
    <ResultsReleasedView entID={entID} />,
    <HistoryView entID={entID} />,
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
    ? Color.getColorWithAlpha(result.color, 0.05)
    : "white";

  const border = isActiveEnt ? "5px solid " + result.color : "";

  return (
    <Box sx={{ backgroundColor, border, borderRadius: 6, width: 260 }}>
      {contentList.map(function (content, i) {
        return (
          <Box
            key={i}
            sx={{}}
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
    <tr>
      {contentList.map(function (content, i) {
        return (
          <td key={i} style={{ padding: 12, borderBottom: "1px solid #eee" }}>
            {content}
          </td>
        );
      })}
    </tr>
  );
}

export default function CumResultsView({ entID, direction = "column" }) {
  if (direction === "column") {
    return <CumResultsColumnView entID={entID} />;
  }
  return <CumResultsViewTableRowView entID={entID} />;
}
