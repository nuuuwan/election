import React from 'react';
import {
  Typography,
  Stack,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import { ElectionModelError, Format, Translate } from '../../../nonview';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';
import CustomLoadingProgress from '../../base/CustomLoadingProgress';
import EntView from '../../base/EntView';
import ResultBarChart from '../../cumulative/ResultBarChart';
import LabelledStat from '../../base/LabelledStat';

function getCellContentList({ pdID, data }) {
  const { electionPrevious, electionProjectedPrevious } = data;
  const resultPrevious = electionPrevious.getResult(pdID);
  const resultProjectedPrevious = electionProjectedPrevious.getResult(pdID);

  const electionModelError = new ElectionModelError(
    electionPrevious,
    electionProjectedPrevious,
  );
  const { winnerCorrect, meanL1Error } =
    electionModelError.getResultErrorInfo(pdID);
  return [
    <EntView key="1" entID={pdID} />,

    <ResultBarChart
      key="3"
      partyToPVotes={
        resultProjectedPrevious.partyToVotes.partyToPVotesSortedOthered
      }
    />,
    <ResultBarChart
      key="2"
      partyToPVotes={resultPrevious.partyToVotes.partyToPVotesSortedOthered}
    />,
    <Typography key="4" variant="h6" color={!winnerCorrect ? '#000' : '#ccc'}>
      {winnerCorrect ? 'Correct' : 'Incorrect'}
    </Typography>,
    <Typography
      key="5"
      variant="h6"
      color={meanL1Error > 0.05 ? '#000' : '#ccc'}
    >
      {Format.percent(meanL1Error)}
    </Typography>,
  ];
}

function EvaluateTableRow({ pdID }) {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }

  return (
    <TableRow>
      {getCellContentList({ pdID, data }).map(function (cellContent, iCell) {
        return (
          <TableCell key={iCell} sx={{ textAlign: 'center' }}>
            {cellContent}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

const TABLE_HEADER_LABELS = [
  'Region or Group',
  'Projected',
  'Actual',
  'Is Winner Correct?',
  'Error (L1)',
];

function EvaluateTableHead() {
  return (
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
  );
}

function EvaluateTable() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const notReleasedPDIDList = ElectionModelError.getNonReleasedPDIDList(data);
  return (
    <TableContainer>
      <Table>
        <EvaluateTableHead />
        <TableBody>
          {notReleasedPDIDList.map(function (pdID) {
            return <EvaluateTableRow key={pdID} pdID={pdID} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function EvaluatePreviousSummaryView() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionPrevious, electionProjectedPrevious } = data;
  const notReleasedPDIDList = ElectionModelError.getNonReleasedPDIDList(data);
  const electionModelError = new ElectionModelError(
    electionPrevious,
    electionProjectedPrevious,
  );
  const { n, nWinnerCorrect, meanL1ErrorMedian, meanL1Error90pctl } =
    electionModelError.getSummaryStats(notReleasedPDIDList);
  return (
    <Stack direction="row" gap={2} sx={{ margin: 'auto', color: 'gray' }}>
      <LabelledStat label="Winner Correct" stat={`${nWinnerCorrect}/${n}`} />
      <LabelledStat
        label="Median Error"
        stat={Format.percent(meanL1ErrorMedian)}
      />{' '}
      <LabelledStat
        label="90pctl Error"
        stat={Format.percent(meanL1Error90pctl)}
      />
    </Stack>
  );
}

export default function EvaluatePreviousElection() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionPrevious } = data;
  console.debug('Rendered <EvaluatePreviousElection />');
  return (
    <Stack direction="column" gap={2}>
      <Typography variant="h4">{Translate(electionPrevious.title)}</Typography>

      <EvaluatePreviousSummaryView />

      <EvaluateTable />
    </Stack>
  );
}
