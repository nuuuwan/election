export default class Time {
  constructor(ut) {
    this.ut = ut;
  }

  static now() {
    return new Time(Date.now());
  }

  static fromString(s) {
    return new Time(Date.parse(s));
  }

  toString() {
    return this.getDate().toDateString();
  }

  getDate() {
    return new Date(this.ut);
  }

  get date() {
    const date = this.getDate();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
