let STYLE = {
  WIDTH: window.innerWidth,
  HEIGHT: window.innerHeight,
  FONT_SIZE: 10,
  FONT_FAMILY: "Afacad",
  N_COLUMNS: 4,
};

STYLE.COLUMN_WIDTH = STYLE.WIDTH / STYLE.N_COLUMNS;
STYLE.PCT_COLUMN_WIDTH = parseInt(100.0 / STYLE.N_COLUMNS) + "%";

export default STYLE;
