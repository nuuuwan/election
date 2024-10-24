import { POLITICAL_PARTY_TO_COLOR } from '..';

export default class Party {
  static OTHER = new Party('Other', 'Other');
  static ERROR = new Party('???', '???');
  static NON_PARTY_ID_LIST = [Party.OTHER.id, Party.ERROR.id];

  constructor(id) {
    this.id = id;
  }

  static fromID(id) {
    return new Party(id);
  }

  get color() {
    if (this.id === Party.ERROR.id) {
      return 'lightgray';
    }
    if (this.id === Party.OTHER.id) {
      return 'gray';
    }
    return POLITICAL_PARTY_TO_COLOR[this.id] || 'lightgray';
  }

  get isNonParty() {
    return Party.NON_PARTY_ID_LIST.includes(this.id);
  }

  get emoji() {
    return (
      {
        SJB: '🟢',
        NPP: '🔴',
        IND16: '🟠',
        IND9: '🔵',
        SLPP: '🟣',
        SLCP: '🔵',
        // History
        NDF: '🟢',
        UNP: '🟢',
        SLMP: '🟣',
        UPFA: '🔵',
        PA: '🔵',
        SLFP: '🔵',
        ACTC: '🟠',
      }[this.id] || '⚪'
    );
  }

  get xTag() {
    return (
      {
        SJB: '@SJBSriLanka',
        NPP: '@NPPSLOfficial',
        IND16: '@RW_SRILANKA',
        SLPP: '@PodujanaParty',
        SLCP: '@Dilith_J',
      }[this.id] || '#' + this.id
    );
  }
}
