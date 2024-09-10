import { Box, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import { Party } from "../../nonview/core";
import { EntType, Translate } from "../../nonview/base";

function ResultsReleasedView({ entID, pdIdx, electionDisplay }) {
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
    <Typography variant="body1" color={"secondary"}>
      {label}
    </Typography>
  );
}

export default function CumResultsTitle({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, allRegionIdx, pdIdx } = data;

  const entName = allRegionIdx[entID].name;
  const color = Party.fromID(
    electionDisplay.resultIdx[entID].partyToVotes.winningPartyID
  ).color;
  const entType = EntType.fromID(entID);

  return (
    <Box>
      <Typography variant="h5" color={color}>
        {Translate(entName)} {Translate(entType.shortName)}
      </Typography>
      <ResultsReleasedView
        entID={entID}
        pdIdx={pdIdx}
        electionDisplay={electionDisplay}
      />
    </Box>
  );
}
