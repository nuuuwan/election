import { Box, Typography } from "@mui/material";
import { VERSION, STYLE } from "../../../nonview/constants";

export default function CitationsView() {
  const onClick = function () {
    localStorage.clear();
    window.location.reload();
  };

  const content = [
    "Source Data by elections.gov.lk",
    "Music by @bensound",
    "Visualization & Analysis by @nuuuwan",
    VERSION.DATETIME_STR,
  ].join(" · ");

  return (
    <Box
      sx={{
        color: STYLE.COLOR.LIGHTER,
        alignContent: "center",
        margin: "auto",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Typography variant="body2">{content}</Typography>
    </Box>
  );
}
