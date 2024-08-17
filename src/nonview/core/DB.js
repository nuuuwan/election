import { Ent, EntType } from "../../nonview/base";
import Election from "./Election";

export default class DB {
  constructor(pdIdx, edIdx, elections) {
    this.pdIdx = pdIdx;
    this.edIdx = edIdx;
    this.elections = elections;
  }

  static async load() {
    const pdIdx = await Ent.idxFromType(EntType.PD);
    const edIdx = await Ent.idxFromType(EntType.ED);
    const elections = await Election.listAll();

    return new DB(pdIdx, edIdx, elections);
  }
}
