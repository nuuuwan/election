import { Box } from "@mui/material";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import PageFooter from "./PageFooter";
import { TestingLabel } from "../../../view/atoms";
import { useContext } from "react";
import { DataContext } from "../../../nonview/core";

export default function BasePageView({
  setLang,
  setActivePDID,
  setElection,
  setNResultsDisplay,
}) {

  const data = useContext(DataContext);
  console.debug(data);

  return (
    <Box sx={{ textAlign: "center" }}>
      <TestingLabel />
      <PageHeader setElection={setElection} setLang={setLang} />
      <PageBody setActivePDID={setActivePDID} />
      <PageFooter x setNResultsDisplay={setNResultsDisplay} />
    </Box>
  );
}
