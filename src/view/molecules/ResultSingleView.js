import { Box, Stack, Typography } from "@mui/material";
import SummaryView from "../../view/molecules/SummaryView";
import PartyToVotesView from "./PartyToVotesView/PartyToVotesView";
import { Result } from "../../nonview/core";

export default function ResultSingleView({ election, elections, entID, entIDs, chartSize }) {
  let result;
  if (entIDs) {
      result = Result.fromList(entID, entIDs.map(
          entID => election.resultsIdx[entID]
      ));
  }else {
      result = election.resultsIdx[entID];
  }



  if (!result) {
    return null;
  }
  if (result.summary.valid === 0) {
    return (
      <Box>
        <Typography variant="h6">No Results to Aggregate.</Typography>
      </Box>
    );
  }

  return (
    <Stack direction="column" gap={0}>
      <SummaryView summary={result.summary} />
      <PartyToVotesView
        election={election}
        entID={entID}
        chartSize={chartSize}
        elections={elections}
        entIDs={entIDs}
      />
    </Stack>
  );
}
