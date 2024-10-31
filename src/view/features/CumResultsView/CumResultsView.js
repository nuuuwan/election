import {
  ResultBarChart,
  HistoryView,
  SummaryView,
  PartyToVotesStatsView,
  ResultsReleasedView,
} from '../..';
import CumResultsViewTableRowView from './CumResultsViewTableRowView';
import CumResultsColumnView from './CumResultsColumnView';
import { useDataContext } from '../../../nonview/core/DataProvider';
import EntWithPartyView from '../../core/EntViewPartyLogo';

function getContentList({ entID, result, election }) {
  const partyToPVotes =
    election.getResult(entID).partyToVotes.partyToPVotesSortedOthered;

  return [
    <EntWithPartyView key="0" entID={entID} partyID={result.winningPartyID} />,

    <PartyToVotesStatsView key="1" partyToVotes={result.partyToVotes} />,
    <ResultBarChart key="2" partyToPVotes={partyToPVotes} />,

    <SummaryView key="3" summary={result.summary} />,

    <HistoryView key="4" entID={entID} />,

    <ResultsReleasedView key="5" entID={entID} />,
  ];
}

export default function CumResultsView({ entID, mode, customElection = null }) {
  const data = useDataContext();
  const election = customElection || data.electionDisplay;
  const result = election.resultIdx[entID];
  if (!result) {
    return null;
  }
  const contentList = getContentList({
    entID,
    result,
    election,
  });

  if (mode === 'TableRowView') {
    return <CumResultsViewTableRowView contentList={contentList} />;
  }
  if (mode === 'ColumnView') {
    return <CumResultsColumnView contentList={contentList} />;
  }
  throw new Error(`Unknown mode: ${mode}`);
}
