import HEXMAP_DATA_ED from "./HEXMAP_DATA_ED_UNITS";
import HEXMAP_DATA_PD from "./HEXMAP_DATA_PD_UNITS";
import HEXMAP_DATA_PROVINCE from "./HEXMAP_DATA_PROVINCE_UNITS";
import HEXMAP_DATA_POSTAL_PD from "./HEXMAP_DATA_ED_UNITS";
import { EntType } from "../../../../nonview";

export default class HexMapData {
  static offsetData(originalData, idSuffix, [offsetX, offsetY]) {
    const idx = Object.fromEntries(
      Object.entries(originalData.idx).map(function ([entID, points]) {
        return [
          entID + idSuffix,
          points.map(function ([x, y]) {
            return [x + offsetX, y + offsetY];
          }),
        ];
      })
    );
    const idx2 = Object.fromEntries(
      Object.entries(originalData.idx2).map(function ([
        groupType,
        groupIDToPolygons,
      ]) {
        return [
          groupType,
          Object.fromEntries(
            Object.entries(groupIDToPolygons).map(function ([
              groupID,
              polygons,
            ]) {
              return [
                groupID,
                polygons.map(function (polygon) {
                  return polygon.map(function ([x, y]) {
                    return [x + offsetX, y + offsetY];
                  });
                }),
              ];
            })
          ),
        ];
      })
    );
    return Object.assign({}, HEXMAP_DATA_ED, { idx, idx2 });
  }

  static getMapDataList(baseEntType) {
    switch (baseEntType) {
      case EntType.PD:
        return [
          HEXMAP_DATA_PD,
          HexMapData.offsetData(HEXMAP_DATA_POSTAL_PD, "P", [-5, 2]),

          HexMapData.offsetData(HEXMAP_DATA_PROVINCE, "", [-5, 9]),
          HexMapData.offsetData(HEXMAP_DATA_ED, "", [-5, 14]),
        ];
      case EntType.ED:
        return [
          HexMapData.offsetData(HEXMAP_DATA_ED, "", [0, 0]),
          HexMapData.offsetData(HEXMAP_DATA_PROVINCE, "", [6, 4]),
        ];
      default:
        throw new Error("Unknown baseEntType: " + baseEntType);
    }
  }
}
