import { useDataContext } from "../../nonview/core/DataProvider";
import { CustomStack } from "../atoms";
import {
  FinalOutcomeView,
  PartyToVotesStatsView,
  SummaryView,
  ProjectedResultBarChart,
} from ".";
import { Typography } from "@mui/material";
import { Translate } from "../../nonview/base";

export default function ProjectionView() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionProjected } = data;
  const resultLK = electionProjected.resultLK;

  return (
    <CustomStack>
      <Typography variant="h3">
        {Translate("Final Result Projected")}
      </Typography>

      <SummaryView summary={resultLK.summary} />
      <ProjectedResultBarChart />
      <PartyToVotesStatsView partyToVotes={resultLK.partyToVotes} />

      <FinalOutcomeView />
    </CustomStack>
  );
}
