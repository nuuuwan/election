import CustomStack from "./CustomStack";

import { FinalOutcomeView, PredictionView } from "..";

import { ProjectionTitle } from "../../atoms";
import BestBellwetherView from "../BestBellwetherView";
import { Grid, Stack } from "@mui/material";

export default function ColumnProjection() {
  return (
    <CustomStack>
      <ProjectionTitle />

      <PredictionView />
      <Grid container >
        <Grid item xs={12} md={6} xl={6} >
        <FinalOutcomeView />
        </Grid>
        <Grid item xs={12} md={6} xl={6} >
        <BestBellwetherView />
        </Grid>
      </Grid>
    </CustomStack>
  );
}
