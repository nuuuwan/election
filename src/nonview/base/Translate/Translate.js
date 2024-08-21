import URLContext from "../URLContext";
import DICTIONARY from "./DICTIONARY";

class Translate {
  static DEFAULT_LANG = "en";

  static getLang() {
    const context = URLContext.get();
    return context.lang || Translate.DEFAULT_LANG;
  }

  static getTranslationInLanguage(phrase, lang) {
    if (!DICTIONARY[phrase] || !DICTIONARY[phrase][lang]) {
      console.error(phrase);
      return phrase;
    }
    return DICTIONARY[phrase][lang];
  }

  static getTranslation(phrase) {
    if (typeof phrase !== "string") {
      return phrase;
    }
    const lang = Translate.getLang();
    if (lang === Translate.DEFAULT_LANG) {
      return phrase;
    }
    return Translate.getTranslationInLanguage(phrase, lang);
  }
}

const t = Translate.getTranslation;
export default t;
