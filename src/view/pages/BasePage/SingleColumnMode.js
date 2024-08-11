import MapIcon from "@mui/icons-material/Map";
import FunctionsIcon from "@mui/icons-material/Functions";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
export default class SingleColumnMode {
  constructor(id, description, getRenderer, Icon) {
    this.id = id;
    this.description = description;
    this.getRenderer = getRenderer;
    this.Icon = Icon;
  }

  static MAP = new SingleColumnMode(
    "map",
    "Islandwide Results Map",
    (basePage) => basePage.renderColumnMap(),
    MapIcon
  );
  static RESULT = new SingleColumnMode(
    "result",
    "Latest Result",
    (basePage) => basePage.renderColumnResult(),
    ScheduleIcon
  );
  static LK_RESULT = new SingleColumnMode(
    "lk_result",
    "Islandwide Result",
    (basePage) => basePage.renderColumnLKResult(),
    FunctionsIcon
  );
  static prediction = new SingleColumnMode(
    "prediction",
    "Projected Results",
    (basePage) => basePage.renderColumnPrediction(),
    TipsAndUpdatesIcon
  );

  static listAll() {
    return [
      SingleColumnMode.MAP,
      SingleColumnMode.RESULT,
      SingleColumnMode.LK_RESULT,
      SingleColumnMode.prediction,
    ];
  }
}
