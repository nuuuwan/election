export default class EntType {
  constructor(name) {
    this.name = name;
  }

  get nameForData() {
    if (this.name === 'pd') {
      return 'pd_with_postal';
    }
    return this.name;
  }

  get shortName() {
    return (
      {
        country: ' ',
        province: ' ',
        pd: 'PD',
        ed: 'ED',
      }[this.name] || this.name.toUpperCase()
    );
  }

  get longName() {
    return (
      {
        country: 'Islandwide',
        province: 'Province',
        district: 'District',
        pd: 'Polling Division',
        ed: 'Electoral District',
        ez: 'Ethnicity',
      }[this.name] || this.name
    );
  }

  static fromIDLK(entID) {
    if (entID.substring(0, 2) !== 'LK') {
      return null;
    }
    const entIDLength = entID.length;

    return (
      {
        2: EntType.COUNTRY,
        4: EntType.PROVINCE,
        5: EntType.DISTRICT,
      }[entIDLength] || null
    );
  }

  static fromIDEC(entID) {
    if (entID.substring(0, 2) !== 'EC') {
      return null;
    }
    const entIDLength = entID.length;

    return (
      {
        5: EntType.ED,
        6: EntType.PD,
      }[entIDLength] || null
    );
  }

  static fromID(entID) {
    return EntType.fromIDLK(entID) || EntType.fromIDEC(entID) || EntType.EZ;
  }
}

EntType.COUNTRY = new EntType('country');
EntType.PROVINCE = new EntType('province');
EntType.DISTRICT = new EntType('district');
EntType.PD = new EntType('pd');
EntType.ED = new EntType('ed');
EntType.EZ = new EntType('ez');
