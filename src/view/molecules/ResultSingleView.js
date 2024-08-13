import { Stack } from "@mui/material";
import SummaryView from "../../view/molecules/SummaryView";
import PartyToVotesView from "./PartyToVotesView/PartyToVotesView";

export default function ResultSingleView({ result }) {
  if (!result) {
    return null;
  }
  const entID = result.entID;

  return (
    <Stack key={entID} direction="column" gap={0}>
      <SummaryView summary={result.summary} />
      <PartyToVotesView partyToVotes={result.partyToVotes} />
    </Stack>
  );
}
