let STYLE = {};

function gray(x) {
  return "#" + x.repeat(3);
}

STYLE.FONT_SIZE = 14;
STYLE.FONT_FAMILY = "Freeman";

STYLE.COLOR = {
  LIGHTEST: gray("e"),
  LIGHTER: gray("c"),
  LIGHT: gray("a"),
  MEDIUM: gray("8"),
  DARK: gray("6"),
  DARKER: gray("4"),
  DARKEST: gray("2"),
};

STYLE.MESSAGE = {
  padding: 4,
};

export default STYLE;
