export default class StringXEn {
  static isEn(name) {
    return /^[a-zA-Z]+$/.test(name.split(" ")[0]);
  }

  static replaceLowercaseVowels(str) {
    return str.replace(/[aeiou]/g, "");
  }

  static getShortLabelEn(name) {
    name = name.replaceAll("-", " ");
    name = StringXEn.replaceLowercaseVowels(name);
    const words = name.split(" ");
    if (words.length === 1) {
      return name.substring(0, 3).toUpperCase();
    }
    return words.map((word) => word.substring(0, 1)).join("");
  }
}
