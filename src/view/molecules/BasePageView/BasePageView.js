import { Box } from "@mui/material";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import PageFooter from "./PageFooter";
import { TestingLabel } from "../../../view/atoms";

export default function BasePageView({
  lang,
  noScroll,

  setLang,
  setActivePDID,
  setElection,
  setNResultsDisplay,
}) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <TestingLabel />
      <PageHeader
        lang={lang}

        setElection={setElection}
        setLang={setLang}

      />
      <PageBody setActivePDID={setActivePDID} />
      <PageFooter
x
        setNResultsDisplay={setNResultsDisplay}
        noScroll={noScroll}
      />
    </Box>
  );
}
