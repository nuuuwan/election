import { Box, Grid2, Typography } from "@mui/material";
import { useDataContext } from "../../../nonview/core/DataProvider";

import { ArrayX, Format, Translate } from "../../../nonview/base";
import { Election } from "../../../nonview/core";
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

const STYLE = {
  BOX: { paddingTop: 1, paddingBottom: 20 },
};

function HistoryAlert() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election, elections, nResultsDisplay } = data;

  const previousElections = Election.getPreviousElectionsOfSameType(
    elections,
    election
  );

  const previousElectionsDisplay = previousElections.map(function (
    previousElection
  ) {
    return previousElection.getSubsetElectionByEntIDList(
      election.baseEntIDList
    );
  });

  const previousElectionDisplay = ArrayX.last(previousElectionsDisplay);

  const year = previousElectionDisplay.year;
  const resultLK = previousElectionDisplay.resultLK;

  const winningPartyID = resultLK.partyToVotes.winningPartyID;
  const pWinner = resultLK.partyToVotes.pWinner;

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
    <Box sx={{ marginTop: 15, p: 1, borderTop: "1px solid #eee" }}>
      <AggregatedResultView />
    </Box>
  );
}

function CustomPageBodyGridItem({ children }) {
  return <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>{children}</Grid2>;
}

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
          <CustomPageBodyGridItem>
            <ResultsReleasedTitle mode="percent" />
            <LatestResultListView />
            <BellwetherView />
            <HistoryAlert />
            <ResultsReleasedAlert />
          </CustomPageBodyGridItem>

          <CustomPageBodyGridItem>
            <ResultsReleasedTitle mode="n" />
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
