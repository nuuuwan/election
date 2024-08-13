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
  const onChange = function (event) {
    const pdID = event.target.value;
    setActivePDID(pdID);
  };

  const releasedPDs = Object.values(pdIdx)
    .filter(function (pd) {
      return resultsIdx[pd.id] !== undefined;
    })
    .sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });

  let prevFirstChar;
  return (
    <Box>
      <CustomSelect value={activePDID} onChange={onChange}>
        {releasedPDs.reduce(function (innerItems, pd, i) {
          const ed = edIdx[pd.id.substring(0, 5)];
          const result = resultsIdx[pd.id];
          const winningPartyID = result.partyToVotes.winningPartyID;
          const color = Party.fromID(winningPartyID).color;

          const firstChar = pd.name.substring(0, 1);
          if (prevFirstChar !== firstChar && i !== 0) {
            innerItems.push(<Divider key={`divider-${i}`} />);
          }
          prevFirstChar = firstChar;
          const innerItem = (
            <MenuItem key={i} value={pd.id}>
              <Typography variant="h5" color={color}>
                {pd.name}
              </Typography>
              <Typography variant="body1" sx={{ p: 0.5, color: "#888" }}>
                {ed.name}
              </Typography>
            </MenuItem>
          );
          innerItems.push(innerItem);
          return innerItems;
        }, [])}
      </CustomSelect>
    </Box>
  );
}
