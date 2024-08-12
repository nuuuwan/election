let STYLE = {};
STYLE.FOOTER_HEIGHT = 60;
STYLE.WIDTH = window.innerWidth;
STYLE.FONT_SIZE = 10;
STYLE.FONT_FAMILY = "Cabin";
STYLE.HEIGHT = window.innerHeight - STYLE.FOOTER_HEIGHT;
STYLE.ASPECT_RATIO = STYLE.WIDTH / STYLE.HEIGHT;
STYLE.N_COLUMNS = STYLE.ASPECT_RATIO > 1.5 ? 4 : 1;
STYLE.COLUMN_WIDTH = STYLE.WIDTH / STYLE.N_COLUMNS;
STYLE.PCT_COLUMN_WIDTH = parseInt(100.0 / STYLE.N_COLUMNS) + "%";

export default STYLE;
