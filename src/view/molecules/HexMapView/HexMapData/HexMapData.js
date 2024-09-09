import HEXMAP_DATA_ED from "./HEXMAP_DATA_ED_UNITS";
import HEXMAP_DATA_PD from "./HEXMAP_DATA_PD_UNITS";
import HEXMAP_DATA_PROVINCE from "./HEXMAP_DATA_PROVINCE_UNITS";
import HEXMAP_DATA_POSTAL_PD from "./HEXMAP_DATA_ED_UNITS";

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

  static getPDMapData() {
    return HEXMAP_DATA_PD;
  }

  static getPostalPDMapData() {
    return HexMapData.offsetData(HEXMAP_DATA_POSTAL_PD, "P", [10, 0]);
  }

  static getEDMapData() {
    return HexMapData.offsetData(HEXMAP_DATA_ED, "", [-3, 2]);
  }

  static getProvinceMapData() {
    return HexMapData.offsetData(HEXMAP_DATA_PROVINCE, "", [-3, 16]);
  }
  static getMapDataList() {
    return [
      HexMapData.getPostalPDMapData(),
      HexMapData.getPDMapData(),
      HexMapData.getEDMapData(),
      HexMapData.getProvinceMapData(),
    ];
  }
}
