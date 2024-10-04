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
  const PADDING = 0.1;

  let coordList = [];

  for (let r = 0.4; r <= 1; r += R_INCR) {
    const incrBase = K_INCR / r;
    const incr = 180 / Math.floor(180 / incrBase);
    for (let alpha = -90; alpha <= 90 + OFFSET_HACK; alpha += incr) {
      const alphaRad = (alpha * Math.PI) / 180;
      const x = r * Math.sin(alphaRad) + 1;
      const y = 1 - r * Math.cos(alphaRad);
      const cx = PADDING + x * (1 - 2 * PADDING);
      const cy = PADDING + y * (1 - 2 * PADDING);
      coordList.push({ cx, cy });
    }
  }

  function convert({ cx, cy }) {
    const x = cx - 1;
    const y = 1 - cy;
    const alpha = Math.atan2(y, x);
    const r = Math.sqrt(x * x + y * y);
    return { r, alpha };
  }

  coordList = coordList.sort(function (a, b) {
    const { r: rA, alpha: alphaA } = convert(a);
    const { r: rB, alpha: alphaB } = convert(b);
    const diffAlpha = alphaB - alphaA;
    if (diffAlpha !== 0) {
      return diffAlpha;
    }
    return rB - rA;
  });

  let renderedCircles = [];
  let i = 0;

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
        strokeWidth={0.001}
      />
    );
    i++;
  }

  return <svg viewBox="0 0 2 1">{renderedCircles}</svg>;
}

export default function ParliamentView() {
  return <SVGPartyToSeatsSemiCircle />;
}
