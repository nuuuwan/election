import { PlayerControl } from "../../../view/molecules";

export default function PageFooter({
  electionDisplay,
  election,
  isPlaying,
  //
  playAnimation,
  pauseAnimation,
  setNResultsDisplay,
}) {
  return (
    <PlayerControl
      key={electionDisplay.nResults}
      electionDisplay={electionDisplay}
      election={election}
      isPlaying={isPlaying}
      //
      setNResultsDisplay={setNResultsDisplay}
      playAnimation={playAnimation}
      pauseAnimation={pauseAnimation}
    />
  );
}
