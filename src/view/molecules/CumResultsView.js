import { Stack, Typography } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { EntView } from "../../view/atoms";
import { ResultBarChart, HistoryView, SummaryView } from ".";

import PartyToVotesStatsView from "../../view/molecules/PartyToVotesStatsView";




export default function CumResultsView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election, elections } = data;

  const result = election.resultIdx[entID];
  const resultNum = election.pdResultList.indexOf(result);
  const color = result.color;

  return (
    <Stack
      direction="column"
      gap={0.5}
      alignItems="center"
      sx={{ m: 0.5, p: 0.5 }}
    >
      <Stack direction="row" gap={1} alignItems="center" sx={{color}}> 
      <Typography variant="body1">{resultNum + 1}.</Typography>
      <EntView entID={entID} useLongName={true} />
      </Stack>
      
      <SummaryView summary={result.summary} />
      <ResultBarChart resultsElection={election} entID={entID} />
      <PartyToVotesStatsView partyToVotes={result.partyToVotes} />

      {elections ? <HistoryView entID={entID} /> : null}
    </Stack>
  );
}
