import {ModelViewerElement} from '@component/model-viewer/model-viewer';
import {html} from 'lit';
import {customElement, queryAll, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {styles} from './styles';
import {when} from 'lit/directives/when.js';
import PlusIcon from '../../../asset/icon/plus';
import {Hotspot} from '@data/type/hotspot';
import {getModelViewerHotspotInformation} from '@util/hotspot';
import {HotspotControlElement} from '@component/editor-tool/control-element/hotspot-control-element/hotspot-control-element';
import '@component/editor-tool/control-element/model-control-element/model-control-element';
import '@component/editor-tool/control-element/hotspot-control-element/hotspot-control-element';
import '@component/editor-tool/script-display/script-display';

@customElement('model-viewer-setup')
export class ModelViewerSetupElement extends ModelViewerElement {
  static styles = [...super.styles, styles];

  @state() _modelUrl = `${document.location.href}static/model/astronaut.glb`;
  @state() _openedIndex: number | null = 0;
  @state() _errorMessage = '';

  @queryAll('hotspot-control-element')
  $hotspotControlElements!: Array<HotspotControlElement>;

  protected firstUpdated(): void {
    super.firstUpdated();

    this._modelViewer.onModelLoadError = errorMessage =>
      (this._errorMessage = errorMessage);
  }

  private _updateModelViewer(updateCallback?: () => void) {
    this.requestUpdate();

    this.updateComplete.then(() => {
      const modelViewerHotspots = getModelViewerHotspotInformation(
        this.$domHotspots,
        this.hotspots.map(hotspot => hotspot.position)
      );

      this._modelViewer.hotspots = modelViewerHotspots;

      updateCallback && updateCallback();
    });
  }

  private _configureHotspots({detail: hotspots}: CustomEvent<Array<Hotspot>>) {
    this.hotspots = hotspots;

    // If there's a deletion, update the controls
    if (this.hotspots.length < this.$domHotspots.length) {
      this._updateModelViewer(() =>
        this.$hotspotControlElements.forEach(element => element.requestUpdate())
      );
    } else {
      this._updateModelViewer();
    }
  }

  private _onAddButtonClick() {
    this.hotspots.push({
      position: [0, 0, 0],
      text: 'New hotspot',
    });

    this._updateModelViewer();

    this._openedIndex = this.hotspots.length - 1;
  }

  private _onModelChange({detail: newModelUrl}: CustomEvent<string>) {
    this._modelViewer.updateModelUrl(newModelUrl);
    this._modelUrl = newModelUrl;
    this.hotspots = [];
  }

  private _updateOpenedIndex({detail: index}: CustomEvent<number | null>) {
    this._openedIndex = index;
  }

  render() {
    return html`
      <model-control-element
        @model-change=${this._onModelChange}
        .errorMessage=${this._errorMessage}
      ></model-control-element>
      <div class="controls-wrapper">
        ${repeat(this.hotspots, (_, index) => {
          return html`<hotspot-control-element
            .index=${index}
            .hotspots=${this.hotspots}
            .openedIndex=${this._openedIndex}
            @hotspot-update=${this._configureHotspots}
            @headline-click=${this._updateOpenedIndex}
          ></hotspot-control-element>`;
        })}
        ${when(!this._errorMessage, () => {
          return html`<button
            class="text-preview"
            @click=${this._onAddButtonClick}
            title="add new hotspot"
            aria-label="add new hotspot"
          >
            ${PlusIcon} <span class="add-text">Add hotspot</span>
          </button> `;
        })}
        </div>
      </div>
      <div class="script-display-wrapper">
        <script-display 
          .modelUrl=${this._modelUrl}
          .hotspots=${this.hotspots}
        ></script-display>
      </div>
      ${super.render()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'model-viewer-setup': ModelViewerSetupElement;
  }
}
