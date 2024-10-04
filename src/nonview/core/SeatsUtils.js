import MathX from "../base/MathX";
import Party from "./Party";

export default class SeatsUtils {
  static getGenericPartyToSeats(result, nSeatsAll, nSeatsBonus, pLimit) {
    const partyToVotes = result.partyToVotes.partyToVotes;
    const totalVotes = result.partyToVotes.totalVotes;
    const voteLimit = totalVotes * pLimit;
    const filteredPartyToVotes = Object.fromEntries(
      Object.entries(partyToVotes).filter(
        ([partyID, votes]) => votes >= voteLimit
      )
    );
    const filteredTotalVotes = MathX.sum(Object.values(filteredPartyToVotes));

    const nSeatsNonBonus = nSeatsAll - nSeatsBonus;
    const partyToSeatsF = Object.fromEntries(
      Object.entries(filteredPartyToVotes).map(([partyID, votes]) => [
        partyID,
        (nSeatsNonBonus * votes) / filteredTotalVotes,
      ])
    );

    let partyToSeats = Object.fromEntries(
      Object.entries(partyToSeatsF).map(([partyID, seatsF]) => [
        partyID,
        parseInt(seatsF),
      ])
    );
    const partyToSeatsR = Object.fromEntries(
      Object.entries(partyToSeatsF).map(([partyID, seatsF]) => [
        partyID,
        seatsF - partyToSeats[partyID],
      ])
    );

    const nSeatsI = MathX.sum(Object.values(partyToSeats));
    const nSeatsR = nSeatsNonBonus - nSeatsI;

    partyToSeats = Object.entries(partyToSeatsR)
      .sort(([partyID1, seatsR1], [partyID2, seatsR2]) => seatsR2 - seatsR1)
      .slice(0, nSeatsR)
      .reduce((acc, [partyID, seatsR]) => {
        acc[partyID] = acc[partyID] + 1;
        return acc;
      }, partyToSeats);

    const winningPartyID = result.partyToVotes.winningPartyID;
    partyToSeats[winningPartyID] += nSeatsBonus;

    const unsorted = Object.fromEntries(
      Object.entries(partyToSeats)
        .filter(([partyID, seats]) => seats > 0)
        .sort(([partyID1, seats1], [partyID2, seats2]) => seats2 - seats1)
    );

    return SeatsUtils.sortPartyToSeats(unsorted, partyToVotes);
  }

  static sortPartyToSeats(unsorted, partyToVotes) {
    return Object.fromEntries(
      Object.entries(unsorted).sort(function (
        [partyID1, seats1],
        [partyID2, seats2]
      ) {
        if (partyID1 === Party.ERROR.id) {
          return 1;
        }
        if (partyID2 === Party.ERROR.id) {
          return -1;
        }
        const diffSeats = seats2 - seats1;
        if (diffSeats !== 0) {
          return diffSeats;
        }
        if (!partyToVotes) {
          return 0;
        }
        return partyToVotes[partyID2] - partyToVotes[partyID1];
      })
    );
  }
}
