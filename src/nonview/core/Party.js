import { POLITICAL_PARTY_TO_COLOR, STYLE } from "../constants";

export default class Party {
  static OTHER = new Party("Other", "Other");
  static UNCERTAIN = new Party("Uncertain", "Uncertain");
  static NON_PARTY_ID_LIST = [Party.OTHER.id, Party.UNCERTAIN.id];
  
  constructor(id) {
    this.id = id;

  }

  static fromID(id) {
    return new Party(id);
  }

  get color() {
    if (this.id === Party.UNCERTAIN.id) {
      return STYLE.COLOR.LIGHTER;
    }
    if (this.id === Party.OTHER.id) {
      return STYLE.COLOR.LIGHT;
    }
    return POLITICAL_PARTY_TO_COLOR[this.id] || STYLE.COLOR.LIGHT;
  }

  get isNonParty () {
    return Party.NON_PARTY_ID_LIST.includes(this.id);
  }

}
