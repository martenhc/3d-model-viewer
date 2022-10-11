import {Vector3} from 'three';

export type Hotspot = {
  position: [number, number, number];
  text: string;
};

export type ModelHotspot = {
  position: Vector3;
  element: HTMLDivElement;
};
