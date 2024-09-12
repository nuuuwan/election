import { Grid } from "@mui/material";

import { useDataContext } from "../../nonview/core/DataProvider";
import { ProjectionTitle, CustomStack } from "../atoms";
import {
  BestBellwetherView,
  FinalOutcomeView,
  PartyToVotesStatsView,
  SummaryView,
  ProjectedResultBarChart,
} from ".";

export default function ProjectionView() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { projectedElection } = data;
  const resultLK = projectedElection.resultLK;

  return (
    <CustomStack>
      <ProjectionTitle />

      <SummaryView summary={resultLK.summary} />
      <ProjectedResultBarChart />
      <PartyToVotesStatsView partyToVotes={resultLK.partyToVotes} />

      <Grid container>
        <Grid item xs={12} md={6}>
          <FinalOutcomeView />
        </Grid>

        <Grid item xs={12} md={6}>
          <BestBellwetherView />
        </Grid>
      </Grid>
    </CustomStack>
  );
}
