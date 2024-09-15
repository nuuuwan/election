export default class EntType {
  constructor(name) {
    this.name = name;
  }

  get shortName() {
    switch (this.name) {
      case "country":
        return "";
      case "province":
        return "Pr.";
      case "pd":
        return "PD";
      case "ed":
        return "ED";
      default:
        return this.name.toUpperCase();
    }
  }

  get longName() {
    return {
      country: "",
      province: "Province",
      district: "District",
      pd: "Polling Division",
      ed: "Electoral District",
      ez: "Electoral Zone",
    }[this.name];

    switch (this.name) {
      case "country":
        return "";
      case "province":
        return "Province";
      case "district":
        return "District";
      case "pd":
        return "Polling Division";
      case "ed":
        return "Electoral District";
      case "ez":
        return "Electoral Zone";
      default:
        return this.name;
    }
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
    return EntType.fromIDLK(entID) || EntType.fromIDEC(entID) || EntType.EZ;
  }
}

EntType.COUNTRY = new EntType("country");
EntType.PROVINCE = new EntType("province");
EntType.DISTRICT = new EntType("district");
EntType.PD = new EntType("pd");
EntType.ED = new EntType("ed");
EntType.EZ = new EntType("ez");
