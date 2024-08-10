import Result from "../Result";

const ElectionExpand = {
  expand: function (pdResultsList) {
    // EDs
    const edToResultsList = pdResultsList.reduce(function (
      edToResultsList,
      result
    ) {
      const pdID = result.entityID;
      const edID = pdID.slice(0, 5);
      if (!(edID in edToResultsList)) {
        edToResultsList[edID] = [];
      }
      edToResultsList[edID].push(result);
      return edToResultsList;
    },
    {});

    const edResultsList = Object.entries(edToResultsList).map(function ([
      edID,
      resultsList,
    ]) {
      return Result.fromList(edID, resultsList);
    });

    // LK
    const lkResults = Result.fromList("LK", edResultsList);

    return [...pdResultsList, ...edResultsList, lkResults];
  },
};

export default ElectionExpand;
