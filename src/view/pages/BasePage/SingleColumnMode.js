import MapIcon from "@mui/icons-material/Map";
import PieChartIcon from "@mui/icons-material/PieChart";
import FunctionsIcon from "@mui/icons-material/Functions";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";

export default class SingleColumnMode {
  constructor(id, getRenderer, Icon) {
    this.id = id;
    this.getRenderer = getRenderer;
    this.Icon = Icon;
  }

  static MAP = new SingleColumnMode(
    "map",
    (basePage) => basePage.renderColumnMap(),
    MapIcon
  );
  static RESULT = new SingleColumnMode(
    "result",
    (basePage) => basePage.renderColumnResult(),
    PieChartIcon
  );
  static LK_RESULT = new SingleColumnMode(
    "lk_result",
    (basePage) => basePage.renderColumnLKResult(),
    FunctionsIcon
  );
  static prediction = new SingleColumnMode(
    "prediction",
    (basePage) => basePage.renderColumnPrediction(),
    OnlinePredictionIcon
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
