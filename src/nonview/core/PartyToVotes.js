import Summary from "./Summary.js";
import { MathX } from "../base";
import Party from "./Party.js";

export default class PartyToVotes {
  static NON_PARTY_KEYS = [...Summary.KEYS, "entity_id"];

  static MIN_N_DISPLAY = 3;
  static MIN_P_VOTES = 0.1;

  constructor(partyToVotes) {
    this.partyToVotes = partyToVotes;
  }

  static fromDict(d) {
    const partyToVotes = {};
    for (const key in d) {
      if (PartyToVotes.NON_PARTY_KEYS.includes(key)) {
        continue;
      }
      partyToVotes[key] = parseInt(d[key]);
    }
    return new PartyToVotes(partyToVotes);
  }

  static fromList(resultList) {
    const partyToVotes = {};
    for (const result of resultList) {
      if (!result) {
        continue;
      }
      for (const party in result.partyToVotes.partyToVotes) {
        if (partyToVotes[party] === undefined) {
          partyToVotes[party] = 0;
        }
        partyToVotes[party] += result.partyToVotes.partyToVotes[party];
      }
    }
    return new PartyToVotes(partyToVotes);
  }

  get totalVotes() {
    return MathX.sum(Object.values(this.partyToVotes));
  }

  get partyToVotesSorted() {
    return Object.fromEntries(
      Object.entries(this.partyToVotes).sort(function (a, b) {
        return b[1] - a[1];
      })
    );
  }

  get winningPartyID() {
    return Object.keys(this.partyToVotesSorted)[0];
  }

  get color() {
    return Party.fromID(this.winningPartyID).color;
  }

  get pWinner() {
    const pVotes = Object.values(this.partyToPVotesSorted);
    return pVotes[0];
  }

  get partyToPVotesSorted() {
    const totalVotes = this.totalVotes;
    return Object.fromEntries(
      Object.entries(this.partyToVotesSorted)
        .map(([party, votes]) => [party, votes / totalVotes])
        .sort(function (a, b) {
          return b[1] - a[1];
        })
    );
  }

  get partyToVotesSortedOthered() {

    const totalVotes = this.totalVotes;
    const minVotes = PartyToVotes.MIN_P_VOTES * totalVotes;

    let nonOther = Object.fromEntries(
      Object.entries(this.partyToVotes)
        .sort(function (a, b) {
          return b[1] - a[1];
        })
        .filter(function (a, i) {
          return a[1] >= minVotes && i < PartyToVotes.MIN_N_DISPLAY;
        })
    );
    const nonOtherVotes = MathX.sum(Object.values(nonOther));
    return { ...nonOther, Other: this.totalVotes - nonOtherVotes };
  }
}
