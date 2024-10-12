import { WWW, EntType } from "../..";
import Result from "../Result.js";

import OngoingElection from "../OngoingElection.js";
import ElectionStaticLoaderMixin from "./ElectionStaticLoaderMixin.js";
const ElectionLoaderMixin = {
  async __loadData() {
    if (this.isFuture) {
      await OngoingElection.loadData(this);
    } else {
      const pdResultList = await this.getPDResultList();
      this.build(pdResultList);
    }
  },

  async getRawDataList() {
    const timeStamp = "any";
    return await WWW.tsv(this.urlData, timeStamp);
  },

  async getPDResultList() {
    const rawData = await this.getRawDataList();

    const filteredRawData = rawData.filter(function (d) {
      return (
        EntType.fromID(d["entity_id"]) === EntType.PD &&
        !["EC-10-", "EC-11D", "EC-11-", "EC-12D", "EC-12-", "EC-13-", "EC-14D", "EC-14-"].includes(d["entity_id"])
      );
    });

    const pdResultList = filteredRawData.map(function (d) {
      return Result.fromDict(d);
    });

    const sortedPDResultList = pdResultList.sort(function (a, b) {
      return (
        (a.resultTime || "").localeCompare(b.resultTime || "") ||
        a.summary.polled - b.summary.polled
      );
    });

    return sortedPDResultList;
  },

  build(baseResultList) {
    this.baseResultList = baseResultList;

    if (this.baseEntType === EntType.PD) {
      this.pdResultList = baseResultList;
    } else if (this.baseEntType === EntType.ED) {
      this.pdResultList = [];
      this.edResultList = baseResultList;
    } else {
      throw new Error("Invalid baseEntType: " + this.baseEntType);
    }

    this.edResultList =
      this.edResultList ||
      ElectionStaticLoaderMixin.buildEDResultList(this.pdResultList);
    this.provinceResultList = ElectionStaticLoaderMixin.buildProvinceResultList(
      this.edResultList
    );

    this.resultLK = ElectionStaticLoaderMixin.buildResultLK(
      this.provinceResultList
    );

    this.ezResultList = ElectionStaticLoaderMixin.buildEZResultList(
      this.baseResultList
    );

    this.resultList = [
      this.resultLK,
      ...this.ezResultList,
      ...this.provinceResultList,
      ...this.edResultList,
      ...this.pdResultList,
    ];

    this.resultIdx = ElectionStaticLoaderMixin.buildResultIdx(this.resultList);
    this.isLoaded = true;
  },
};

export default ElectionLoaderMixin;
