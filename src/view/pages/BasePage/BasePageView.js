import { Box,  } from "@mui/material";
import { useDataContext } from "../../../nonview/core/DataProvider";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import PageFooter from "./PageFooter";
import { LoadingLabel, TestingAlert } from "../../atoms";

export default function BasePageView() {
  const data = useDataContext();
  if (!data) {
    return <LoadingLabel />;
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      <TestingAlert />
      <PageHeader />
      <PageBody />
      <PageFooter />
    </Box>
  );
}
