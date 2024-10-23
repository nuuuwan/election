import React from 'react';
import { THEME_DATA } from '../../_constants/THEME';
import SVGHexMap from '../HexMapView/SVGHexMap';
import HexMapData from '../HexMapView/HexMapData/HexMapData';
import HEXMAP_DATA_ED from '../HexMapView/HexMapData/HEXMAP_DATA_ED_UNITS';

import { Seats } from '../../../nonview';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';

import SVGSeatCircles from './SVGSeatCircles';
import SVGNationalListLabel from './SVGNationalListLabel';

function getCustomOverlayRenderer(seats) {
  const CustomOverlayRenderer = function ({ x, y, entID }) {
    const partyToSeats = seats.getPartyToSeats(entID);
    return <SVGSeatCircles x={x} y={y} partyToSeats={partyToSeats} />;
  };
  return CustomOverlayRenderer;
}

export default function SeatsHexMap() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const { electionProjectedWithError, edIdx } = data;
  if (!electionProjectedWithError) {
    return null;
  }

  const mapData = HexMapData.offsetData(HEXMAP_DATA_ED, '', [2, 0]);
  const seats = Seats.fromElection(electionProjectedWithError);
  const customOverlayRenderer = getCustomOverlayRenderer(seats, edIdx);

  return (
    <svg
      viewBox={'-1.5 -0.75 9.5 8.5'}
      fontFamily={THEME_DATA.typography.fontFamily}
    >
      <SVGHexMap
        mapData={mapData}
        customOverlayRenderer={customOverlayRenderer}
      />
      <SVGSeatCircles x={5} y={0} partyToSeats={seats.getLKPartyToSeats()} />
      <SVGNationalListLabel />
    </svg>
  );
}
