import { Format, Party } from "../../nonview";

import SVGMultiBarChart  from "../base/SVGMultiBarChart"

export default function ResultBarChart({ resultsElection, entID }) {
  const partyToPVotes = resultsElection.getResult(entID).partyToVotes.partyToPVotesSortedOthered;

  return <SVGMultiBarChart dataList={[partyToPVotes]} getValues={function(partyToPVotes) {
    return Object.values(partyToPVotes);
  }} getColor={
    function(partyToPVotes, i, pVotes, j) {
      const partyID = Object.keys(partyToPVotes)[j];
      return Party.fromID(partyID).color;
    }
  } 
  formatValue={function(partyToPVotes, i, pVotes, j) {
    return Format.percent(pVotes);
  }}
  
  />;
}
