import { Stack } from "@mui/material";
import { Format } from "../../nonview/base";
import { Party } from "../../nonview/core";
import { LabelledStat, PartyView } from "../../view/atoms";

const N_DISPLAY = 3;

export default function PartyToVotesView({ partyToVotes }) {
  const entries = Object.entries(partyToVotes.partyToPVotesSorted).slice(
    0,
    N_DISPLAY
  );
  return (
    <Stack direction="column">
      {entries.map(function ([partyID, pVotes]) {
        return (
          <LabelledStat
            key={partyID}
            label={<PartyView partyID={partyID} />}
            valueStr={Format.percent(pVotes, 1)}
            sx={{ color: Party.fromID(partyID).color }}
          />
        );
      })}
    </Stack>
  );
}
