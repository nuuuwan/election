import { Box, Typography } from "@mui/material";

import CustomStack from "./CustomStack";

import { FinalOutcomeView, PredictionView } from "../../molecules";
import { Translate } from "../../../nonview/base";

export default function ColumnProjection() {
  return (
    <CustomStack>
      <Box>
        <Typography variant="body1">{Translate("Final Result")}</Typography>
        <Typography variant="h4">{Translate("Projected")}</Typography>
      </Box>

      <PredictionView />
      <FinalOutcomeView />
    </CustomStack>
  );
}
