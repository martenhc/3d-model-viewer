import {ModelHotspot} from '@data/type/hotspot';
import {getOverlayShader, centerModel, debounce} from '@util/index';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  Raycaster,
  LoadingManager,
  ShaderMaterial,
  Vector3,
  PointLight,
  Group,
} from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {Tween, update as tweenUpdate, Easing} from '@tweenjs/tween.js';

export class ModelViewer {
  private _modelUrl: string;
  private _animationFrameId: number = 0;
  private _scene: Scene;
  private _camera!: PerspectiveCamera;
  private _renderer!: WebGLRenderer;
  private _controls!: TrackballControls;
  private _overlayShader: ShaderMaterial;
  private _currentModel: Group | undefined = undefined;
  public hotspots: Array<ModelHotspot>;

  public onLoadFinish: () => void = () => {};
  public onLoadProgress: (
    url: string,
    loadedItemAmount: number,
    totalItemAmount: number
  ) => void = () => {};
  public onModelLoadError: (errorMessage: string) => void = () => {};

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
    this.hotspots = hotspots;
    this._scene = new Scene();

    this._createAndSetupRenderer(canvas);
    this._createAndAddPerspectiveCameraToScene();
    this._setUpControls(canvas);
    this._overlayShader = getOverlayShader(this._scene);

    window.addEventListener('resize', this._onResize);
  }

  private _setUpHotspots() {
    if (this.hotspots.length === 0) return;

    const raycaster = new Raycaster();

    for (const hotspot of this.hotspots) {
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

    tweenUpdate();
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

    const light = new AmbientLight(0xffffff, 0.1);
    this._scene.add(light);

    const cameraLight = new PointLight(0xffffff, 1);
    this._camera.add(cameraLight);

    this._scene.add(this._camera);
  }

  centerCamera(position: Vector3) {
    new Tween(this._camera.position)
      .to(position, 1500)
      .easing(Easing.Circular.Out)
      .start();
  }

  resetCamera() {
    new Tween(this._camera.position)
      .to(new Vector3(0, 0, this._controls.minDistance), 1500)
      .easing(Easing.Circular.Out)
      .start();

    this._controls.reset();
  }

  loadSceneAndStart() {
    const loadingManager = new LoadingManager(
      // Loaded
      () => {
        // Give some space for progress to finish
        setTimeout(() => {
          this.onLoadFinish();
          this._overlayShader.uniforms.uAlpha.value = 0;

          this._start();
        }, 150);
      },
      this.onLoadProgress
    );

    // Only one model per scene for the model viewer
    this._currentModel && this._scene.remove(this._currentModel);

    new GLTFLoader(loadingManager).load(
      this._modelUrl,
      ({scene: model}) => {
        this._currentModel = model;
        centerModel(model, this._camera, this._controls); //, true);
        this._scene.add(model);
      },
      () => this.onLoadProgress,
      error => {
        this.onModelLoadError(error.message);
      }
    );
  }

  updateModelUrl(newModelUrl: string) {
    this.onModelLoadError('');
    this._modelUrl = newModelUrl;
    this.loadSceneAndStart();
  }

  destroy() {
    window.cancelAnimationFrame(this._animationFrameId);
    window.removeEventListener('resize', this._onResize);
  }
}
