import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import { Party, Seats } from "../../nonview";

function SVGPartyToSeatsSemiCircle() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }

  const { electionProjected } = data;
  const seats = Seats.fromElection(electionProjected);
  const partyToSeats = seats.partyToSeats;

  const colorList = Object.entries(partyToSeats).reduce(function (
    colorList,
    [partyID, seats]
  ) {
    if (partyID === Party.ERROR.id) {
      colorList.push(null);
      return colorList;
    }

    const party = Party.fromID(partyID);
    const color = party.color;

    for (let i = 0; i < seats; i++) {
      colorList.push(color);
    }

    return colorList;
  },
  []);

  const R_CIRCLE = 0.025;
  const K_INCR = 4.9;
  const R_INCR = 0.0667;
  const OFFSET_HACK = 0.1;
  const PADDING = 0.2;
  let coordList = [];

  for (let r = 0.4; r <= 1; r += R_INCR) {
    const incrBase = K_INCR / r;
    const incr = 180 / Math.floor(180 / incrBase);
    for (let alpha = -90; alpha <= 90 + OFFSET_HACK; alpha += incr) {
      const alphaRad = (alpha * Math.PI) / 180;
      const x = r * Math.sin(alphaRad) + 1;
      const y = r * Math.cos(alphaRad);
      const cx = x * (1 - PADDING) + PADDING;
      const cy = 1- y * (1 - PADDING ) - PADDING /2;
      coordList.push({ cx, cy });
    }
  }


  coordList = coordList.sort(function ({cx: cx1, cy: cy1}, {cx: cx2, cy: cy2}) {
    const dx = cx1 - cx2;
    if (dx !== 0) {
      return dx;
    }
    return cy1 - cy2;

  });

  let renderedCircles = [];
  let i = 0;

  const STROKE_WIDTH = 0.005;

  for (let { cx, cy } of coordList) {
    let fill = colorList[i];
    let stroke = null;
    if (!fill) {
      fill = "#fff";
      stroke = "#ccc";
    }
    renderedCircles.push(
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={R_CIRCLE}
        fill={fill}
        stroke={stroke}
        strokeWidth={STROKE_WIDTH}
      />
    );
    i++;
  }

  return <svg viewBox="0 0 2 1">{renderedCircles}</svg>;
}

export default function ParliamentView() {
  return <SVGPartyToSeatsSemiCircle />;
}
