import EntType from './EntType.js';
import WWW from './WWW.js';
// eslint-disable-next-line no-undef
const URL_BASE = window.location.origin + process.env.PUBLIC_URL + '/data/ents';
const ID_KEY = 'id';

export default class Ent {
  constructor(d) {
    this.name = d.name.replace('Postal Votes ', 'Postal ');
    this.id = d.id;
    this.centroid = d.centroid;
    this.d = d;
  }

  get hashtag() {
    return '#' + this.name.replaceAll(' ', '');
  }

  get hashtagWithType() {
    return '#' + this.name.replaceAll(' ', '') + ' ' + this.entType.shortName;
  }

  get entType() {
    if (this.id === 'NationalList') {
      return EntType.COUNTRY;
    }
    return EntType.fromID(this.id);
  }

  static async listFromType(entType) {
    const url = `${URL_BASE}/${entType.nameForData}.tsv`;
    const timeStamp = 'any';
    return (await WWW.tsv(url, timeStamp)).map(function (d) {
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
    if (entID === 'LK') {
      return Ent.LK;
    }

    const entType = EntType.fromID(entID);

    const entIndex = await Ent.idxFromType(entType);
    const ent = entIndex[entID];
    if (!ent) {
      return undefined;
    }

    if (ent.centroid) {
      ent.centroid = JSON.parse(ent.centroid);
    }
    return ent;
  }

  static LK = new Ent({ id: 'LK', name: 'Sri Lanka' });
}
