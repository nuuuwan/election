import { Alert, Box, Typography } from "@mui/material";
import { Translate } from "../../nonview/base";

export default function ProjectionTitle() {
  return (
    <Box>
      <Typography variant="h4" color="secondary">
        {Translate("Projected Final Result*")}
      </Typography>

      <Alert severity="warning" sx={{ marginTop: 1 }}>
        <Typography variant="body1" >
          
        *{Translate(
          "This projection has been made by a simple AI Model, based on released results, and historical data."
        )}
        </Typography>
        <Typography variant="body1" >
          
        {Translate(
          "This is not an official result, and might differ significantly from final result."
        )}
          </Typography>
      
      </Alert>
    </Box>
  );
}
