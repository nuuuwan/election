import CustomStack from "./CustomStack";

import { FinalOutcomeView, PredictionView } from "..";

import { ProjectionTitle } from "../../atoms";

export default function ColumnProjection() {
  return (
    <CustomStack>
      <ProjectionTitle />

      <PredictionView />
      <FinalOutcomeView />
    </CustomStack>
  );
}
