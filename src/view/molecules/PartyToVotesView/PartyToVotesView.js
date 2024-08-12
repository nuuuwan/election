import { Grid } from "@mui/material";
import { Format } from "../../../nonview/base";
import { Party } from "../../../nonview/core";
import { LabelledStat, PartyView } from "../../atoms";
import PartyToVotesPieChart from "./PartyToVotesPieChart";

export default function PartyToVotesView({ partyToVotes }) {
  const entries = Object.entries(partyToVotes.partyToVotesSortedOthered);

  return (
    <Grid container direction="column" style={{ height: "100vh" }}>
      <Grid item>
        <PartyToVotesPieChart partyToVotes={partyToVotes} />
      </Grid>
      <Grid item>
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
      </Grid>
    </Grid>
  );
}
