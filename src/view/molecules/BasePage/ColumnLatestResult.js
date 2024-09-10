import { Stack } from "@mui/material";
import { ProvinceUtils } from "../../../nonview/base";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { LatestResultTitle } from "../../../view/atoms";
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
  const { electionDisplay , elections} = data;
  const activePDID = electionDisplay.finalPDID;
  const activeEDID = activePDID.substring(0, 5);
  const activeProvinceID = ProvinceUtils.getProvinceIDForEDID(
    activeEDID
  )

  const result = electionDisplay.resultIdx[activePDID];
  const partyToVotes = result.partyToVotes;


  return (
    <CustomStack>
      <LatestResultTitle />
      <PDSelector activePDID={activePDID} />

      <SummaryView summary={result.summary} />


      <MultiResultsBarChart resultsElection={electionDisplay} entIDs={[activePDID, activeEDID, activeProvinceID, 'LK']} />


      <Stack direction="row" gap={4} sx={{ margin: "auto" }}>
        <PartyToVotesStatsView partyToVotes={partyToVotes} />
        {elections ? <HistoryView entID={activePDID} /> : null}
      </Stack>

      <BellwetherView />
    </CustomStack>
  );
}
