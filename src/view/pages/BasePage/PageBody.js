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
    return previousElection.getSubsetElectionByPDIDList(election.pdIDList);
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
          "Past History corresponds to the results released so for, and not the final result. "
        )}

        {Translate(
          "E.g. In %1, for the %2 polling divisions with results released, the %3 led Islandwide, with %4.",
          [year, nResultsDisplay, winningPartyID, Format.percent(pWinner)]
        )}
      </Typography>
    </CustomAlert>
  );
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
          <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
            <Typography variant="h4">
              <ResultsReleasedTitle mode="percent" />
            </Typography>

            <LatestResultListView />
            <BellwetherView />

            <HistoryAlert />
            <ResultsReleasedAlert />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
            <ResultsReleasedTitle mode="n" />

            <HexMapView />

            <CustomAlert>
              <Typography variant="body1">
                {Translate(
                  "Click on hexagons for Polling Division and Postal Vote results, or the most recent result for Provinces and Electoral Districts."
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
