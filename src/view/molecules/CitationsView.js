import { Box, Typography } from "@mui/material";
import { VERSION, STYLE } from "../../nonview/constants";

export default function CitationsView() {
  const onClick = function () {
    localStorage.clear();
    window.location.reload();
  };

  const lines = [
    "Source Data by elections.gov.lk",
    "Music by @bensound",
    "Visualization & Analysis by @nuuuwan",
  ];

  return (
    <Box
      sx={Object.assign({
        color: STYLE.COLOR.LIGHTER,
        cursor: "pointer",
      }, STYLE.MESSAGE)}
      onClick={onClick}
    >
      {lines.map(function(line, i){
        return <Typography key={i} variant="body1">{line}</Typography>;
      })}
      <Typography variant="caption">v{VERSION.DATETIME_STR}</Typography>
    </Box>
  );
}
