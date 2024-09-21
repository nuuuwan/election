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
      console.warn(phrase);
      return phrase;
    }
    return DICTIONARY[phrase][lang];
  }

  static getTranslationWithoutParams(phrase) {
    if (['%'].includes(phrase)) {
      return phrase;
    }
    if (typeof phrase !== "string") {
      return phrase;
    }
    const lang = Translate.getLang();
    if (lang === Translate.DEFAULT_LANG) {
      return phrase;
    }
    return Translate.getTranslationInLanguage(phrase, lang);
  }

  static getTranslation(phrase, params) {
    let translation = Translate.getTranslationWithoutParams(phrase);
    if (!params) {
      return translation;
    }
    for (let i = 0; i < params.length; i++) {
      translation = translation.replace("%" + (i + 1).toString(), params[i]);
    }
    return translation;
  }
}

const t = Translate.getTranslation;
export default t;
