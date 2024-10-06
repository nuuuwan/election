import { Time, Translate } from "../..";

export default class ElectionBase {
  static URL_BASE =
    "https://raw.githubusercontent.com/nuuuwan/gig-data/master/gig2_custom_ec_only";
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

  get electionTypeTitle() {
    if (this.electionType === "Presidential") {
      return "Presidential";
    }
    return "Parliamentary";
  }

  get isPresidential() {
    return this.electionType === "Presidential";
  }

  get title() {
    if (this.date === "2024-09-22") {
      return "2024 Presidential (2nd Count)";
    }
    return this.year + " " + Translate(this.electionTypeTitle);
  }

  get titleLong() {
    return (
      this.year +
      " " +
      Translate("Sri Lankan " + this.electionTypeTitle + " Election")
    );
  }

  get year() {
    return this.date.substring(0, 4);
  }

  get electionTypeHashTag() {
    if (this.electionType === "Presidential") {
      return "PresPollSL";
    }
    return "GenElecSL";
  }

  get hashTag() {
    return this.electionTypeHashTag + this.year.toString();
  }

  get hashTagList() {
    return [
      "🇱🇰 ",
      this.hashTag,
      "#SriLanka",
      "#LKA",
      "#SriLankaElections",
      "#Election" + this.year,
      "#PresidentialElection" + this.year,
    ];
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
    const DATE_FUTURE = "2024-09-01";
    return this.date.localeCompare(DATE_FUTURE) > 0;
  }

  localeCompare(other) {
    return this.date.localeCompare(other.date);
  }

  get color() {
    if (!this.resultIdx) {
      return "gray";
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
}
