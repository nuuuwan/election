import Summary from "./Summary.js";
import { MathX } from "../base";
import Party from "./Party.js";

export default class PartyToVotes {
  static NON_PARTY_KEYS = [...Summary.KEYS, "entity_id"];
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

  getSortedMajor(pPartyLimit) {
    const sortedEntries = Object.entries(this.partyToVotes).sort(
      (a, b) => b[1] - a[1]
    );
    const totalVotes = this.totalVotes;
    let sortedMajorEntries = sortedEntries.filter(
      (entry) => entry[1] > pPartyLimit * totalVotes
    );

    const totalMajorVotes = MathX.sum(
      sortedMajorEntries.map((entry) => entry[1])
    );

    const otherVotes = totalVotes - totalMajorVotes;

    sortedMajorEntries.push(["Other", otherVotes]);

    return Object.fromEntries(sortedMajorEntries);
  }

  get winningPartyID() {
    return Object.keys(this.getSortedMajor(0.001))[0];
  }

  get partyToVotesSorted() {
    return Object.fromEntries(
      Object.entries(this.partyToVotes).sort(function (a, b) {
        return b[1] - a[1];
      })
    );
  }

  get partyToVotesSortedOthered() {
    const N_DISPLAY = 3;

    let nonOther = Object.fromEntries(
      Object.entries(this.partyToVotes)
        .sort(function (a, b) {
          if (a[0] === Party.UNCERTAIN.id) {
            return -1;
          }
          if (b[0] === Party.UNCERTAIN.id) {
            return 1;
          }

          return b[1] - a[1];
        })
        .filter(function (a, i) {
          if (a[0] === Party.UNCERTAIN.id) {
            return true;
          }
          return i < N_DISPLAY;
        })
    );
    const nonOtherVotes = MathX.sum(Object.values(nonOther));
    const otherVotes = this.totalVotes - nonOtherVotes;
    return { ...nonOther, Other: otherVotes };
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

  getL1Error(otherPartyToVotes) {
    const partyToPVotesThis = this.partyToPVotes;
    const partyToPVotesOther = otherPartyToVotes.partyToPVotes;
    return Object.entries(partyToPVotesThis).reduce(function (
      error,
      [party, pVote]
    ) {
      const pVoteOther = partyToPVotesOther[party] || 0;
      return error + Math.abs(pVote - pVoteOther) * pVote;
    },
    0);
  }

  get pMajority() {
    const pVotes = Object.values(this.partyToPVotesSorted);
    return pVotes[0] - pVotes[1];
  }

  get pWinner() {
    const pVotes = Object.values(this.partyToPVotesSorted);
    return pVotes[0];
  }

  get votesInMajority() {
    const votes = Object.values(this.partyToVotesSorted);
    return votes[0] - Math.ceil(this.totalVotes / 2);
  }
}
