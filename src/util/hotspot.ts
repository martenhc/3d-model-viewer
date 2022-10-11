import {ModelHotspot} from '@data/type/hotspot';
import {Vector3} from 'three';

export const getModelViewerHotspotInformation: (
  domHotspots: NodeListOf<HTMLDivElement>,
  positions: Array<[number, number, number]>
) => Array<ModelHotspot> = (domHotspots, positions) =>
  Array.from(domHotspots).map((element, index) => ({
    position: new Vector3(
      positions[index][0],
      positions[index][1],
      positions[index][2]
    ),
    element,
  }));
