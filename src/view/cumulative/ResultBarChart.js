import { Format, Party } from "../../nonview";



import SVGBarChart from "../base/SVGBarChart";


export default function ResultBarChart({ resultsElection, entID }) {
  const result = resultsElection.resultIdx[entID];
  const partyToVotes = result.partyToVotes;
  const totalVotes = partyToVotes.totalVotes;

  const entries = Object.entries(partyToVotes.partyToVotesSortedOthered);

  const dataList = entries.map(function ([partyID, votes]) {
    const party = Party.fromID(partyID);
    const pVotes = (votes - 0.000001) / totalVotes; // HACK!

    return {
      value: pVotes,
      label: partyID,
      color: party.color,
    };
  });

  const formatValue = (value) => Format.percent(value);

  return (
   
      <SVGBarChart dataList={dataList} formatValue={formatValue} />
  
  );
}
