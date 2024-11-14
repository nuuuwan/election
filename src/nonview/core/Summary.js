export default class Summary {
  static KEYS = ['valid', 'rejected', 'polled', 'electors'];
  constructor(valid, rejected, polled, electors) {
    this.valid = valid;
    this.rejected = rejected;
    this.polled = polled;
    this.electors = electors;
  }

  toDict() {
    return {
      valid: this.valid,
      rejected: this.rejected,
      polled: this.polled,
      electors: this.electors,
      pTurnout: this.pTurnout,
      pRejected: this.pRejected,
    };
  }

  static fromDict(d) {
    const summary = {};
    for (const key in d) {
      if (Summary.KEYS.includes(key)) {
        summary[key] = parseInt(
          d[key].toString().replaceAll("'", '').replaceAll('"', ''),
        );
      }
    }
    return new Summary(
      summary.valid,
      summary.rejected,
      summary.polled,
      summary.electors,
    );
  }

  static fromList(resultList) {
    const summary = {};
    for (const key of Summary.KEYS) {
      summary[key] = 0;
    }

    for (const result of resultList) {
      if (!result) {
        continue;
      }
      for (const key of Summary.KEYS) {
        summary[key] += parseInt(result.summary[key]) || 0;
      }
    }
    return new Summary(
      summary.valid,
      summary.rejected,
      summary.polled,
      summary.electors,
    );
  }

  static aggregate(summaryList) {
    const summary = {};
    for (const key of Summary.KEYS) {
      summary[key] = 0;
    }

    for (const s of summaryList) {
      for (const key of Summary.KEYS) {
        summary[key] += s[key];
      }
    }
    return new Summary(
      summary.valid,
      summary.rejected,
      summary.polled,
      summary.electors,
    );
  }

  get pTurnout() {
    return this.polled / this.electors;
  }

  get pRejected() {
    return this.rejected / this.polled;
  }

  get pValid() {
    return this.valid / this.polled;
  }

  get pEffective() {
    return this.valid / this.electors;
  }
}
