import { Stack } from "@mui/material";
import { Format } from "../../../nonview/base";
import { Party } from "../../../nonview/core";
import { LabelledStat, PartyView } from "../../atoms";

export default function PartyToVotesStatsView({ partyToVotes }) {
  const entries = Object.entries(partyToVotes.partyToVotesSortedOthered);
  const totalVotes = partyToVotes.totalVotes;

  return (
    <Stack direction="column" gap={0.5}>
      {entries.map(function ([partyID, votes], i) {
        const pVotes = votes / totalVotes;
        const color = Party.fromID(partyID).color;
        return (
          <LabelledStat
            key={partyID}
            label={<PartyView partyID={partyID} pVotes={pVotes} />}
            valueStr={Format.percentVotes(pVotes)}
            sx={{ color }}
          />
        );
      })}
    </Stack>
  );
}
