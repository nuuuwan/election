import { Box, Typography } from "@mui/material";
import { Party } from "../../nonview";

export default function ParliamentViewCircle({ partyID, seats }) {
  let background = Party.fromID(partyID).color;
  let border = "1px solid " + background;
  let color = "white";

  if (partyID === Party.ERROR.id) {
    background = "white";
    border = "1px dashed gray";
    color = "gray";
  }

  const DIM = 24;
  return (
    <Box
      key={partyID}
      sx={{
        width: DIM,
        height: DIM,
        background,
        margin: 0.1,
        padding: 0,
        borderRadius: DIM / 2,
        border,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ color }}>
        {seats}
      </Typography>
    </Box>
  );
}
