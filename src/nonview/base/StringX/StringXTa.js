export default class StringXTa {
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
            if (StringXTa.isConsonentTa(char)) {
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
        const maxConsonents = 2;
        const words = name.split(" ").slice(0, maxConsonents);
        if (words.length === 1) {
            return StringXTa.getShortWordTa(name, maxConsonents);
        }
        return words.map((word) => StringXTa.getShortWordTa(word, 1)).join("/");
    }
}
