import { Box } from "@mui/material";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import PageFooter from "./PageFooter";
import { TestingLabel } from "../../../view/atoms";

export default function BasePageView({
  lang,
  election,
  electionDisplay,
  db,
  projectedElection,
  setLang,
  setActivePDID,
  setElection,
  setNResultsDisplay,
}) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <TestingLabel election={election} />
      <PageHeader
        lang={lang}
        electionDisplay={electionDisplay}
        db={db}
        setElection={setElection}
        setLang={setLang}
        projectedElection={projectedElection}
      />
      <PageBody
        election={election}
        electionDisplay={electionDisplay}
        db={db}
        projectedElection={projectedElection}
        setActivePDID={setActivePDID}
      />
      <PageFooter
        electionDisplay={electionDisplay}
        election={election}
        setNResultsDisplay={setNResultsDisplay}
      />
    </Box>
  );
}
