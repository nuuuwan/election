import Time from './Time';

export default class Timer {
  static ERROR_MULT = 1;

  static getLogger(maxDelta, delta) {
    if (delta < maxDelta) {
      return null;
    }
    return console.warn;
  }

  static async logAsync(name, maxDelta, callable) {
    return Timer._logInternal(name, maxDelta, callable, true);
  }

  static log(name, maxDelta, callable) {
    return Timer._logInternal(name, maxDelta, callable, false);
  }

  static async _logInternal(name, maxDelta, callable, isAsync) {
    const ut = Time.now().ut;
    const output = isAsync ? await callable() : callable();
    const delta = Time.now().ut - ut;

    const logger = Timer.getLogger(maxDelta, delta);

    if (logger) {
      logger(`🕒[${name}] ${delta}ms (goal: ${maxDelta}ms)`);
    }
    return output;
  }
}
