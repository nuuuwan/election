import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { Translate } from '../../../nonview';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';
import CustomLoadingProgress from '../../base/CustomLoadingProgress';
import styled from 'styled-components';
import ResultBarChart from '../../cumulative/ResultBarChart';
import EntView from '../../base/EntView';

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f8f8f8',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function ModelResultsTableRow({ pdID, partyToPVotes }) {
  const partyToPVotesSorted = Object.fromEntries(
    Object.entries(partyToPVotes).sort(([, a], [, b]) => b - a),
  );

  return (
    <StyledTableRow>
      <TableCell>
        <EntView entID={pdID} />
      </TableCell>
      <TableCell>
        <ResultBarChart partyToPVotes={partyToPVotesSorted} />
      </TableCell>
    </StyledTableRow>
  );
}

function ModelResultsTable() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }

  const { pdToPartyToPVotes } = data;

  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        mt: 3,
      }}
    >
      <TableContainer>
        <Table sx={{ maxWidth: 480 }}>
          <TableBody>
            {Object.entries(pdToPartyToPVotes).map(function ([
              pdID,
              partyToPVotes,
            ]) {
              return (
                <ModelResultsTableRow
                  key={pdID}
                  pdID={pdID}
                  partyToPVotes={partyToPVotes}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default function ModelDetailsView() {
  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h4">{Translate('Model Details')}</Typography>
      <ModelResultsTable />
    </Stack>
  );
}
