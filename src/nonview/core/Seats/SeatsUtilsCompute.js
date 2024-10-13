import MathX from "../../base/MathX";

export default class SeatsUtilsCompute {
    static getFilteredPartyToVotes(partyToVotes, pLimit) {
        const totalVotes = partyToVotes.totalVotes;
        const voteLimit = totalVotes * pLimit;
        return Object.fromEntries(
            Object.entries(partyToVotes.partyToVotes).filter(
                ([partyID, votes]) => votes >= voteLimit
            )
        );
    }

    static getPartyToSeatsFloat(partyToVotes, nSeats) {
        const filteredTotalVotes = MathX.sum(Object.values(partyToVotes));

        return Object.fromEntries(
            Object.entries(partyToVotes).map(([partyID, votes]) => [
                partyID,
                (nSeats * votes) / filteredTotalVotes,
            ])
        );
    }

    static getPartyToSeatsInt(partyToSeatsFloat) {
        return Object.fromEntries(
            Object.entries(partyToSeatsFloat)
                .map(([partyID, seatsFloat]) => [partyID, parseInt(seatsFloat)])
                .filter(([partyID, seats]) => seats > 0)
        );
    }

    static getPartyToRemSeatsFloat(partyToSeatsFloat) {
        return Object.fromEntries(
            Object.entries(partyToSeatsFloat).map(([partyID, seatsFloat]) => [
                partyID,
                seatsFloat - parseInt(seatsFloat),
            ])
        );
    }

    static getPartyToSeatsRem(partyToRemSeatsFloat, nSeatsRem) {
        return Object.entries(partyToRemSeatsFloat)
            .sort(([partyID1, seatsR1], [partyID2, seatsR2]) => seatsR2 - seatsR1)
            .slice(0, nSeatsRem)
            .reduce((acc, [partyID, seatsR]) => {
                acc[partyID] = 1;
                return acc;
            }, {});
    }

    static getPartyToSeatsBonus(partyToVotes, nSeatsBonus) {
        const winningPartyID = partyToVotes.winningPartyID;
        return { [winningPartyID]: nSeatsBonus };
    }
}
