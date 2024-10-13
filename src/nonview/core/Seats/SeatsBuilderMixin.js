import Party from "../Party.js";
import SeatsUtils from "./SeatsUtils.js";

const SeatsBuilderMixin = {
    getEDToPartyToSeats() {
        return this.election.edResultList
            .sort(function (result1, result2) {
                return result1.entID.localeCompare(result2.entID);
            })
            .reduce(
                function (idx, result) {
                    const entID = result.entID;
                    const nSeatsAll = this.regionToSeats[entID];
                    const partyToSeats = SeatsUtils.getGenericPartyToSeats(
                        result,
                        nSeatsAll,
                        1,
                        0.05
                    );
                    idx[entID] = partyToSeats;
                    return idx;
                }.bind(this),
                {}
            );
    },

    getLKPartyToSeats() {
        return SeatsUtils.getGenericPartyToSeats(
            this.election.resultLK,
            this.regionToSeats.LK,
            0,
            0
        );
    },

    getRegionToPartyToSeats() {
        return Object.assign({}, this.getEDToPartyToSeats(), {
            LK: this.getLKPartyToSeats(),
        });
    },

    getTotalPartyToSeats() {
        return SeatsUtils.aggregatePartyToSeats(
            Object.values(this.getRegionToPartyToSeats())
        );
    },

    getPartyToUFG() {
        return Object.values(this.getRegionToPartyToSeats()).reduce(function (
            idx,
            partyToSeats
        ) {
            const seatsUFG = partyToSeats[Party.ERROR.id] || 0;
            if (seatsUFG === 0) {
                return idx;
            }
            return Object.entries(partyToSeats).reduce(function (
                idx,
                [partyID, seats]
            ) {
                idx[partyID] = (idx[partyID] || 0) + seatsUFG;
                return idx;
            },
            idx);
        },
        {});
    },
};

export default SeatsBuilderMixin;
