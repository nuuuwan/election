import HEXAGON_MAP_DATA_ED from "./HEXAGON_MAP_DATA_ED";
import HEXAGON_MAP_DATA_PD from "./HEXAGON_MAP_DATA_PD";
import HEXAGON_MAP_DATA_PROVINCE from "./HEXAGON_MAP_DATA_PROVINCE";

export default class HexagonMapData {
  static offsetData(originalData, idSuffix, [offsetX, offsetY]) {
    const idx = Object.fromEntries(
      Object.entries(originalData.idx).map(function ([entID, [x, y]]) {
        return [entID + idSuffix, [x + offsetX, y + offsetY]];
      })
    );
    const idx2 = Object.fromEntries(
     Object.entries(originalData.idx2).map(
      function([groupType,groupIDToPolygons]) {
        return [groupType, Object.fromEntries(
          Object.entries(groupIDToPolygons).map(function ([groupID, polygons]) {
            return [
              groupID,
              polygons.map(function (polygon) {
                return polygon.map(function ([x, y]) {
                  return [x + offsetX, y + offsetY];
                });
              }),
            ];
          })
        )];
      }
     )
    );
    return Object.assign({}, HEXAGON_MAP_DATA_ED, { idx, idx2 });
  }

  static getPDMapData() {
    return HEXAGON_MAP_DATA_PD;
  }

  static getPostalPDMapData() {
    return HexagonMapData.offsetData(HEXAGON_MAP_DATA_ED, "P", [9, -0.5]);
  }

  static getEDMapData() {
    return HexagonMapData.offsetData(HEXAGON_MAP_DATA_ED, "", [-3, 4]);
  }

  static getProvinceMapData() {
    return HexagonMapData.offsetData(HEXAGON_MAP_DATA_PROVINCE, "", [-3, 16]);
  }
  static getMapDataList() {
    return [
      // HexagonMapData.getPostalPDMapData(),
      HexagonMapData.getPDMapData(),
      // HexagonMapData.getEDMapData(),
      // HexagonMapData.getProvinceMapData(),
    ];
  }
}
