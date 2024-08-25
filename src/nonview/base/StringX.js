export default class StringX {
  // En
  static isEn(name) {
    return /^[a-zA-Z]+$/.test(name.split(" ")[0]);
  }

  static replaceLowercaseVowels(str) {
    return str.replace(/[aeiou]/g, "");
  }

  static getShortLabelEn(name) {
    name = StringX.replaceLowercaseVowels(name);
    const words = name.split(" ");
    if (words.length === 1) {
      return name.substring(0, 3).toUpperCase();
    }
    return words.map((word) => word.substring(0, 1)).join("");
  }

  // Si
  static isSi(name) {
    const firstChar = name.split(" ")[0].substring(0, 1);
    return /^[ඁ-෴]+$/.test(firstChar);
  }
  static isConsonentSi(char) {
    return /^[අ-උක-ෆ]$/.test(char);
  }

  static getShortWordSi(word, maxConsonents) {
    const n = word.length;
    let i = 0;
    let nConsonents = 0;
    for (i = 0; i < n; i++) {
      const char = word.charAt(i);
      if (StringX.isConsonentSi(char)) {
        nConsonents++;
        if (nConsonents > maxConsonents) {
          break;
        }
      }
    }
    const shortWord = word.substring(0, i);
    return shortWord;
  }

  static getShortLabelSi(name) {
    const words = name.split(" ");
    if (words.length === 1) {
      return StringX.getShortWordSi(name, 1);
    }
    return words.map((word) => StringX.getShortWordSi(word, 1)).join("");
  }

  // Ta
  static isTa(name) {
    const firstChar = name.split(" ")[0].substring(0, 1);
    return /^[அ-௺]+$/.test(firstChar);
  }

  static isConsonentTa(char) {
    return /^[க-ஹ]$/.test(char);
  }

  static getShortWordTa(word, maxConsonents) {
    const n = word.length;
    let i = 0;
    let nConsonents = 0;
    for (i = 0; i < n; i++) {
      const char = word.charAt(i);
      if (StringX.isConsonentTa(char)) {
        nConsonents++;
        if (nConsonents > maxConsonents) {
          break;
        }
      }
    }
    const shortWord = word.substring(0, i);
    return shortWord;
  }

  static getShortLabelTa(name) {
    const words = name.split(" ");
    if (words.length === 1) {
      return StringX.getShortWordTa(name, 1);
    }
    return words.map((word) => StringX.getShortWordTa(word, 1)).join("");
  }

  // Common

  static getShortLabel(name) {
    if (StringX.isEn(name)) {
      return StringX.getShortLabelEn(name);
    }
    if (StringX.isSi(name)) {
      return StringX.getShortLabelSi(name);
    }
    if (StringX.isTa(name)) {
      return StringX.getShortLabelTa(name);
    }
    return name;
  }
  static getBaseFontSize(text) {
    if (StringX.isSi(text)) {
      return 2.0;
    }
    if (StringX.isTa(text)) {
      return 2.5;
    }
    return 1.2;
  }

  static getFontSize(shortLabel) {
    const baseFontSize = StringX.getBaseFontSize(shortLabel);
    return baseFontSize / Math.max(shortLabel.length, 3);
  }
}
