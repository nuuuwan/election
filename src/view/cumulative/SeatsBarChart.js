import { MathX, Party, Seats, SeatsUtils, Translate } from "../../nonview";

import { Stack, Typography } from "@mui/material";

import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import CustomLoadingProgress from "../base/CustomLoadingProgress";
import SVGBarChart from "../base/SVGBarChart";

export default function SeatsBarChart({ resultsElection, entID }) {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }

  const { electionProjected, entIdx, electionDisplay } = data;
  if (!electionProjected) {
    return null;
  }
  const seats = Seats.fromElection(electionProjected);
  const partyToSeats = seats.getPartyToSeats(entID);
  if (!partyToSeats) {
    return null;
  }

  const entries = Object.entries(SeatsUtils.sortPartyToSeats(partyToSeats));
  const totalSeats = MathX.sum(Object.values(partyToSeats));
  const isComplete = electionDisplay.isComplete(entID, entIdx);
  const dataList = entries.map(function ([partyID, seats]) {
    const party = Party.fromID(partyID);
    return {
      label: partyID,
      value: seats,
      color: party.color,
    };
  });

  const label = isComplete ? "Final" : "Projected";
  return (
    <Stack direction="column" gap={1}>
      <Typography variant="body1" sx={{ color: "gray" }}>
        {Translate(label + " Seats")} ({totalSeats})
      </Typography>
      <Stack direction="row" gap={1} sx={{ p: 0, m: 0, alignItems: "center" }}>
        <SVGBarChart dataList={dataList} formatValue={(value) => value} />
      </Stack>{" "}
    </Stack>
  );
}
