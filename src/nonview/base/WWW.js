import Cache from "./Cache.js";

const JSON_HEADERS = {
  headers: {
    Accept: "application/json",
  },
};

const TSV_HEADERS = {
  headers: {
    Accept: "text/csv",
  },
};

export default class WWW {
  static getTimeStampedURL(url, timeStamp) {
    const prefix = url.includes("?") ? "&" : "?";
    return url + prefix + "t=" + timeStamp;
  }

  static pathJoin(pathFragmentList) {
    return pathFragmentList.join("/");
  }

  static async jsonNonCache(url) {
    const response = await fetch(url, JSON_HEADERS);
    const dataJson = await response.json();
    return dataJson;
  }

  static async json(url, timeStamp) {
    const fetchURL = WWW.getTimeStampedURL(url, timeStamp);
    return Cache.get(fetchURL, async function () {
      return WWW.jsonNonCache(fetchURL);
    });
  }

  static async tsvNonCache(url) {
    const response = await fetch(url, TSV_HEADERS);
    const content = await response.text();
    const lines = content.split("\n");
    const keys = lines[0].split("\t").map((key) => key.replace("\r", ""));
    const dataList = lines
      .slice(1)
      .map(function (line, i_line) {
        const values = line.split("\t");
        if (values.length !== keys.length) {
          return null;
        }

        return keys.reduce(function (data, key, i) {
          data[key] = values[i].replace("\r", "");
          return data;
        }, {});
      })
      .filter((data) => data);
    return dataList;
  }

  static async tsv(url, timeStamp) {
    const fetchURL = WWW.getTimeStampedURL(url, timeStamp);
    return Cache.get(fetchURL, async function () {
      return WWW.tsvNonCache(fetchURL, timeStamp);
    });
  }
}
