import { Box, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import { Party } from "../../nonview/core";
import { EntType, ProvinceUtils, Translate } from "../../nonview/base";

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

  let nResultsTotal = 0;
  let nResultsReleased = 0;

  for (let [id, ent] of Object.entries(pdIdx)) {
    let parentID;
    if (entType === EntType.PD) {
      parentID = ent.d.pd_id;
    } else if (entType === EntType.ED) {
      parentID = ent.d.ed_id;
    } else if (entType === EntType.PROVINCE) {
      parentID = ent.d.province_id;
      // HACK! To fix bug in postal data
      if (parentID === "None") {
        parentID = ProvinceUtils.getProvinceIDForEDID(ent.d.ed_id);
      }
    } else {
      parentID = "LK";
    }

    if (parentID === entID) {
      nResultsTotal++;
      if (electionDisplay.resultIdx[id]) {
        nResultsReleased++;
      }
    }
  }

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
