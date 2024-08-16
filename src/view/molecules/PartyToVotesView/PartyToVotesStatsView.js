import { Stack } from "@mui/material";
import { Format } from "../../../nonview/base";
import { Party } from "../../../nonview/core";
import { LabelledStat, PartyView } from "../../atoms";


export default function PartyToVotesStatsView({ partyToVotes,  }) {
  const entries = Object.entries(partyToVotes.partyToVotesSortedOthered);

  return (
    <Stack direction="column" gap={0.1}>

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
