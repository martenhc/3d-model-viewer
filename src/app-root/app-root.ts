import {LitElement, html} from 'lit';
import {customElement, query} from 'lit/decorators.js';
import {styles} from './app-root-styles';
import {ModelViewer} from 'src/class/model-viewer';

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = styles;

  @query('.modelCanvas') private $modelCanvas!: HTMLCanvasElement;

  // private _isLoaded = false;
  private _modelViewerScene: ModelViewer;

  // Not doing it on connectedCallback because
  // we need _modelCanvas to be populated
  protected firstUpdated(): void {
    super.connectedCallback();

    this._modelViewerScene = new ModelViewer(
      this.$modelCanvas,
      '/static/model/astronaut.glb'
    );

    this._modelViewerScene.loadModelAndStart();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._modelViewerScene.destroy();
  }

  render() {
    return html`<canvas class="modelCanvas"></canvas>`;
  }
}
