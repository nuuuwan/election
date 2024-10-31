import URLContext from '../base/URLContext';
import ELECTION_LIST_TUPLES from './Election/ELECTION_LIST_TUPLES.js';
export default class CustomURLContext {
  static getDefaultState() {
    const n = ELECTION_LIST_TUPLES.length;
    const randomI = Math.floor(Math.random() * n);
    const [electionType, date] = ELECTION_LIST_TUPLES[randomI];
    const nResultsDisplay = Math.floor(Math.random() * 182) + 1;
    return {
      electionType,
      date,
      nResultsDisplay,
      lang: 'en',
      groupAggregatedResults: 'Electoral Districts',
      groupMonitoring: 'Turnout',
      groupModelInsights: 'Projected Result Details',
    };
  }

  static get() {
    const context = URLContext.get();
    if (context.nResultsDisplay) {
      context.nResultsDisplay = parseInt(context.nResultsDisplay);
    }

    return Object.assign({}, CustomURLContext.getDefaultState(), context);
  }

  static set(data) {
    URLContext.set(data);
    const year = data.date.split('-')[0];
    const electionType = data.electionType;
    const electionTypeTag =
      electionType === 'Presidential' ? 'PresPoll' : 'GenElec';
    let newTitle = `#${electionTypeTag}SL${year}`;
    if (data.nResultsDisplay) {
      newTitle += ` (${data.nResultsDisplay})`;
    } else {
      newTitle += ' - Await...';
    }
    window.document.title = newTitle;
  }
}
