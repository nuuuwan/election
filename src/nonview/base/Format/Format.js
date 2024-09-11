import FormatGeneric from "./FormatGeneric";
import FormatInt from "./FormatInt";
import FormatPercent from "./FormatPercent";
class Format {}

Object.assign(
  Format,
  FormatGeneric,


  FormatInt,
  FormatPercent,

);

export default Format;
