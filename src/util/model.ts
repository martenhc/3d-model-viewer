import {Box3, Vector3, Group, PerspectiveCamera} from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js';

export const centerModel = (
  model: Group,
  camera: PerspectiveCamera,
  controls: TrackballControls,
  addXRotation: boolean = false
) => {
  const boundingBox = new Box3().setFromObject(model);
  const center = new Vector3();
  boundingBox.getCenter(center);
  model.position.sub(center);

  const modelDepth = boundingBox.max.z - boundingBox.min.z;

  const maxDimension = Math.max(
    boundingBox.max.x,
    boundingBox.max.y,
    boundingBox.max.z
  );

  // Turn Field of View into radians and calculate distance, adding the highest
  // dimensions of the model, making sure that nothing is out of view.
  const zDistance =
    maxDimension + modelDepth / (2 * Math.tan((camera.fov * Math.PI) / 360));

  // Prevent the camera from going inside the object
  const minumumDistance = zDistance * 1.05;

  camera.position.z = minumumDistance;

  controls.minDistance = minumumDistance;
  controls.maxDistance = minumumDistance * 1.5;

  if (addXRotation) model.rotateX(Math.PI * 0.1);
};
