import { Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import { Party } from "../../nonview/core";
import { EntType, Translate } from "../../nonview/base";


export default function CumResultsTitle({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, allRegionIdx,  } = data;

  const entName = allRegionIdx[entID].name;
  const color = Party.fromID(
    electionDisplay.resultIdx[entID].partyToVotes.winningPartyID
  ).color;
  const entType = EntType.fromID(entID);

  return (

      <Typography variant="h5" color={color}>
        {Translate(entName)} {Translate(entType.shortName)}
      </Typography>
  
 
  );
}
