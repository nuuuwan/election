import { Box } from "@mui/material";
import { useDataContext } from "../../../nonview/core/DataProvider";

import { LoadingLabel , HiddenDataView} from "../../atoms";

import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import PageFooter from "./PageFooter";

export default function BasePageView() {
  const data = useDataContext();
  if (!data) {
    return <LoadingLabel />;
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      <HiddenDataView />
      <PageHeader />
      <PageBody />
      <PageFooter />
    </Box>
  );
}
