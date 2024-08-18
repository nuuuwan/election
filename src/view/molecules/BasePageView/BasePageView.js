import { Box } from "@mui/material";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import PageFooter from "./PageFooter";

export default function BasePageView({
  election,
  //
  electionDisplay,
  db,
  projectedElection,
  //
  setActivePDID,
  setElection,
  setNResultsDisplay,
}) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <PageHeader
        electionDisplay={electionDisplay}
        db={db}
        setElection={setElection}
        projectedElection={projectedElection}
      />
      <PageBody
        election={election}
        electionDisplay={electionDisplay}
        //
        db={db}
        projectedElection={projectedElection}
        //
        setActivePDID={setActivePDID}
      />
      <PageFooter
        electionDisplay={electionDisplay}
        election={election}
        //
        setNResultsDisplay={setNResultsDisplay}
      />
    </Box>
  );
}
