import { Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { Format } from "../../nonview";

export default function VoteLeadView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;
  const result = electionDisplay.getResult(entID);
  const lead = result.partyToVotes.lead;

  return (
    <Typography variant="body1" sx={{ color: result.color }}>
      +{Format.intHumanize(lead)}
    </Typography>
  );
}
