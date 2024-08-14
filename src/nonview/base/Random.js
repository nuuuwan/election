export default class Random {
  static randomFloat(minValue, maxValue) {
    return minValue + Math.random() * (maxValue - minValue);
  }

  static randomInt(minValue, maxValue) {
    return parseInt(Random.randomFloat(minValue, maxValue));
  }

  static choice(choices) {
    const index = Random.randomInt(0, choices.length);
    return choices[index];
  }

  static coinFlipWin(winRate) {
    return Math.random() < winRate;
  }

  static shuffle(arr) {
    const shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Random.randomInt(0, i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
