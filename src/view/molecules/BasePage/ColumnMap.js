import HexMapView from "../../../view/molecules/HexMapView/HexMapView";

import CustomStack from "./CustomStack";
import { MapTitle } from "../../atoms";


export default function ColumnMap() {
  return (
    <CustomStack>
      <MapTitle />
      <HexMapView />
    </CustomStack>
  );
}
