import { Grid2, Stack, Typography } from "@mui/material";
import { MathX, Seats } from "../../nonview";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";

import ParliamentView from "./ParliamentView";
import EntView from "../base/EntView";

export default function RegionStateView() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }

  const { electionProjected } = data;
  const seats = Seats.fromElection(electionProjected);
  const idx = seats.groupToRegionToPartyToSeats;

  return (
    <Stack direction="column" gap={0}>
      {Object.entries(idx).map(function ([groupID, regionToPartyToSeats]) {
        const groupSize = Object.keys(regionToPartyToSeats).length;
        return (
          <Grid2 container direction="row">
            {Object.entries(regionToPartyToSeats).map(function ([
              regionID,
              partyToSeats,
            ]) {
              const minSize = 12 / groupSize;
              const totalSeats = MathX.sumValues(partyToSeats);

              return (
                <Grid2
                  key={regionID}
                  size={{ xs: Math.max(4, minSize), md: minSize }}
                >
                  <Stack
                    direction="column"
                    sx={{ mr: 2, ml: 2, p: 0.5, alignItems: "center" }}
                  >
                    <Stack direction="row" gap={0.5}>
                      <EntView
                        entID={regionID}
                        isNationalListMode={true}
                        isSmall={true}
                      />
                      <Typography variant="caption">{totalSeats}</Typography>
                    </Stack>
                    <ParliamentView regionID={regionID} />
                  </Stack>{" "}
                </Grid2>
              );
            })}
          </Grid2>
        );
      })}
    </Stack>
  );
}
