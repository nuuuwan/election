import { Box, Grid2 } from "@mui/material";
import { useDataContext } from "../../../../nonview/core/DataProvider";

import PageBodyBelowTheFold from "./PageBodyBelowTheFold";

import {
  HistoryAlert,
  HexagonClickAlert,
  NoResultsAlert,
  HexMapView,
  LatestResultListView,
  BellwetherView,
  ResultsReleasedTitlePercent,
  ResultsReleasedTitleNumber,
  ProjectionViewPresidential,
  ProjectionViewParliamentary,
  ElectionSmallTitle,
} from "../../../";

const STYLE = {
  BOX: { paddingTop: 10, paddingBottom: 20 },
};

function CustomPageBodyGridItem({ children }) {
  return <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>{children}</Grid2>;
}

export default function PageBody() {
  const data = useDataContext();
  const { electionDisplay } = data;

  if (!electionDisplay.nResults) {
    return <NoResultsAlert election={electionDisplay} />;
  }

  return (
    <Box sx={STYLE.BOX}>
    
      <Grid2 container>
        <CustomPageBodyGridItem>
          <ResultsReleasedTitlePercent />
          <LatestResultListView />
          <BellwetherView />
          <HistoryAlert />
        </CustomPageBodyGridItem>

        <CustomPageBodyGridItem>
          <ResultsReleasedTitleNumber />
          <HexMapView />
          <ElectionSmallTitle />
          <HexagonClickAlert />
        </CustomPageBodyGridItem>

        <CustomPageBodyGridItem>
          {electionDisplay.isPresidential ? (
            <ProjectionViewPresidential />
          ) : (
            <ProjectionViewParliamentary />
          )}
        </CustomPageBodyGridItem>
      </Grid2>
      <PageBodyBelowTheFold />

    </Box>
  );
}
