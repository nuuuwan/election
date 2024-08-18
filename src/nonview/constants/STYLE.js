let STYLE = {};

function gray(x) {
  return "#" + x.repeat(3);
}

STYLE.COLOR = {
  LIGHTEST: gray("e"),
  LIGHTER: gray("c"),
  LIGHT: gray("8"),
  DARK: gray("4"),
  DARKER: gray("2"),
};

STYLE.BODY_HEADER = {
  p: 0.5,
  height: 65,
};

STYLE.FONT_SIZE = 14;
STYLE.FONT_FAMILY = "Lexend Deca";

STYLE.MESSAGE = {
  padding: 1,
  marginTop: 1,
  margin: "auto",
  alignContent: "center",
  alignItems: "center",
  textAlign: "center",
  maxWidth: 320,
};

export default STYLE;
