import { Box } from "@mui/material";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import PageFooter from "./PageFooter";
import { TestingLabel } from "../../../view/atoms";

export default function BasePageView({
  lang,
  election,
  electionDisplay,
  projectedElection,
  setLang,
  setActivePDID,
  setElection,
  setNResultsDisplay,
  noScroll,
}) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <TestingLabel election={election} />
      <PageHeader
        lang={lang}
        electionDisplay={electionDisplay}
        setElection={setElection}
        setLang={setLang}
        projectedElection={projectedElection}
      />
      <PageBody
        election={election}
        electionDisplay={electionDisplay}
        projectedElection={projectedElection}
        setActivePDID={setActivePDID}
      />
      <PageFooter
        electionDisplay={electionDisplay}
        election={election}
        setNResultsDisplay={setNResultsDisplay}
        noScroll={noScroll}
      />
    </Box>
  );
}
