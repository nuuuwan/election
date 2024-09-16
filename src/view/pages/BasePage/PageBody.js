import { Box, Grid2, Typography } from "@mui/material";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { IfElse, NoResultsAlert, ResultsReleasedTitle } from "../../atoms";
import {
  ProjectionView,
  HexMapView,
  LatestResultListView,
  RegionResultListView,
  BellwetherView,
} from "../../molecules";

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
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
            <ResultsReleasedTitle mode="n" />
            <LatestResultListView />
            <BellwetherView />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
            <ProjectionView />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 12, xl: 12 }}>
            <RegionResultListView />
          </Grid2>
        </Grid2>
      </IfElse>
    </Box>
  );
}
