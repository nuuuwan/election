import { Box, Grid2 } from "@mui/material";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { IfElse, NoResultsAlert } from "../../atoms";
import {
  ProjectionView,
  HexMapView,
  LatestResultListView,
  RegionResultListView,
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
          <Grid2 size={{ xs: 12, md: 6, xl: 4 }} >
            <LatestResultListView />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, xl: 4}} >
            <HexMapView />
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
