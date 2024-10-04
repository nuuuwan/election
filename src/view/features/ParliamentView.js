import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import {  Seats } from "../../nonview";
import {  Grid2,   } from "@mui/material";

import ParliamentViewCircle from "../core/ParliamentViewCircle";



export default function ParliamentView({ regionID, forceComplete=false, sx = {} }) {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }

  const { electionProjected, electionDisplay , entIdx} = data;
  if (electionProjected.isPresidential)  { 
    return null;
  }
  if (forceComplete && !electionDisplay.isComplete(regionID, entIdx)) {
    return "...";
  }

  const seats = Seats.fromElection(electionProjected);
  const partyToSeats = seats.getPartyToSeats(regionID);
  if (!partyToSeats) {
    return null;
  }

  return (

      
      <Grid2 container direction="row" sx={sx}>
        {Object.entries(partyToSeats).map(
          function([partyID, seats], i) {
            return (
              <Grid2 key={partyID}>
                <ParliamentViewCircle partyID={partyID} seats={seats} />
              </Grid2>
            );
          }
        )}
      </Grid2>

  );
}
