import URLContext from '../base/URLContext';
export default class CustomURLContext {
  static getDefaultState() {
    return {
      electionType: 'Presidential',
      date: '2024-09-21',
      nResultsDisplay: '',
      activeEntID: '',
      lang: 'en',
      groupBelowTheFold: 'Aggregated_Results',
      groupAggregatedResults: 'Provinces',
      groupMonitoring: 'Turnout',
      groupModelInsights: 'Projected_Result_Details',
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
