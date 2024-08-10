export default class EntType {
  constructor(name) {
    this.name = name;
  }

  get longName() {
    return {
      country: "Country",
      pd: "Polling Division",
      ed: "Electoral District",
    }[this.name];
  }

  get short() {
    return {
      country: "",
      pd: "PD",
      ed: "ED",
    }[this.name];
  }

  get level() {
    return {
      country: 1,
      province: 2,
      ed: 3,
      district: 4,
      pd: 5,
    }[this.name];
  }

  get longNamePlural() {
    return this.longName + "s";
  }

  get longNameCamel() {
    return this.longName.replaceAll(" ", "");
  }

  get longNameSnake() {
    return this.longName.replaceAll(" ", "_");
  }

  get idKey() {
    return this.name + "ID";
  }

  static fromIDLK(entID) {
    if (entID.substring(0, 2) !== "LK") {
      return null;
    }
    const entIDLength = entID.length;
    switch (entIDLength) {
      case 2:
        return EntType.COUNTRY;
      case 4:
        return EntType.PROVINCE;
      case 5:
        return EntType.DISTRICT;

      default:
        return null;
    }
  }

  static fromIDEC(entID) {
    if (entID.substring(0, 2) !== "EC") {
      return null;
    }
    const entIDLength = entID.length;
    switch (entIDLength) {
      case 5:
        return EntType.ED;
      case 6:
        return EntType.PD;
      default:
        return null;
    }
  }

  static fromID(entID) {
    return EntType.fromIDLK(entID) || EntType.fromIDEC(entID);
  }
}

EntType.COUNTRY = new EntType("country");
EntType.PROVINCE = new EntType("province");
EntType.DISTRICT = new EntType("district");
EntType.PD = new EntType("pd");
EntType.ED = new EntType("ed");
