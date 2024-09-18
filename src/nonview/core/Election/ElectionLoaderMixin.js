import { WWW } from "../../base/index.js";

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
    console.debug('Loaded Election ' + this.year);
    
  },

  async getRawDataList() {
    const timeStamp = "any";
    return await WWW.tsv(this.urlData, timeStamp);
  },

  async getResultList() {
    const rawData = await this.getRawDataList();

    const filteredRawData = rawData.filter(function (d) {
      return d.entity_id.startsWith("EC-") && d.entity_id.length >= 6;
    });

    const resultList = filteredRawData.map(function (d) {
      return Result.fromDict(d);
    });

    const expandedResultList = ElectionStaticLoaderMixin.expand(resultList);

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
