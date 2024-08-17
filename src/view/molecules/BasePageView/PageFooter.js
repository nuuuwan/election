import { PlayerControl } from "../../../view/molecules";

export default function PageFooter({
  nResultsDisplay,
  isPlaying,
  playAnimation,
  pauseAnimation,
  nResultsReleased,
  setNResultsDisplay,
}) {
  return (
    <PlayerControl
      key={nResultsDisplay}
      nResultsDisplay={nResultsDisplay}
      nResults={nResultsReleased}
      setNResultsDisplay={setNResultsDisplay}
      isPlaying={isPlaying}
      playAnimation={playAnimation}
      pauseAnimation={pauseAnimation}
    />
  );
}
