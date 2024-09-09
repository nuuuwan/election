import { Box } from "@mui/material";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import PageFooter from "./PageFooter";
import { TestingLabel } from "../../../view/atoms";

export default function BasePageView({
  lang,
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
      <TestingLabel />
      <PageHeader
        lang={lang}
        electionDisplay={electionDisplay}
        setElection={setElection}
        setLang={setLang}
        projectedElection={projectedElection}
      />
      <PageBody
        electionDisplay={electionDisplay}
        projectedElection={projectedElection}
        setActivePDID={setActivePDID}
      />
      <PageFooter
        electionDisplay={electionDisplay}
        setNResultsDisplay={setNResultsDisplay}
        noScroll={noScroll}
      />
    </Box>
  );
}
