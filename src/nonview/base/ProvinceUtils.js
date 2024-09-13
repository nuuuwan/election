export default class ProvinceUtils {
  static getProvinceIDForEDID(edID) {
    return {
      "EC-01": "LK-1",
      "EC-02": "LK-1",
      "EC-03": "LK-1",
      "EC-04": "LK-2",
      "EC-05": "LK-2",
      "EC-06": "LK-2",
      "EC-07": "LK-3",
      "EC-08": "LK-3",
      "EC-09": "LK-3",
      "EC-10": "LK-4",
      "EC-11": "LK-4",
      "EC-12": "LK-5",
      "EC-13": "LK-5",
      "EC-14": "LK-5",
      "EC-15": "LK-6",
      "EC-16": "LK-6",
      "EC-17": "LK-7",
      "EC-18": "LK-7",
      "EC-19": "LK-8",
      "EC-20": "LK-8",
      "EC-21": "LK-9",
      "EC-22": "LK-9",
    }[edID];
  }

  static getProvinceIDForPDEnt(pdEnt) {
    const provinceID1 = pdEnt.d.province_id;
    if (provinceID1 && provinceID1 !== "None") {
      return provinceID1;
    }
    return ProvinceUtils.getProvinceIDForEDID(pdEnt.d.ed_id);

  }
}
