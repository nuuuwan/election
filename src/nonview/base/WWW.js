import Cache from "./Cache.js";
import Time from "./Time.js";

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

  static getTimeStampedURL(url) {
    const prefix = url.includes("?") ? "&" : "?";
    return url + prefix + "t=" + Time.now().dateID;
  }

  static pathJoin(pathFragmentList) {
    return pathFragmentList.join("/");
  }

  static async jsonNonCache(url) {
    const fetchURL = WWW.getTimeStampedURL(url);
    console.debug("❄️-WWW.jsonNonCache", fetchURL);
    const response = await fetch(fetchURL, JSON_HEADERS);
    const dataJson = await response.json();
    return dataJson;
  }

  static async json(url) {
    return Cache.get(url, async function () {
      return WWW.jsonNonCache(url);
    });
  }

  static async tsvNonCache(url) {
    const fetchURL = WWW.getTimeStampedURL(url);
    console.debug("❄️-WWW.tsvNonCache", fetchURL);
    
    const response = await fetch(fetchURL, TSV_HEADERS);
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

  static async tsv(url) {
    return Cache.get(url, async function () {
      return WWW.tsvNonCache(url);
    });
  }
}
