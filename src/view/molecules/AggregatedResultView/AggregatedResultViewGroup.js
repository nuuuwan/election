
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  Grid2,

  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

  Typography,
} from "@mui/material";


import { Translate } from "../../../nonview/base";


import {
  CumResultsColumnView,
  CumResultsViewTableRowView,
} from "../CumResultsView";




function AggregatedResultListColumnViewGroup({ sortedEntIDs }) {
    return (
      <Grid2 container spacing={1} rowSpacing={1} justifyContent="center">
        {sortedEntIDs.map(function (entID) {
          return (
            <Grid2 key={entID}>
              <CumResultsColumnView entID={entID} />
            </Grid2>
          );
        })}
      </Grid2>
    );
  }
  
function AggregatedResultListTableView({ sortedEntIDs }) {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Region or Group",
                "Votes by Party",
                "%",
                "Summary",
                "Past History",
                "Release Status",
                "Time Updated",
              ].map(function (title, iTitle) {
                return (
                  <TableCell key={iTitle} sx={{ textAlign: "center" }}>
                    <Typography variant="h6" color="secondary">
                      {Translate(title)}
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEntIDs.map(function (entID) {
              return <CumResultsViewTableRowView key={entID} entID={entID} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  
  export default  function AggregatedResultViewGroup({ entIDList }) {
    const theme = useTheme();
    const isSmallerScreen = useMediaQuery(theme.breakpoints.down("lg"));
  
    if (!entIDList) {
      return null;
    }
  
    return (
      <Box>
        {isSmallerScreen ? (
          <AggregatedResultListColumnViewGroup sortedEntIDs={entIDList} />
        ) : (
          <AggregatedResultListTableView sortedEntIDs={entIDList} />
        )}
      </Box>
    );
  }
  