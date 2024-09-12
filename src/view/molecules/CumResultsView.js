import { Card, Stack, Typography } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { EntView } from "../../view/atoms";
import { ResultBarChart, HistoryView, SummaryView } from ".";

import PartyToVotesStatsView from "../../view/molecules/PartyToVotesStatsView";
import { Color } from "../../nonview/base";

export default function CumResultsView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election, elections } = data;

  const result = election.resultIdx[entID];
  const resultNum = election.pdResultList.indexOf(result);

  const opacity = Color.getOpacity(result.pWinner);
  const backgroundColor = Color.getColorWithAlpha(result.color, opacity);
  const color = Color.getTextColor(backgroundColor, opacity);
  return (
    <Card  sx={{ m: 1, p:1}}>
   
    <Stack
      direction="column"
      gap={0.5}
      alignItems="center"
     
    >
      <Stack direction="row" gap={1} sx={{ backgroundColor, color, width: "100%", p:1 , alignItems:"center" , justifyContent:"center"}}>
        <Typography variant="body1">{resultNum + 1}.</Typography>
        <EntView entID={entID} useLongName={true} />
      </Stack>

      <SummaryView summary={result.summary} />
      <ResultBarChart resultsElection={election} entID={entID} />
      <PartyToVotesStatsView partyToVotes={result.partyToVotes} />

      {elections ? <HistoryView entID={entID} /> : null}
    </Stack>
    </Card>
   
  );
}
