import { useDataContext } from "../../nonview/core/DataProvider";
import { EntType, Format } from "../../nonview/base";
import { Party } from "../../nonview/core";

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
    function ([partyID, votes], i) {
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
      ["", cleanedURL, electionDisplay.hashTag + " #SriLanka #lka"]
    )
    .join("\n");
  return { activeEntID, tweet };
}

export default function HiddenDataView() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  if (!data.electionDisplay.nResultsDisplay) {
    return null;
  }
  const hiddenData = getHiddenData(data);
  const hiddenDataJSON = JSON.stringify(hiddenData);
  return (
    <div
      id="prespoll_hidden_data"
      datajson={hiddenDataJSON}
      style={{ display: "none" }}
    >
      {hiddenDataJSON}
    </div>
  );
}
