import DICTIONARY from './DICTIONARY';

export default class Translate {

    static TRANSLATE_IDX = Object.fromEntries(
        ['en', 'si', 'ta'].map((lang) => [lang, new Translate(lang)])
    )
    static TRANSLATE =  null;

    constructor(lang) {
        this.lang = lang;
    }

    getTranslationInLanguage(phrase, lang) {
        if (!DICTIONARY[phrase]) {
            return phrase;
        }
        if (!DICTIONARY[phrase][lang]) {
            return phrase;
        }
        return DICTIONARY[phrase][lang];
    }

    getTranslation(phrase) {
        if (this.lang === 'en') {
            return phrase;
        }
        return this.getTranslationInLanguage(phrase, this.lang);
    }

    static setLang(lang) {
        Translate.TRANSLATE = Translate.TRANSLATE_IDX[lang];
        return Translate.TRANSLATE;
    }

}