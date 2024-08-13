import { Stack } from "@mui/material";
import { Format } from "../../../nonview/base";
import { Party } from "../../../nonview/core";
import { LabelledStat, PartyView } from "../../atoms";
import PartyToVotesPieChart from "./PartyToVotesPieChart";

export default function PartyToVotesView({ partyToVotes }) {
  const entries = Object.entries(partyToVotes.partyToVotesSortedOthered);

  return (
    <Stack direction="column" gap={0.5}>
      <PartyToVotesPieChart partyToVotes={partyToVotes} />

      {entries.map(function ([partyID, votes], i) {
        return (
          <LabelledStat
            key={partyID}
            label={<PartyView partyID={partyID} />}
            valueStr={Format.intHumanize(votes)}
            sx={{ color: Party.fromID(partyID).color }}
          />
        );
      })}
    </Stack>
  );
}
