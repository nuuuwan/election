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

  getDate() {
    return new Date(this.ut);
  }

  // Format


  getComponents() {
    const date = this.getDate();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return { year, month, day, hours, minutes, seconds };
  }

  get dateID() {
    const { year, month, day } = this.getComponents();
    return `${year}${month}${day}`;
  }

  get dateString() {
    const { year, month, day } = this.getComponents();
    return `${year}-${month}-${day}`;
  }

  get dateTimeString() {
    const { year, month, day, hours, minutes,seconds } = this.getComponents();

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  get timeID() {
    const { year, month, day, hours, minutes, seconds } = this.getComponents();

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }

  get timeIDWithoutSeconds() {
    const { year, month, day, hours, minutes } = this.getComponents();

    return `${year}${month}${day}${hours}${minutes}`;
  }

  // lapse

  get secondsFromNow() {
    return (Time.now().ut - this.ut) / 1000;
  }

  get secondsFromNowHumanized() {
    const seconds = this.secondsFromNow;
    if (seconds < 0) {
      return "Future";
    }
    if (seconds < 60) {
      return `${Math.floor(seconds)}s ago`;
    }
    if (seconds < 60 * 60) {
      return `${Math.floor(seconds / 60)}m ago`;
    }
    if (seconds < 60 * 60 * 24) {
      return `${Math.floor(seconds / 60 / 60)}h ago`;
    }
    return `${Math.floor(seconds / 60 / 60 / 24)}d ago`;
  }
}
