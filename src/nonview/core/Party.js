import { Color, PARTY_TO_LOGO, POLITICAL_PARTY_TO_COLOR } from '..';

export default class Party {
  static OTHER = new Party('Other', 'Other');
  static OTHER_TRUNCATED = new Party('__OTHER', 'Other-Truncated');
  static ERROR = new Party('???', '???');
  static NON_PARTY_ID_LIST = [
    Party.OTHER.id,
    Party.ERROR.id,
    Party.OTHER_TRUNCATED.id,
  ];

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

  get logo() {
    return (PARTY_TO_LOGO[this.id] || '').replaceAll(' ', '_');
  }

  get logoImgSrc() {
    return (
      window.location.origin + // eslint-disable-next-line no-undef
      process.env.PUBLIC_URL +
      '/images/party_logos/' +
      this.logo +
      '.png'
    );
  }

  get isNonParty() {
    return Party.NON_PARTY_ID_LIST.includes(this.id);
  }

  get emoji() {
    return Color.getEmoji(this.color);
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
