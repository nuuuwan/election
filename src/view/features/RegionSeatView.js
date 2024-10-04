import { Grid2 } from "@mui/material";
import { Seats } from "../../nonview";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";

import ParliamentView from "./ParliamentView";


export default function RegionStateView() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }

  const { electionProjected } = data;
  const seats = Seats.fromElection(electionProjected);
  const regionToPartyToSeats = seats.regionToPartyToSeats;

  return (
    <Grid2 container direction="row"sx={{width: 500}}>
      {Object.keys(regionToPartyToSeats).map(function (regionID) {
        return (
            <Grid2  item key={regionID} sx={{width: 240}}
            >
          <ParliamentView
            regionID={regionID}
            sx={{width: 180}}
          />
            </Grid2>
        );
      })}
    </Grid2>
  );
}
