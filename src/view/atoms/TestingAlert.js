import { Alert, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

export default function TestingAlert() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election } = data;
  if (!election.isFuture) {
    return null;
  }

  return (
    <Alert severity="error">
      <Typography variant="h5">
        This election is scheduled for the FUTURE. This data is for TESTING
        purposes only, and NOT REAL.
      </Typography>
    </Alert>
  );
}
