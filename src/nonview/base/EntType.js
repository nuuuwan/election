export default class EntType {
  constructor(name) {
    this.name = name;
  }

  get shortName() {
    if (this.name === "country") {
      return "";
    }
    if (this.name === "province") {
      return "Pr.";
    }
    return this.name.toUpperCase();
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
