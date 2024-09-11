import CustomStack from "./CustomStack";

import { FinalOutcomeView, PartyToVotesStatsView, SummaryView } from "..";

import { ProjectionTitle } from "../../atoms";
import BestBellwetherView from "../BestBellwetherView";

import ProjectedResultBarChart from "../ProjectedResultPieChart";
import { useDataContext } from "../../../nonview/core/DataProvider";

import { Grid } from "@mui/material";

export default function ColumnProjection() {
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
