import Time from './Time';

export default class Timer {
  static getLogger(maxDelta, delta) {
    if (delta < maxDelta) {
      return null;
    }
    return console.warn;
  }

  static async logAsync(name, maxDelta, callable) {
    const ut = Time.now().ut;
    const output = await callable();
    const delta = Time.now().ut - ut;

    const logger = Timer.getLogger(maxDelta, delta);

    if (logger) {
      logger(`🕒[${name}] ${delta}ms (goal: ${maxDelta}ms)`);
    }
    return output;
  }
}
