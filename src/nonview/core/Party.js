import { POLITICAL_PARTY_TO_COLOR, STYLE } from "../constants";
import { LIGHT_COLORS } from "../constants/POLITICAL_PARTY_TO_COLOR";
import PARTY_LIST_TUPLES from "./PARTY_LIST_TUPLES";

export default class Party {
  static OTHER = new Party("Other", "Other");
  static UNCERTAIN = new Party("Uncertain", "Uncertain");
  static NON_PARTY_ID_LIST = [Party.OTHER.id, Party.UNCERTAIN.id];
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  // getters

  get wikiPageName() {
    return this.name.replaceAll(" ", "_");
  }

  get color() {
    if (this.id === Party.UNCERTAIN.id) {
      return STYLE.COLOR.LIGHTER;
    }
    if (this.id === Party.OTHER.id) {
      return STYLE.COLOR.LIGHT;
    }
    return POLITICAL_PARTY_TO_COLOR[this.id] || "#444";
  }

  get inverseColor() {
    return LIGHT_COLORS.includes(this.color) ? "black" : "white";
  }

  localeCompare(other) {
    return this.id.localeCompare(other.id);
  }

  getCustomLabel(labelType) {
    if (labelType === "handle") {
      return this.handle;
    }
    if (labelType === "name") {
      return this.name;
    }
    return this.id;
  }

  // static getters
  static listAll() {
    return PARTY_LIST_TUPLES.map(function ([id, name]) {
      return new Party(id, name);
    });
  }

  static listPartyIDs() {
    return this.listAll().map((party) => party.id);
  }

  static fromID(id) {
    const party = this.listAll().find((party) => party.id === id);
    if (party) {
      return party;
    }

    return new Party(id, id);
  }

  static isKnownPartyID(partyID) {
    return Party.listPartyIDs().includes(partyID);
  }
}
