import { Time } from "../../base/index.js";
import STYLE from "../../constants/STYLE.js";
import Party from "../Party.js";

export default class ElectionBase {
  static URL_BASE =
    "https://raw.githubusercontent.com/nuuuwan/gig-data/master/gig2_custom_ec_only";
  constructor(electionType, date) {
    this.electionType = electionType;
    this.date = date;
  }

  get id() {
    return this.date;
  }

  get electionTypeTitle() {
    if (this.electionType === "Presidential") {
      return "Presidential";
    }
    return "Parliamentary";
  }

  get title() {
    return this.year + " " + this.electionTypeTitle;
  }

  get year() {
    return this.date.substring(0, 4);
  }

  get dateFormatted() {
    return Time.fromString(this.date).getDate().toLocaleDateString("en-LK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  get urlData() {
    return (
      ElectionBase.URL_BASE +
      "/government-elections-" +
      this.electionType.toLowerCase() +
      ".regions-ec." +
      this.year +
      ".tsv"
    );
  }

  get isFuture() {
    return this.date.localeCompare(Time.now().date) > 0;
  }

  localeCompare(other) {
    return this.date.localeCompare(other.date);
  }

  get color() {
    if (!this.resultIdx) {
      return STYLE.COLOR.LIGHT;
    }
    const resultLK = this.resultLK;
    const winningPartyID = resultLK.partyToVotes.winningPartyID;
    return Party.fromID(winningPartyID).color;
  }
}
