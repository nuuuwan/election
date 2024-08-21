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
  },

  async getRawDataList() {
    return await WWW.tsv(this.urlData);
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
      return a.summary.valid - b.summary.valid;
    });

    return sortedResultList;
  },
};

export default ElectionLoaderMixin;
