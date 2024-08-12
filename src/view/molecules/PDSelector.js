import { Box, MenuItem, Select, Typography } from "@mui/material";

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
      <Select value={activePDID} onChange={onChange}>
        {releasedPDs.map(function (pd, i) {
          const ed = edIdx[pd.id.substring(0, 5)];
          return (
            <MenuItem key={i} value={pd.id}>
              <Typography variant="h4">{pd.name}</Typography>
              <Typography variant="h6" sx={{ p: 0.5 }}>
                {ed.name}
              </Typography>
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}
