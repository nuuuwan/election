import MathX from "../../base/MathX";
import Party from "../Party";
import SeatsUtilsCompute from "./SeatsUtilsCompute";

export default class SeatsUtils {
    static getGenericPartyToSeats(result, nSeatsAll, nSeatsBonus, pLimit) {
        const partyToVotes = result.partyToVotes;
        const filteredPartyToVotes = SeatsUtilsCompute.getFilteredPartyToVotes(
            partyToVotes,
            pLimit
        );

        const nSeatsNonBonus = nSeatsAll - nSeatsBonus;
        const partyToSeatsFloat = SeatsUtilsCompute.getPartyToSeatsFloat(
            filteredPartyToVotes,
            nSeatsNonBonus
        );
        const partyToSeatsInt =
      SeatsUtilsCompute.getPartyToSeatsInt(partyToSeatsFloat);
        const nSeatsInt = MathX.sum(Object.values(partyToSeatsInt));

        const partyToRemSeatsFloat =
      SeatsUtilsCompute.getPartyToRemSeatsFloat(partyToSeatsFloat);

        const partyToSeatsRem = SeatsUtilsCompute.getPartyToSeatsRem(
            partyToRemSeatsFloat,
            nSeatsNonBonus - nSeatsInt
        );

        const partyToSeatsBonus = SeatsUtilsCompute.getPartyToSeatsBonus(
            partyToVotes,
            nSeatsBonus
        );

        const unsortedPartyToSeats = SeatsUtils.aggregatePartyToSeats([
            partyToSeatsInt,
            partyToSeatsRem,
            partyToSeatsBonus,
        ]);

        return SeatsUtils.sortPartyToSeats(unsortedPartyToSeats, partyToVotes);
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

    static aggregatePartyToSeats(partyToSeatsList) {
        const unsorted = partyToSeatsList.reduce(function (idx, partyToSeats) {
            return Object.entries(partyToSeats).reduce(function (
                idx,
                [partyID, seats]
            ) {
                idx[partyID] = (idx[partyID] || 0) + seats;
                return idx;
            },
            idx);
        }, {});
        return SeatsUtils.sortPartyToSeats(unsorted);
    }
}
