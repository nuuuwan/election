import { Ent, EntType } from "../../nonview/base";
import Election from "./Election";

export default class DB {
  constructor(pdIdx, edIdx, provinceIdx, elections) {
    this.pdIdx = pdIdx;
    this.edIdx = edIdx;
    this.provinceIdx = provinceIdx;
    this.elections = elections;
  }

  static async load() {
    const pdIdx = await Ent.idxFromType(EntType.PD);
    const edIdx = await Ent.idxFromType(EntType.ED);
    const provinceIdx = await Ent.idxFromType(EntType.PROVINCE);
    const elections = await Election.listAll();

    return new DB(pdIdx, edIdx, provinceIdx, elections);
  }
}
