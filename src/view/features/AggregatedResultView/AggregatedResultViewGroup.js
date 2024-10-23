import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
} from '@mui/material';

import { Translate } from '../../../nonview';

import CumResultsView from '../CumResultsView/CumResultsView';

function AggregatedResultListColumnViewGroup({
  sortedEntIDs,
  shouldUseProjected,
}) {
  return (
    <Grid2 container spacing={1} rowSpacing={1} justifyContent="center">
      {sortedEntIDs.map(function (entID) {
        return (
          <Grid2 key={entID}>
            <CumResultsView
              mode="ColumnView"
              entID={entID}
              shouldUseProjected={shouldUseProjected}
            />
          </Grid2>
        );
      })}
    </Grid2>
  );
}

const TABLE_HEADER_LABELS = [
  'Region or Group',
  'Votes by Party',
  '%',
  'Summary',
  'Past History',
  'Release Status',
];

function AggregatedResultListTableView({ sortedEntIDs, shouldUseProjected }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {TABLE_HEADER_LABELS.map(function (title, iTitle) {
              return (
                <TableCell key={iTitle} sx={{ textAlign: 'center' }}>
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
            return (
              <CumResultsView
                key={entID}
                mode="TableRowView"
                entID={entID}
                shouldUseProjected={shouldUseProjected}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function AggregatedResultViewGroup({
  entIDList,
  shouldUseProjected,
}) {
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down('lg'));

  if (!entIDList) {
    return null;
  }

  return (
    <Box>
      {isSmallerScreen ? (
        <AggregatedResultListColumnViewGroup
          sortedEntIDs={entIDList}
          shouldUseProjected={shouldUseProjected}
        />
      ) : (
        <AggregatedResultListTableView
          sortedEntIDs={entIDList}
          shouldUseProjected={shouldUseProjected}
        />
      )}
    </Box>
  );
}
