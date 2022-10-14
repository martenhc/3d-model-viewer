import {LitElement, html} from 'lit';
import {customElement, query, queryAll} from 'lit/decorators.js';
import {styles} from './app-root-styles';
import {ModelViewer} from 'src/class/model-viewer';
import {repeat} from 'lit/directives/repeat.js';
import {Hotspot} from '@data/type/hotspot';
import {getModelViewerHotspotInformation} from '@util/hotspot';

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = styles;

  @query('.model-canvas') private $modelCanvas!: HTMLCanvasElement;
  @query('.loader') private $loader!: HTMLDivElement;
  @queryAll('.hotspots') private $domHotspots!: NodeListOf<HTMLDivElement>;

  private _modelViewer: ModelViewer;
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

    this._modelViewer.onLoadProgress = (
      _,
      loadedItemAmount,
      totalItemAmount
    ) => {
      const progressRatio = loadedItemAmount / totalItemAmount;
      this.$loader.style.backgroundImage = `conic-gradient(#1a73e8 ${
        progressRatio * 100
      }%, lightgrey 0%)`;
    };

    this._modelViewer.onLoadFinish = () => {
      this.$loader.style.display = 'none';
    };

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
        (hotspot: Hotspot, index: number) => html`<div
          class="hotspots hotspot-${index}"
        >
          <div class="label">${index + 1}</div>
          <div class="text">${hotspot.text}</div>
        </div>`
      )}

      <canvas class="model-canvas"></canvas>
      <div class="loader"></div>
    `;
  }
}
