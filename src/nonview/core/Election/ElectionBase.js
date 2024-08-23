import { Time, Translate } from "../../base/index.js";
import STYLE from "../../constants/STYLE.js";
import Party from "../Party.js";

export default class ElectionBase {
  static URL_BASE =
    "https://raw.githubusercontent.com/nuuuwan/gig-data/master/gig2_custom_ec_only";
  constructor(electionType, date) {
    this.electionType = electionType;
    this.date = date;
    this.resultList = null;
    this.resultIdx = null;
    this.isLoaded = false;
  }

  get electionTypeTitle() {
    if (this.electionType === "Presidential") {
      return "Presidential";
    }
    return "Parliamentary";
  }

  get title() {
    return this.year + " " + Translate(this.electionTypeTitle);
  }

  get titleLong() {
    return this.year + " " + Translate("Sri Lankan " + this.electionTypeTitle + " Election");
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
      return STYLE.COLOR.LIGHTEST;
    }
    const resultLK = this.resultLK;
    const winningPartyID = resultLK.partyToVotes.winningPartyID;
    if (resultLK.partyToVotes.pWinner < 0.5) {
      return STYLE.COLOR.LIGHTER;
    }
    return Party.fromID(winningPartyID).color;
  }

  get nResults() {
    return this.pdResultList.length;
  }

  get finalResult() {
    return this.pdResultList[this.nResults - 1];
  }

  get finalPDID() {
    return this.finalResult.entID;
  }

  get resultLK() {
    return this.getResult("LK");
  }

  get pdIDList() {
    return this.pdResultList.map((result) => result.entID);
  }
}
