import {ModelHotspot} from '@data/type/hotspot';
import {Vector3} from 'three';

export const getModelViewerHotspotInformation: (
  domHotspots: NodeListOf<HTMLDivElement>,
  positions: Array<[number, number, number]>
) => Array<ModelHotspot> = (domHotspots, positions) =>
  Array.from(domHotspots).map((element, index) => ({
    position: coordinatesArrayToVector3(positions[index]),
    element,
  }));

export const coordinatesArrayToVector3 = (
  coordinatesArray: [number, number, number]
) => new Vector3(coordinatesArray[0], coordinatesArray[1], coordinatesArray[2]);
