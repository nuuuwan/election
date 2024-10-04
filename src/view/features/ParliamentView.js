import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import { Party, Seats } from "../../nonview";
import { Box, Grid2 } from "@mui/material";
import EntView from "../base/EntView";

export default function ParliamentView({ regionID, sx={} }) {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }

  const { electionProjected } = data;
  const seats = Seats.fromElection(electionProjected);
  const partyToSeats = regionID
    ? seats.regionToPartyToSeats[regionID]
    : seats.partyToSeats;

  const partyToSeatsSorted = Seats.sortPartyToSeats(partyToSeats);

  let rendered = [];
  for (let partyID in partyToSeatsSorted) {
    const seats = partyToSeats[partyID];
    
    let background = Party.fromID(partyID).color;
    let border=  "1px solid " + Party.fromID(partyID).color;

    if (partyID === Party.ERROR.id) {
      background = "white";
      border = "1px solid gray";
    }

    for (let i = 0; i < seats; i++) {

     
      rendered.push(
        <Grid2 item>
          <Box
            key={i}
            sx={{
              width: 12,
              height: 12,
              background,
              border,
              borderRadius: 24,
              margin: 0.2,
            }}
          />
        </Grid2>
      );
    }
  }
  return (
   <Box>
    <EntView entID={regionID}/>
     <Grid2 container direction="row" sx={Object.assign({ width: 480 }, sx)}>
      {rendered}
    </Grid2>
   </Box>
  );
}
