import { Stack } from "@mui/material";
import { Format, Party } from "../../nonview";
import { LabelledStat, PartyView } from "..";

export default function PartyToVotesStatsView({ partyToVotes }) {
  const entries = Object.entries(partyToVotes.partyToVotesSortedOthered);

  return (
    <Stack direction="row" gap={1}>
      {entries
        .filter(function (entry) {
          return entry[1] > 0;
        })
        .map(function ([partyID, votes]) {
          const color = Party.fromID(partyID).color;
          return (
            <LabelledStat
              key={partyID}
              label={<PartyView partyID={partyID} />}
              stat={Format.intHumanize(votes)}
              sx={{ color }}
            />
          );
        })}
    </Stack>
  );
}
