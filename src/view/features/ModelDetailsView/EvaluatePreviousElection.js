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
import CustomAlert from '../../base/CustomAlert';
import CustomTablePagination from '../../base/CustomTablePagination';

function getCellContentList({ pdID, data }) {
  const { electionPrevious, electionProjectedPrevious } = data;
  const resultPrevious = electionPrevious.getResult(pdID);
  const resultProjectedPrevious = electionProjectedPrevious.getResult(pdID);

  const electionModelError = new ElectionModelError(
    electionPrevious,
    electionProjectedPrevious,
  );
  const { winnerCorrect, meanL1Error, nEstimates } =
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
    <Typography key="5" variant="h6" color={nEstimates < 2 ? '#000' : '#ccc'}>
      {nEstimates}
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
          <TableCell key={iCell} sx={{ textAlign: 'center', padding: 1 }}>
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
  'Estimates',
  'Error (L1)',
];

function EvaluateTableHead() {
  return (
    <TableHead>
      <TableRow>
        {TABLE_HEADER_LABELS.map(function (title, iTitle) {
          return (
            <TableCell key={iTitle} sx={{ textAlign: 'center', padding: 1 }}>
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

function EvaluateTable({ pdIDList }) {
  return (
    <TableContainer>
      <Table>
        <EvaluateTableHead />
        <TableBody>
          {pdIDList.map(function (pdID) {
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
  const {
    n,
    nWinnerCorrect,
    nEstimates,
    meanL1ErrorMedian,
    meanL1Error90pctl,
  } = electionModelError.getSummaryStats(notReleasedPDIDList);
  return (
    <Stack direction="row" gap={2} sx={{ margin: 'auto', color: 'gray' }}>
      <LabelledStat label="Winner Correct" stat={`${nWinnerCorrect}/${n}`} />{' '}
      <LabelledStat label="Estimates" stat={`${nEstimates}`} />
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

function GenericAlert() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionPrevious } = data;

  return (
    <CustomAlert>
      <Typography variant="body1">
        {Translate(
          'The following table compares what our model would have predicted for the %1 Election, compared to the actual results.',
          [Translate(electionPrevious.title)],
        )}
      </Typography>
    </CustomAlert>
  );
}

function getNonReleasedPDIDList(data) {
  const {
    electionProjected,
    electionDisplay,
    electionPrevious,
    electionProjectedPrevious,
  } = data;
  const electionModelError = new ElectionModelError(
    electionPrevious,
    electionProjectedPrevious,
  );

  return ElectionModelError.getNonReleasedPDIDList({
    electionProjected,
    electionDisplay,
  }).sort(function (pdIDA, pdIDB) {
    const errorA = electionModelError.getResultErrorInfo(pdIDA).meanL1Error;
    const errorB = electionModelError.getResultErrorInfo(pdIDB).meanL1Error;
    return errorB - errorA;
  });
}

export default function EvaluatePreviousElection() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionProjectedPrevious } = data;

  if (!electionProjectedPrevious) {
    return (
      <Typography variant="h6">
        {Translate('No history to build model for Previous Election.')}
      </Typography>
    );
  }

  const notReleasedPDIDList = getNonReleasedPDIDList(data);

  return (
    <Stack direction="column" gap={1}>
      <GenericAlert />
      <EvaluatePreviousSummaryView />
      <CustomTablePagination
        dataList={notReleasedPDIDList}
        renderTable={function (pdIDList) {
          return <EvaluateTable pdIDList={pdIDList} />;
        }}
      />
    </Stack>
  );
}
