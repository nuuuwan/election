import { Stack } from "@mui/material";
import { Format } from "../../nonview/base";
import LabelledStat from "../atoms/LabelledStat";

const N_DISPLAY = 3;

export default function PartyToVotesView({ partyToVotes }) {
  const entries = Object.entries(partyToVotes.partyToPVotesSorted).slice(
    0,
    N_DISPLAY
  );
  return (
    <Stack direction="column">
      {entries.map(function ([party, pVotes]) {
        return (
          <LabelledStat
            key={party}
            label={party}
            valueStr={Format.percent(pVotes, 1)}
          />
        );
      })}
    </Stack>
  );
}
