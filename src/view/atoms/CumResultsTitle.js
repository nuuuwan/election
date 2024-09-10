import { Box, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import { Party } from "../../nonview/core";
import { EntType, Translate } from "../../nonview/base";

export default function ColumnLatestResult({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, allRegionIdx, pdIdx } = data;

  const result = electionDisplay.resultIdx[entID];
  const partyToVotes = result.partyToVotes;
  const ent = allRegionIdx[entID];

  const entName = ent.name;
  const winningPartyID = partyToVotes.winningPartyID;
  const color = Party.fromID(winningPartyID).color;

  const entType = EntType.fromID(entID);

  const { nResultsTotal, nResultsReleased } = electionDisplay.getReleaseStats(
    entID,
    pdIdx
  );

  let label = "";
  if (nResultsTotal > 1) {
    label = `${nResultsReleased}/${nResultsTotal} ${Translate(
      "Results Released"
    )}`;
  }

  if (nResultsReleased === nResultsTotal) {
    label += ` (${Translate("Final")})`;
  }

  return (
    <Box>
      <Typography variant="h5" color={color}>
        {Translate(entName)} {Translate(entType.shortName)}
      </Typography>
      <Typography variant="body1" color={"secondary"}>
        {label}
      </Typography>
    </Box>
  );
}
