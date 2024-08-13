import { Box, Typography } from "@mui/material";
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
      dataList={Object.values(pdIdx)}
      value={pdIdx[activePDID]}
      getID={function (pd) {
        return pd.name;
      }}
      onChange={function (pd) {
        setActivePDID(pd.id);
      }}
      renderMenuItemInner={function (pd, i) {
        const result = resultsIdx[pd.id];
        if (!result) {
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
      getDividerKey={function (pd) {
        return pd.name.substring(0, 1);
      }}
    />
  );
}
