import { Box, Grid2, Typography } from "@mui/material";
import { useDataContext } from "../../../nonview/core/DataProvider";
import {
  CustomAlert,
  IfElse,
  NoResultsAlert,
  ResultsReleasedTitle,
} from "../../atoms";
import {
  ProjectionView,
  HexMapView,
  LatestResultListView,
  AggregatedResultView,
  BellwetherView,
} from "../../molecules";
import { ResultsReleasedAlert } from "../../atoms/ResultsReleasedTitle";
import { Translate } from "../../../nonview/base";

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

            <CustomAlert>
              <Typography variant="body1">
                {Translate(
                  "Click on hexagons for Polling Division and Postal Vote results, or the most recent result for Provinces and Electoral Districts."
                )}
              </Typography>{" "}
            </CustomAlert>

            <ResultsReleasedAlert />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
            <ResultsReleasedTitle mode="n" />
            <LatestResultListView />
            <BellwetherView />

            <CustomAlert severity="warning">
              <Typography variant="body1">
                {Translate(
                  "Past History in Electoral District, Province, and Sri Lanka, correspond to the results released so for, and not the final result."
                )}
              </Typography>{" "}
            </CustomAlert>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
            <ProjectionView />
          </Grid2>
        </Grid2>
        <Box sx={{ marginTop: 15, p: 1, borderTop: "1px solid #eee" }}>
          <AggregatedResultView />
        </Box>
      </IfElse>
    </Box>
  );
}
