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
import CustomTablePagination from '../../base/CustomTablePagination';

function AggregatedResultListColumnViewGroup({ sortedEntIDs, customElection }) {
  return (
    <Grid2 container spacing={1} rowSpacing={1} justifyContent="center">
      {sortedEntIDs.map(function (entID) {
        return (
          <Grid2 key={entID}>
            <CumResultsView
              mode="ColumnView"
              entID={entID}
              customElection={customElection}
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

function AggregatedResultListTableView({ sortedEntIDs, customElection }) {
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
                customElection={customElection}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function AggregatedResultViewGroupTitle({
  group,
  nResultsReleased,
  nResultsTotal,
}) {
  if (!group) {
    return null;
  }
  return (
    <Typography variant="h4" color="secondary">
      {Translate('By %1 (after %2 of %3 results)', [
        Translate(group.replaceAll('_', ' ')),
        nResultsReleased,
        nResultsTotal,
      ])}
    </Typography>
  );
}

export default function AggregatedResultViewGroup({
  group,
  entIDList,
  customElection,
  nResultsReleased,
  nResultsTotal,
}) {
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down('lg'));
  if (!entIDList) {
    return null;
  }

  const renderTable = function (displayEntIDList) {
    return (
      <Box>
        <AggregatedResultViewGroupTitle
          group={group}
          nResultsReleased={nResultsReleased}
          nResultsTotal={nResultsTotal}
        />
        {isSmallerScreen ? (
          <AggregatedResultListColumnViewGroup
            sortedEntIDs={displayEntIDList}
            customElection={customElection}
          />
        ) : (
          <AggregatedResultListTableView
            sortedEntIDs={displayEntIDList}
            customElection={customElection}
          />
        )}
      </Box>
    );
  };

  return (
    <CustomTablePagination dataList={entIDList} renderTable={renderTable} />
  );
}
