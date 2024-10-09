import { Grid2 } from "@mui/material";
import { Seats } from "../../nonview";
import { Party } from "../../nonview";
import { LabelledStat, ParliamentViewCircle, PartyView } from "..";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";

export default function PartyToSeatsStatsView() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const { electionProjected } = data;
  const seats = Seats.fromElection(electionProjected);
  const entries = Object.entries(seats.totalPartyToSeats);

  return (
    <Grid2
      container
      direction="row"
      gap={1}
      sx={{ maxWidth: 400, justifyContent: "center" }}
    >
      {entries.map(function ([partyID, seats], i) {
        const color = Party.fromID(partyID).color;
        return (
          <Grid2 key={partyID}>
            <LabelledStat
              key={partyID}
              label={<PartyView partyID={partyID} />}
              stat={<ParliamentViewCircle partyID={partyID} seats={seats} />}
              sx={{ color }}
            />
          </Grid2>
        );
      })}
    </Grid2>
  );
}
