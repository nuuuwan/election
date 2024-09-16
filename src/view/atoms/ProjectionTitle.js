import { Alert, Box, Typography } from "@mui/material";
import { Translate } from "../../nonview/base";
import { useDataContext } from "../../nonview/core/DataProvider";

export default function ProjectionTitle() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, pdIdx, electionPrevious } = data;

  const entID = "LK";
  const { nResultsTotal, nResultsReleased,  } =
    electionDisplay.getReleaseStats(entID, pdIdx, electionPrevious);

    const isComplete = nResultsReleased === nResultsTotal;

    let title = "Final Result";

    let alert = null;
    if (!isComplete) {
      title = "Projected Final Result";

      alert = (
        <Alert severity="warning" sx={{ marginTop: 1, textAlign: "justify" }}>
        <Typography variant="h6" >
          
        {Translate(
          "This projection has been made by a simple AI Model, based on released results, and historical data."
        )}
        </Typography>


        <Typography variant="body1" >
          
          {Translate(
            "The results presented have 90% confidence, which means that they could be wrong 10% of the time."
          )}
            </Typography>
      

        <Typography variant="body1" >
          
        {Translate(
          "This is not an official result, and might differ significantly from final result."
        )}
          </Typography>

      </Alert>
      )
    }

  return (
    <Box>
      <Typography variant="h4" color="secondary">
        {Translate(title)}
      </Typography>

    {alert}
    </Box>
  );
}
