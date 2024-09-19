import { WWW, EntType } from "../../base";
import Result from "../Result.js";

import OngoingElection from "../OngoingElection.js";
import ElectionStaticLoaderMixin from "./ElectionStaticLoaderMixin.js";
const ElectionLoaderMixin = {
  async __loadData() {
    if (this.isFuture) {
      await OngoingElection.loadData(this);
    } else {
      this.resultList = await this.getResultList();
      this.resultIdx = ElectionStaticLoaderMixin.buildResultIdx(
        this.resultList
      );
      this.isLoaded = true;
    }
  },

  async getRawDataList() {
    const timeStamp = "any";
    return await WWW.tsv(this.urlData, timeStamp);
  },

  async getResultList() {
    const rawData = await this.getRawDataList();

    const filteredRawData = rawData.filter(function (d) {
      return EntType.fromID(d['entity_id']) === EntType.PD;
    });

    const pdResultList = filteredRawData.map(function (d) {
      return Result.fromDict(d);
    });

    const expandedResultList = ElectionStaticLoaderMixin.expand(pdResultList);

    const sortedResultList = expandedResultList.sort(function (a, b) {
      const diff1 = (b.resultTime || "").localeCompare(a.resultTime || "");
      if (diff1 !== 0) {
        return diff1;
      }

      return a.summary.valid - b.summary.valid;
    });

    return sortedResultList;
  },
};

export default ElectionLoaderMixin;
