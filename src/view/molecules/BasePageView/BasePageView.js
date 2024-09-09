import { Box } from "@mui/material";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import PageFooter from "./PageFooter";
import { TestingLabel } from "../../../view/atoms";
import LoadingView from "../../pages/BasePage/LoadingView";
import { useContext } from "react";
import { DataContext } from "../../../nonview/core";

export default function BasePageView({
  lang,
  noScroll,
  electionType,
  date,

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
        electionDisplay={electionDisplay}
        setElection={setElection}
        setLang={setLang}
        projectedElection={projectedElection}
      />
      <PageBody setActivePDID={setActivePDID} />
      <PageFooter
        electionDisplay={electionDisplay}
        setNResultsDisplay={setNResultsDisplay}
        noScroll={noScroll}
      />
    </Box>
  );
}
