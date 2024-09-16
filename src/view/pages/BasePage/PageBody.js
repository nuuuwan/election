import { Box, Grid2, Typography } from "@mui/material";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { IfElse, NoResultsAlert, ResultsReleasedTitle } from "../../atoms";
import {
  ProjectionView,
  HexMapView,
  LatestResultListView,
  AggregatedResultView,
  BellwetherView,
} from "../../molecules";
import { ResultsReleasedAlert } from "../../atoms/ResultsReleasedTitle";

const STYLE = {
  BOX: { paddingTop: 1, paddingBottom: 20 },
};

export default function PageBody() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;

  return (
    <Box sx={STYLE.BOX}>
      <IfElse condition={electionDisplay.nResults === 0}>
        <NoResultsAlert />
        <Grid2 container>
          <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
            <Typography variant="h4">
              <ResultsReleasedTitle mode="percent" />
            </Typography>
            <HexMapView />
            <ResultsReleasedAlert />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
            <ResultsReleasedTitle mode="n" />
            <LatestResultListView />
            <BellwetherView />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
            <ProjectionView />
          </Grid2>
        </Grid2>
        <Box sx={{ marginTop: 5, p: 1, borderTop: "1px solid #eee" }}>
          <AggregatedResultView />
        </Box>
      </IfElse>
    </Box>
  );
}
