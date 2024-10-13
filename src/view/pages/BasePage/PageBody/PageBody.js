import { Box, Grid2 } from "@mui/material";
import { useDataContext } from "../../../../nonview/core/DataProvider";

import PageBodyBelowTheFold from "./PageBodyBelowTheFold";

import {
  NoResultsAlert,
} from "../../../";
import PageBodyRight from "./PageBodyRight";
import PageBodyCenter from "./PageBodyCenter";
import PageBodyLeft from "./PageBodyLeft";

const STYLE = {
  BOX: { paddingTop: 10, paddingBottom: 20 },
};

export default function PageBody() {
  const data = useDataContext();
  const { electionDisplay } = data;

  if (!electionDisplay.nResults) {
    return <NoResultsAlert election={electionDisplay} />;
  }

  const size = { xs: 12, md: 6, xl: 4 };
  return (
    <Box sx={STYLE.BOX}>
      <Grid2 container>
        <Grid2 size={size}>  <PageBodyLeft /></Grid2>
        <Grid2 size={size}>  <PageBodyCenter /></Grid2>
        <Grid2 size={size}>  <PageBodyRight /></Grid2>
      </Grid2>
      <PageBodyBelowTheFold />
    </Box>
  );
}
