import FeatureVector from "./FeatureVector";

export default class FeatureMatrix {
    constructor(floatListList) {
        this.floatListList = floatListList;
    }

    get length() {
        return this.floatListList.length;
    }

    get shape() {
        return [this.floatListList.length, this.floatListList[0].length];
    }

    get vectorList() {
        return this.floatListList.map(function (floatList) {
            return new FeatureVector(floatList);
        });
    }

    map(callback) {
        return this.vectorList.map((vector, i) =>
            callback(vector, i, this.vectorList)
        );
    }

    reduce(callback, initialValue) {
        return this.vectorList.reduce(
            (accumulator, vector, i) =>
                callback(accumulator, vector, i, this.vectorList),
            initialValue
        );
    }

    get(i, j = undefined) {
        if (j === undefined) {
            return new FeatureVector(this.floatListList[i]);
        }
        return this.floatListList[i][j];
    }

    slice(start, end) {
        return new FeatureMatrix(this.floatListList.slice(start, end));
    }

    static buildFromElection(modelElection, baseEntIDList) {
        return new FeatureMatrix(
            modelElection.getPartyIDList().map(function (partyID) {
                return FeatureVector.buildFromElectionAndParty(
                    modelElection,
                    partyID,
                    baseEntIDList
                ).floatList;
            })
        );
    }

    static concat(featureMatrixList) {
        return new FeatureMatrix(
            featureMatrixList.reduce(function (matrix, featureMatrix) {
                return matrix.concat(featureMatrix.floatListList);
            }, [])
        );
    }

    static buildFromElectionHistory(electionHistory, baseEntIDList) {
        return FeatureMatrix.concat(
            electionHistory.elections.map(function (election) {
                return FeatureMatrix.buildFromElection(election, baseEntIDList);
            })
        );
    }
}
