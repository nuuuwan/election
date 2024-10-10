
import { Box, Grid2,  } from "@mui/material";
import { useDataContext } from "../../../../nonview/core/DataProvider";

import PageBodyBelowTheFold from './PageBodyBelowTheFold';

import {
  HistoryAlert,
  HexagonClickAlert,
  IfElse,
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

  return (
    <Box sx={STYLE.BOX}>
      <IfElse condition={!electionDisplay.nResults}>
        <NoResultsAlert election={electionDisplay} />
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
      </IfElse>
    </Box>
  );
}
