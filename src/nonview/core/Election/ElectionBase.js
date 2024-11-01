import { DictX, Translate } from '../..';

export default class ElectionBase {
  static URL_BASE = // eslint-disable-next-line no-undef
    window.location.origin + process.env.PUBLIC_URL + '/data/elections';

  constructor(electionType, date, baseEntType) {
    this.electionType = electionType;
    this.date = date;
    this.baseEntType = baseEntType;

    // (loaded later)
    this.pdResultList = null;
    this.edResultList = null;
    this.provinceResultList = null;
    this.ezResultList = null;
    this.resultLK = null;
    this.resultList = null;
    this.resultIdx = null;
    this.isLoaded = false; // meta
  }

  get isPresidential() {
    return this.electionType === 'Presidential';
  }

  get electionTypeTitle() {
    if (this.isPresidential) {
      return 'Presidential';
    }
    return 'Parliamentary';
  }

  get title() {
    return this.year + ' ' + Translate(this.electionTypeTitle);
  }

  get year() {
    return this.date.substring(0, 4);
  }

  get electionTypeHashTag() {
    if (this.electionType === 'Presidential') {
      return 'PresPollSL';
    }
    return 'GenElecSL';
  }

  get hashTag() {
    return '#' + this.electionTypeHashTag + this.year.toString();
  }

  get hashTagList() {
    return [
      '🇱🇰 ',
      this.hashTag,
      '#SriLanka',
      '#LKA',
      '#SriLankaElections',
      '#Election' + this.year,
      '#PresidentialElection' + this.year,
    ];
  }

  get urlData() {
    return (
      ElectionBase.URL_BASE +
      '/government-elections-' +
      this.electionType.toLowerCase() +
      '.regions-ec.' +
      this.year +
      '.tsv'
    );
  }

  get isFuture() {
    const DATE_FUTURE = '2024-10-01';
    return this.date.localeCompare(DATE_FUTURE) > 0;
  }

  localeCompare(other) {
    return this.date.localeCompare(other.date);
  }

  get color() {
    if (!this.resultIdx) {
      return 'gray';
    }
    return this.resultLK.color;
  }

  get nResults() {
    if (!this.baseResultList) {
      return 0;
    }
    return this.baseResultList.length;
  }

  get baseEntIDList() {
    return this.baseResultList.map((result) => result.entID);
  }

  get partyToWins() {
    return DictX.sort(
      this.baseResultList.reduce(function (partyToWins, result) {
        partyToWins[result.winningPartyID] =
          (partyToWins[result.winningPartyID] || 0) + 1;

        return partyToWins;
      }, {}),
    );
  }

  get summary() {
    return this.getResult('LK').summary;
  }
}
