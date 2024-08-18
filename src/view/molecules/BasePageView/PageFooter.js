import { PlayerControl } from "../../../view/molecules";

export default function PageFooter({
  electionDisplay,
  election,
  //
  setNResultsDisplay,
}) {
  return (
    <PlayerControl
      key={electionDisplay.nResults}
      electionDisplay={electionDisplay}
      election={election}
       //
      setNResultsDisplay={setNResultsDisplay}
    />
  );
}
