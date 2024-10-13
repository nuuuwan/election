export default class StringXSi {
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
            if (StringXSi.isConsonentSi(char)) {
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
        const maxConsonents = 2;
        const words = name.split(" ").slice(0, maxConsonents);
        if (words.length === 1) {
            return StringXSi.getShortWordSi(name, maxConsonents);
        }
        return words.map((word) => StringXSi.getShortWordSi(word, 1)).join("/");
    }
}
