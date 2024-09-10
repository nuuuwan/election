import { Box, Typography } from "@mui/material";
import { Translate } from "../../nonview/base";

export default function ProjectionTitle() {
  return (

      <Box>
        <Typography variant="body1">{Translate("Final Result")}</Typography>
        <Typography variant="h4">{Translate("Projected")}</Typography>
      </Box>


  );
}
