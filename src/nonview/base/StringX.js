
export default class StringX {
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
      
      static isConsonentSi(char) {
        return /^[ක-ෆඅ-උ]$/.test(char);
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
        const shortWord =  word.substring(0, i);
        return shortWord;
      }
      
      static getShortLabelSi(name) {
        const words = name.split(" ");
        if (words.length === 1) {
          return StringX.getShortWordSi(name, 2);
        }
        return words.map((word) => StringX.getShortWordSi(word, 1)).join("");
       
      }
      
      static isEn(name) {
        return /^[a-zA-Z]+$/.test(name.split(" ")[0]);
      }
      
      static getShortLabel(name) {
        if (StringX.isEn(name)) {
          return StringX.getShortLabelEn(name);
        }
        return StringX.getShortLabelSi(name);
      }
}