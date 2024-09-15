import { Box, Typography } from "@mui/material";
import { Translate } from "../../nonview/base";

export default function ProjectionTitle() {
  return (
    <Box>
      <Typography variant="h4" color="secondary">
        {Translate("Projected Final Result*")}
      </Typography>

      <Typography
        variant="body1"
        color="secondary"
        sx={{ m: 1, marginLeft: 10, marginRight: 10 }}
      >
        {Translate(
          "*By AI Model, based on released and historocal results. Not official. Might vary from final result, sometimes significantly."
        )}
      </Typography>
    </Box>
  );
}
