import { Box,Grid2, Stack, Typography } from "@mui/material";
import { useDataContext } from "../../../nonview/core/DataProvider";

import { Format, Translate } from "../../../nonview";

import {
  CustomAlert,
  IfElse,
  NoResultsAlert,
  ProjectionView,
  HexMapView,
  LatestResultListView,
  AggregatedResultView,
  BellwetherView,
  MonitoringView,
  DisclaimerView,

  ResultsReleasedTitlePercent,
  ResultsReleasedTitleNumber,
  CustomLoadingProgress,
} from "../..";

const STYLE = {
  BOX: { paddingTop: 1, paddingBottom: 20 },
};

function HistoryAlert() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { nResultsDisplay, electionPrevious } = data;

  if (!electionPrevious) {
    return null;
  }

  const year = electionPrevious.year;
  const partyToVotes = electionPrevious.resultLK.partyToVotes;
  const winningPartyID = partyToVotes.winningPartyID;
  const pWinner = partyToVotes.pWinner;

  return (
    <CustomAlert severity="warning">
      <Typography variant="body1">
        {Translate(
          "Past history refers to results released so far, not the final outcome. For example, in %1, in the %2 polling divisions where results had been released, the %3 was leading nationwide with %4.",
          [year, nResultsDisplay, winningPartyID, Format.percent(pWinner)]
        )}
      </Typography>
    </CustomAlert>
  );
}

function HexagonClickAlert() {
  return (
    <CustomAlert>
      <Typography variant="body1">
        {Translate(
          "Click on the hexagons to view Polling Division and Postal Vote results, or to see the most recent results for Provinces and Electoral Districts."
        )}
      </Typography>{" "}
    </CustomAlert>
  );
}

function PageBelowTheFold() {
  return (
    <Stack
      direction="column"
      gap={3}
      sx={{ marginTop: 15, p: 1, borderTop: "1px solid #eee" }}
    >
      <AggregatedResultView />
      <MonitoringView />
      <DisclaimerView />
    </Stack>
  );
}

function CustomPageBodyGridItem({ children }) {
  return <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>{children}</Grid2>;
}

export default function PageBody() {
  const data = useDataContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
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
            <HexagonClickAlert />
          </CustomPageBodyGridItem>

          <CustomPageBodyGridItem>
            <ProjectionView />
          </CustomPageBodyGridItem>
        </Grid2>
        <PageBelowTheFold />
      </IfElse>
    </Box>
  );
}
