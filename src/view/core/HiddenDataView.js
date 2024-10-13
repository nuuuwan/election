import { useDataContext } from "../../nonview/core/DataProvider";
import { EntType, Format, Party } from "../../nonview";

// #Rambukkana (#Kegalle)

// 69% @PodujanaParty

// 22% @sjbsrilanka

// #LKAElections2020 #GenElecSL2020 #SriLanka #lka

function getHiddenData(data) {
  const { activeEntID, entIdx, electionDisplay, edIdx, nResultsDisplay } = data;

  const activeEnt = entIdx[activeEntID];
  const activeEntHashtag = activeEnt.hashtag;

  let subtitleText = "";
  if (electionDisplay.baseEntType === EntType.PD) {
    const edID = activeEntID.substring(0, 5);
    const edEnt = edIdx[edID];
    subtitleText = ` (${edEnt.hashtag})`;
  }

  const result = electionDisplay.getResult(activeEntID);

  const partyToVotes = result.partyToVotes;
  const totalVotes = partyToVotes.totalVotes;
  const partyLines = Object.entries(partyToVotes.partyToVotesSortedOthered).map(
    function ([partyID, votes]) {
      const pVotes = votes / totalVotes;
      const party = Party.fromID(partyID);
      return `${party.emoji} ${Format.percentVotes(pVotes)} ${party.xTag}`;
    }
  );

  const url = window.location.href;
  const cleanedURL = url.replace(
    "http://localhost:3000/",
    "https://nuuuwan.github.io/"
  );
  const tweet = []
    .concat(
      [`${nResultsDisplay}. ${activeEntHashtag}` + subtitleText, ""],
      partyLines,
      ["", cleanedURL, "", electionDisplay.hashTagList.join(" ")]
    )
    .join("\n");
  return { activeEntID, tweet };
}

export default function HiddenDataView() {
  const data = useDataContext();

  if (!data.electionDisplay.nResults) {
    return null;
  }
  const hiddenData = getHiddenData(data);
  const hiddenDataJSON = JSON.stringify(hiddenData);
  return (
    <div id="election_hidden_data" style={{ display: "none" }}>
      {hiddenDataJSON}
    </div>
  );
}
