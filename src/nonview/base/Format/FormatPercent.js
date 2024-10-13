import FormatGeneric from "./FormatGeneric";

const FormatPercent = {
    percentAbs(x, minimumFractionDigits = undefined) {
        if (!x) {
            return "";
        }
        if (x < 0.000001) {
            return "0.0%";
        }

        if (minimumFractionDigits === undefined) {
            minimumFractionDigits = 0;
        }

        return x.toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits,
        });
    },

    percentVotes(x) {
        let minimumFractionDigits = 0;
        const diffX = Math.abs(x - 0.5);
        if (diffX === 0) {
            return "50%";
        }
        if (diffX < 0.01) {
            minimumFractionDigits = Math.ceil(-Math.log10(diffX) - 2);
        }
        return FormatPercent.percentAbs(x, minimumFractionDigits);
    },

    percent(x, minimumFractionDigits = undefined) {
        if (x < 0.005 && x > 0) {
            return "<0.5%";
        }
        const absX = Math.abs(x);
        const sign = x < 0 ? "-" : "";
        return sign + FormatPercent.percentAbs(absX, minimumFractionDigits);
    },

    percentSigned(x, minimumFractionDigits = undefined) {
        if (x < 0.005 && x > 0) {
            return "<0.5%";
        }
        const absX = Math.abs(x);
        const sign = x < 0 ? "-" : "+";
        return sign + FormatPercent.percentAbs(absX, minimumFractionDigits);
    },

    percentError(x) {
        return x.toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
        });
    },

    percentFixed(x) {
        return x.toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
        });
    },

    percentWithStyle(
        x,
        valueRange = [0.01, 0.67],
        fontSizeRange = FormatGeneric.DEFAULT_FONT_SIZE_RANGE
    ) {
        return FormatGeneric.formatWithStyle(
            x,
            FormatPercent.percent,
            valueRange,
            fontSizeRange
        );
    },

    percentVotesRange(p1, p2) {
        const s1 = FormatPercent.percentVotes(p1);
        const s2 = FormatPercent.percentVotes(p2);
        if (s1 === s2 || !s2) {
            return s1;
        }
        return s1.substring(0, s1.length - 1) + " - " + s2;
    },
};
export default FormatPercent;
