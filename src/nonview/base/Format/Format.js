import FormatGeneric from "./FormatGeneric";
import FormatInt from "./FormatInt";
import FormatPercent from "./FormatPercent";
import FormatPercentagePoint from "./FormatPercentagePoint";
import FormatString from "./FormatString";
import FormatMisc from "./FormatMisc";
class Format {}

Object.assign(
  Format,
  FormatGeneric,
  FormatMisc,
  FormatString,
  FormatInt,
  FormatPercent,
  FormatPercentagePoint
);

export default Format;
