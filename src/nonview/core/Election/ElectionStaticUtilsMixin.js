import { ArrayX } from "../../base";

const ElectionStaticUtilsMixin = {
  getProvinceID(edID) {
    return {
      "EC-01": "LK-1",
      "EC-02": "LK-1",
      "EC-03": "LK-1",
      "EC-04": "LK-2",
      "EC-05": "LK-2",
      "EC-06": "LK-2",
      "EC-07": "LK-3",
      "EC-08": "LK-3",
      "EC-09": "LK-3",
      "EC-10": "LK-4",
      "EC-11": "LK-4",
      "EC-12": "LK-5",
      "EC-13": "LK-5",
      "EC-14": "LK-5",
      "EC-15": "LK-6",
      "EC-16": "LK-6",
      "EC-17": "LK-7",
      "EC-18": "LK-7",
      "EC-19": "LK-8",
      "EC-20": "LK-8",
      "EC-21": "LK-9",
      "EC-22": "LK-9",
    }[edID];
  },

  getPreviousElections(elections, currentElection) {
    return elections.filter(function (election) {
      return election.date.localeCompare(currentElection.date) < 0;
    });
  },

  getPreviousElectionsOfSameType(elections, currentElection) {
    return ElectionStaticUtilsMixin.getPreviousElections(
      elections,
      currentElection
    ).filter(function (election) {
      return election.electionType === currentElection.electionType;
    });
  },

  getPenultimateElection(elections, currentElection) {
    const previousElections = ElectionStaticUtilsMixin.getPreviousElections(
      elections,
      currentElection
    );
    return ArrayX.last(previousElections);
  },

  getPenultimateElectionOfSameType(elections, currentElection) {
    const previousElections =
      ElectionStaticUtilsMixin.getPreviousElectionsOfSameType(
        elections,
        currentElection
      );
    return ArrayX.last(previousElections);
  },
};

export default ElectionStaticUtilsMixin;
