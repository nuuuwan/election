import { Grid, Stack } from "@mui/material";
import { ProvinceUtils } from "../../../nonview/base";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { CumResultsTitle, LatestResultTitle } from "../../../view/atoms";
import {
  PDSelector,
  BellwetherView,
  MultiResultsBarChart,
  HistoryView,
  SummaryView,
} from "../../../view/molecules";
import CustomStack from "./CustomStack";
import PartyToVotesStatsView from "../PartyToVotesView/PartyToVotesStatsView";

export default function ColumnLatestResult() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, elections } = data;
  const activePDID = electionDisplay.finalPDID;
  const activeEDID = activePDID.substring(0, 5);
  const activeProvinceID = ProvinceUtils.getProvinceIDForEDID(activeEDID);

  const entIDs = [activePDID, activeEDID, activeProvinceID, "LK"];

  return (
    <CustomStack>
      <LatestResultTitle />
      <PDSelector activePDID={activePDID} />

      <Grid container rowGap={3} >
        {entIDs.map(function (entID, iEnt) {
          const result = electionDisplay.resultIdx[entID];
          const partyToVotes = result.partyToVotes;

          return (
            <Grid item xs={12} md={6} xl={6} key={entID}>
              <Stack direction="column" gap={0.1} alignItems="center">
                <CumResultsTitle entID={entID} />
                <SummaryView summary={result.summary} />

                <MultiResultsBarChart
                  resultsElection={electionDisplay}
                  entIDs={[entID]}
                />

                <PartyToVotesStatsView partyToVotes={partyToVotes} />
                {elections ? <HistoryView entID={entID} /> : null}
              </Stack>
            </Grid>
          );
        })}
      </Grid>

      <BellwetherView />
    </CustomStack>
  );
}
