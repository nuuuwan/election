import { Stack } from "@mui/material";
import { Format } from "../../nonview/base";
import { Party } from "../../nonview/core";
import { LabelledStat, PartyView } from "../atoms";

export default function PartyToVotesStatsView({ partyToVotes }) {
  const entries = Object.entries(partyToVotes.partyToVotesSortedOthered);

  return (
    <Stack direction="row" gap={0.5}>
      {entries.filter(
        function([partyID, votes]) {
          return !Party.fromID(partyID).isNonParty;
        }
      ).map(function ([partyID, votes], i) {
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
