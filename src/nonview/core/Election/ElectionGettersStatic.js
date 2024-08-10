import Summary from "../Summary";

const ElectionStats = {
  getNextAndPrevious(elections, election) {
    const sortedElections = elections.sort().reverse();
    const i = sortedElections.map((e) => e.date).indexOf(election.date);
    let prevElection, nextElection;
    if (i < sortedElections.length - 1) {
      prevElection = sortedElections[i + 1];
    }
    if (i > 0) {
      nextElection = sortedElections[i - 1];
    }
    return { prevElection, nextElection };
  },

  getElectionsOfType(elections, electionType) {
    return elections.filter((e) => e.electionType === electionType);
  },

  getNextAndPreviousOfType(elections, election) {
    const electionsOfType = ElectionStats.getElectionsOfType(
      elections,
      election.electionType
    );
    return ElectionStats.getNextAndPrevious(electionsOfType, election);
  },

  getPreviousOfType(elections, election) {
    const { prevElection } = ElectionStats.getNextAndPreviousOfType(
      elections,
      election
    );
    return prevElection;
  },

  aggregateSummaryForEnt(elections, ent) {
    const summaryList = elections
      .map((e) => e.getResults(ent.id))
      .filter((r) => r !== null)
      .map((r) => r.summary);
    return Summary.aggregate(summaryList);
  },
};

export default ElectionStats;
