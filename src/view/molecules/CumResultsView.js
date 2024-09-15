import { Box } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { EntView, ResultsReleasedView } from "../../view/atoms";
import { ResultBarChart, HistoryView, SummaryView } from ".";

import PartyToVotesStatsView from "../../view/molecules/PartyToVotesStatsView";
import { Color } from "../../nonview/base";

export default function CumResultsView({ entID, direction = "column" }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, activePDID } = data;

  const isActiveEnt = activePDID === entID;

  const result = electionDisplay.resultIdx[entID];
  if (!result) {
    return null;
  }

  const backgroundColor = isActiveEnt
    ? Color.getColorWithAlpha(result.color, 0.05)
    : "white";

  const border = isActiveEnt ? "5px solid " + result.color : "";

  const contentList = [
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

  if (direction === "column") {
    return (
      <Box sx={{ p: 1, backgroundColor, border, borderRadius: 6 }}>
        {contentList.map(function (content, i) {
          return (
            <Box
              key={i}
              sx={{ p: 0.3, m: 0.15 }}
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
