import {LitElement, html} from 'lit';
import {customElement, property, query, queryAll} from 'lit/decorators.js';
import {styles} from './styles';
import {ModelViewer} from 'src/class/model-viewer';
import {repeat} from 'lit/directives/repeat.js';
import {Hotspot} from '@data/type/hotspot';
import {
  coordinatesArrayToVector3,
  getModelViewerHotspotInformation,
} from '@util/index';
import {LoaderElement} from '@component/loader-element/loader-element';
import '@component/loader-element/loader-element';

@customElement('model-viewer')
export class ModelViewerElement extends LitElement {
  static styles = styles;

  @property({type: String}) modelUrl!: string;
  @property({type: Array}) hotspots: ReadonlyArray<Hotspot> = [];

  @query('.model-canvas') private $modelCanvas!: HTMLCanvasElement;
  @query('loader-element') private $loaderElement!: LoaderElement;
  @queryAll('.hotspot') private $domHotspots!: NodeListOf<HTMLDivElement>;

  private _modelViewer!: ModelViewer;

  // Not doing it on connectedCallback because
  // we need _modelCanvas to be populated
  protected firstUpdated(): void {
    super.connectedCallback();

    const modelViewerHotspots = getModelViewerHotspotInformation(
      this.$domHotspots,
      this.hotspots.map(hotspot => hotspot.position)
    );

    this._modelViewer = new ModelViewer(
      this.$modelCanvas,
      this.modelUrl,
      modelViewerHotspots
    );

    this._modelViewer.onLoadProgress = this.$loaderElement.onProgressUpdate;
    this._modelViewer.onLoadFinish = this.$loaderElement.onProgressFinish;

    this._modelViewer.loadSceneAndStart();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._modelViewer.destroy();
  }

  private _onHotspotClick(event: Event) {
    const hostpotIndex = parseInt(
      (event.target as HTMLDivElement).getAttribute('data-index') || '0'
    );

    this._modelViewer.centerCamera(
      coordinatesArrayToVector3(this.hotspots[hostpotIndex].position)
    );
  }

  private _onResetCamera() {
    this._modelViewer.resetCamera();
  }

  render() {
    return html`
      <button @click=${this._onResetCamera}>RESET CAMERA</button>
      ${this.hotspots &&
      repeat(
        this.hotspots,
        (hotspot: Hotspot, index: number) => html`<div
          class="hotspot"
          @click=${this._onHotspotClick}
        >
          <div class="label" data-index=${index}>${index + 1}</div>
          <div class="text">${hotspot.text}</div>
        </div>`
      )}

      <loader-element></loader-element>
      <canvas class="model-canvas"></canvas>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'model-viewer': ModelViewerElement;
  }
}