import {LitElement, html, nothing} from 'lit';
import {customElement, query, queryAll, state} from 'lit/decorators.js';
import {styles} from './app-root-styles';
import {ModelViewer} from 'src/class/model-viewer';
import {repeat} from 'lit/directives/repeat.js';
import {when} from 'lit/directives/when.js';
import {Hotspot} from '@data/type/hotspot';
import {getModelViewerHotspotInformation} from '@util/hotspot';
import {LoaderElement} from '@component/loader-element/loader-element';
import '@component/loader-element/loader-element';

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = styles;

  @query('.model-canvas') private $modelCanvas!: HTMLCanvasElement;
  @query('loader-element') private $loaderElement!: LoaderElement;
  @queryAll('.hotspot') private $domHotspots!: NodeListOf<HTMLDivElement>;

  private _modelViewer!: ModelViewer;
  private _hotspots: Array<Hotspot> = [
    {
      position: [0.2, 0.3, 0.15],
      text: 'This is one hotspot',
    },
    {
      position: [0.1, 0.7, -0.2],
      text: 'This is a second hotspot',
    },
    {
      position: [-0.1, -0.35, 0.1],
      text: 'This is the last hotspot',
    },
  ];

  // Not doing it on connectedCallback because
  // we need _modelCanvas to be populated
  protected firstUpdated(): void {
    super.connectedCallback();

    const modelViewerHotspots = getModelViewerHotspotInformation(
      this.$domHotspots,
      this._hotspots.map(hotspot => hotspot.position)
    );

    this._modelViewer = new ModelViewer(
      this.$modelCanvas,
      '/static/model/astronaut.glb',
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

  render() {
    return html`
      ${repeat(
        this._hotspots,
        (hotspot: Hotspot, index: number) => html`<div class="hotspot">
          <div class="label">${index + 1}</div>
          <div class="text">${hotspot.text}</div>
        </div>`
      )}

      <loader-element></loader-element>
      <canvas class="model-canvas"></canvas>
    `;
  }
}
