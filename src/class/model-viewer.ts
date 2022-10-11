import {ModelHotspot} from '@data/type/hotspot';
import {centerModel, debounce} from '@util/index';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  Raycaster,
} from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

export class ModelViewer {
  private _modelUrl: string;
  private _animationFrameId: number;
  private _scene: Scene;
  private _camera: PerspectiveCamera;
  private _renderer: WebGLRenderer;
  private _controls: TrackballControls;
  private _hotspots: Array<ModelHotspot>;

  private _sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  constructor(
    canvas: HTMLCanvasElement,
    modelUrl: string,
    hotspots: Array<ModelHotspot> = []
  ) {
    this._modelUrl = modelUrl;
    this._hotspots = hotspots;
    this._scene = new Scene();

    this._createAndSetupRenderer(canvas);
    this._createAndAddPerspectiveCameraToScene();
    this._setUpControls(canvas);

    window.addEventListener('resize', this._onResize);
  }

  private _setUpHotspots() {
    if (this._hotspots.length === 0) return;

    const raycaster = new Raycaster();

    for (const hotspot of this._hotspots) {
      const screenPosition = hotspot.position.clone();
      screenPosition.project(this._camera);
      raycaster.setFromCamera(screenPosition, this._camera);

      const intersections = raycaster.intersectObjects(
        this._scene.children,
        true
      );

      if (intersections.length === 0) {
        hotspot.element.classList.add('visible');
      } else {
        const intersectionDistance = intersections[0].distance;
        const hotspotDistance = hotspot.position.distanceTo(
          this._camera.position
        );

        hotspot.element.classList[
          intersectionDistance < hotspotDistance ? 'remove' : 'add'
        ]('visible');
      }

      const translateX = screenPosition.x * this._sizes.width * 0.5;
      const translateY = -screenPosition.y * this._sizes.height * 0.5;
      hotspot.element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
  }

  private _start = () => {
    this._controls.update();

    this._setUpHotspots();

    this._renderer.render(this._scene, this._camera);

    this._animationFrameId = window.requestAnimationFrame(this._start);
  };

  private _onResize = debounce(() => {
    this._sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this._camera.aspect = this._sizes.width / this._sizes.height;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(this._sizes.width, this._sizes.height);
  });

  private _setUpControls(canvas: HTMLCanvasElement) {
    this._controls = new TrackballControls(this._camera, canvas);
    // (this._controls as any).enableDamping = true;
  }

  private _createAndSetupRenderer(canvas: HTMLCanvasElement) {
    this._renderer = new WebGLRenderer({
      canvas,
      alpha: true,
    });

    this._renderer.setSize(this._sizes.width, this._sizes.height);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private _createAndAddPerspectiveCameraToScene() {
    this._camera = new PerspectiveCamera(
      50,
      this._sizes.width / this._sizes.height,
      0.1,
      100
    );
    this._scene.add(this._camera);
  }

  loadModelAndStart() {
    new GLTFLoader().load(this._modelUrl, ({scene: model}) => {
      centerModel(model, this._camera, this._controls); //, true);
      this._scene.add(model);

      const light = new AmbientLight(0xffffff);
      this._scene.add(light);

      this._start();
    });
  }

  destroy() {
    window.cancelAnimationFrame(this._animationFrameId);
    window.removeEventListener('resize', this._onResize);
  }
}
