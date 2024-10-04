import { Stack } from "@mui/material";
import { Format, Seats } from "../../nonview";
import { Party } from "../../nonview";
import { LabelledStat, PartyView } from "..";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";

export default function PartyToSeatsStatsView() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const { electionProjected } = data;
  const seats = Seats.fromElection(electionProjected);
  const entries = Object.entries(seats.partyToSeats);

  return (
    <Stack direction="row" gap={1}>
      {entries.map(function ([partyID, seats], i) {
        const color = Party.fromID(partyID).color;
        return (
          <LabelledStat
            key={partyID}
            label={<PartyView partyID={partyID} />}
            stat={Format.intHumanize(seats)}
            sx={{ color }}
          />
        );
      })}
    </Stack>
  );
}
