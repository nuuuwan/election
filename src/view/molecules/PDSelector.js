import { Box, MenuItem, Select, Typography } from "@mui/material";
import { Party } from "../../nonview/core";

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

  return (
    <Box>
      <Select
        value={activePDID}
        onChange={onChange}
        sx={{
          border: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      >
        {releasedPDs.map(function (pd, i) {
          const ed = edIdx[pd.id.substring(0, 5)];
          const result = resultsIdx[pd.id];
          const winningPartyID = result.partyToVotes.winningPartyID;
          const color = Party.fromID(winningPartyID).color;
          return (
            <MenuItem key={i} value={pd.id}>
              <Typography variant="h5" color={color}>
                {pd.name}
              </Typography>
              <Typography variant="body1" sx={{ p: 0.5, color: "#888" }}>
                {ed.name}
              </Typography>
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}
