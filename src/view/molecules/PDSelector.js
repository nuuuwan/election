import { Box, Divider, MenuItem, Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { CustomSelect } from "../atoms";

export default function PDSelector({
  resultsIdx,
  pdIdx,
  edIdx,
  activePDID,
  setActivePDID,
}) {
  return (
    <CustomSelect
      value={pdIdx[resultsIdx[activePDID].entID].name}
      dataList={Object.values(resultsIdx)}
      getID={function (result) {
        return pdIdx[result.entID].name;
      }}
      onChange={function (result) {
        setActivePDID(result.entID);
      }}
      renderMenuItemInner={function (result, i) {
        const pd = pdIdx[result.entID];
        if (!pd) {
          return null;
        }

        const ed = edIdx[pd.id.substring(0, 5)];
        const winningPartyID = result.partyToVotes.winningPartyID;
        const color = Party.fromID(winningPartyID).color;

        return (
          <Box>
            <Typography variant="h5" color={color}>
              {pd.name}
            </Typography>
            <Typography variant="body1" sx={{ p: 0.5, color: "#888" }}>
              {ed.name}
            </Typography>
          </Box>
        );
      }}
      getDividerKey={function (result) {
        return pdIdx[result.entID].name.substring(0, 1);
      }}
    />
  );
}
