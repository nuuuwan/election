import Summary from './Summary.js';
import { DictX, MathX } from '..';
import Party from './Party.js';

export default class PartyToVotes {
  static NON_PARTY_KEYS = [...Summary.KEYS, 'entity_id'];

  static MIN_N_DISPLAY = 19;
  static MIN_P_VOTES = 0.05;

  constructor(partyToVotes) {
    this.partyToVotes = partyToVotes;
  }

  static fromDict(d) {
    const partyToVotes = {};
    for (const key in d) {
      if (PartyToVotes.NON_PARTY_KEYS.includes(key)) {
        continue;
      }
      partyToVotes[key] = parseInt(d[key]) || 0;
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
      }),
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

  get partyToPVotes() {
    const totalVotes = this.totalVotes;
    return Object.fromEntries(
      Object.entries(this.partyToVotesSorted)
        .map(([party, votes]) => [party, votes / totalVotes])
        .sort(function (a, b) {
          return b[1] - a[1];
        }),
    );
  }

  get partyToPVotesSorted() {
    return Object.fromEntries(
      Object.entries(this.partyToPVotes).sort(function (a, b) {
        return b[1] - a[1];
      }),
    );
  }

  get partyToVotesSortedOthered() {
    const totalVotes = this.totalVotes;
    const minVotes = PartyToVotes.MIN_P_VOTES * totalVotes;

    const nonOther = Object.fromEntries(
      Object.entries(this.partyToVotes)
        .sort(function (a, b) {
          return b[1] - a[1];
        })
        .filter(function (a, i) {
          return a[1] >= minVotes && i < PartyToVotes.MIN_N_DISPLAY;
        }),
    );
    const nonOtherVotes = MathX.sum(Object.values(nonOther));
    return { ...nonOther, Other: this.totalVotes - nonOtherVotes };
  }

  static round(p) {
    const Q = 10_000;
    return Math.round(p * Q) / Q;
  }

  get partyToPVotesSortedOthered() {
    const totalVotes = this.totalVotes;
    return Object.fromEntries(
      Object.entries(this.partyToVotesSortedOthered).map(([party, votes]) => [
        party,
        PartyToVotes.round(votes / totalVotes),
      ]),
    );
  }

  get lead() {
    const votes = Object.values(this.partyToVotesSorted);
    return votes[0] - votes[1];
  }

  get votesError() {
    return this.partyToVotes[Party.ERROR.id] || 0;
  }

  get partyToVoteErrorInfo() {
    let partyToVoteErrorInfo = {};
    const votesError = this.votesError;

    for (const [partyID, votesMin] of Object.entries(this.partyToVotes)) {
      const votesMax = votesMin + votesError;
      partyToVoteErrorInfo[partyID] = {
        votesMin: votesMin,
        votesMax: votesMax,
      };
    }
    return DictX.sort(partyToVoteErrorInfo, (entry) => -entry[1].votesMin);
  }
}
