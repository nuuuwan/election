import EntType from "./EntType.js";
import WWW from "./WWW.js";
const URL_BASE = "https://raw.githubusercontent.com/nuuuwan/gig2/data";
const ID_KEY = "id";

export default class Ent {
  constructor(d) {
    this.name = d["name"].replace("Postal Votes ", "Postal ");
    this.id = d["id"];
    this.centroid = d["centroid"];
    this.d = d;
  }

  get entType() {
    if (this.id === "NationalList") {
      return EntType.COUNTRY;
    }
    return EntType.fromID(this.id);
  }

  static async listFromType(entType) {
    const url = `${URL_BASE}/${entType.name}.latest.basic.tsv`;
    return (await WWW.tsv(url)).map(function (d) {
      return new Ent(d);
    });
  }

  static async idxFromType(entType) {
    const ents = await Ent.listFromType(entType);
    return ents.reduce(function (entIndex, ent) {
      entIndex[ent[ID_KEY]] = ent;
      return entIndex;
    }, {});
  }

  static async fromID(entID) {
    if (entID === "LK") {
      return Ent.LK;
    }

    
    const entType = EntType.fromID(entID);

    
    const entIndex = await Ent.idxFromType(entType);
    let ent = entIndex[entID];
    if (!ent) {
      return undefined;
    }

    if (ent["centroid"]) {
      ent["centroid"] = JSON.parse(ent["centroid"]);
    }
    return ent;
  }

  static LK = new Ent({ id: "LK", name: "Sri Lanka" });
}
