import CustomStack from "./CustomStack";

import { FinalOutcomeView, PredictionView } from "..";

import { ProjectionTitle } from "../../atoms";
import BestBellwetherView from "../BestBellwetherView";
import { Stack } from "@mui/material";

export default function ColumnProjection() {
  return (
    <CustomStack>
      <ProjectionTitle />

      <PredictionView />
      <Stack direction="row" gap={3} justifyContent="center">
        <FinalOutcomeView />
        <BestBellwetherView />
      </Stack>
    </CustomStack>
  );
}
