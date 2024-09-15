import { Box, Card,  } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { EntView, ResultsReleasedView } from "../../view/atoms";
import { ResultBarChart, HistoryView, SummaryView } from ".";

import PartyToVotesStatsView from "../../view/molecules/PartyToVotesStatsView";

export default function CumResultsView({ entID, direction = "column" }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;

  const result = electionDisplay.resultIdx[entID];
  if (!result) {
    return null;
  }

  const contentList = [
    <EntView entID={entID} useLongName={true} sx={{color:result.color, p:0.5}}/>,
    <ResultsReleasedView entID={entID} />,
    <SummaryView summary={result.summary} />,

    <ResultBarChart resultsElection={electionDisplay} entID={entID} />,
    <PartyToVotesStatsView partyToVotes={result.partyToVotes} />,



    <HistoryView entID={entID} />,
  ];

  if (direction === "column") {
    

  return (
    <Card variant="outlined" sx={{p:1}}>

      {contentList.map(function (content, i) {
        return (
          <Box
            key={i}
            sx={{ width: 200, height: 45, p: 0.0, m: 0.0 }}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            display="flex"
          >
            {content}
          </Box>
        );
      })}
</Card>
  );

}
  return (
    <tr>
       {contentList.map(function (content, i) {
        return (
          <td
            key={i}
            style={{padding: 12, borderBottom: "1px solid #eee"}}
          >
            {content}
          </td>
        );
      })}
    </tr>
  )


}
