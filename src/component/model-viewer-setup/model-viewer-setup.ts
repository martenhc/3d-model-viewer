import {ModelViewerElement} from '@component/model-viewer/model-viewer';
import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {styles} from './styles';
import {when} from 'lit/directives/when.js';
import PlusIcon from '../../asset/icon/plus';
import {Hotspot} from '@data/type/hotspot';
import {getModelViewerHotspotInformation} from '@util/hotspot';
import '@component/model-control-element/model-control-element';
import '@component/hotspot-control-element/hotspot-control-element';

@customElement('model-viewer-setup')
export class ModelViewerSetupElement extends ModelViewerElement {
  static styles = [...super.styles, styles];

  @state() _openedIndex: number | null = 0;
  @state() _errorMessage = '';

  protected firstUpdated(): void {
    super.firstUpdated();

    this._modelViewer.onModelLoadError = errorMessage =>
      (this._errorMessage = errorMessage);
  }

  private _configureHotspots({detail: hotspots}: CustomEvent<Array<Hotspot>>) {
    // If this is a hotspot deletion, no need to update hotspots postion.
    if (this.$domHotspots.length <= hotspots.length) {
      const modelViewerHotspots = getModelViewerHotspotInformation(
        this.$domHotspots,
        hotspots.map(hotspot => hotspot.position)
      );

      this._modelViewer.hotspots = modelViewerHotspots;
    }

    this.requestUpdate();
  }

  private _onAddButtonClick() {
    this.hotspots.push({
      position: [0, 0, 0],
      text: 'New hotspot',
    });

    this._openedIndex = this.hotspots.length - 1;

    this.requestUpdate();
  }

  private _onModelChange({detail: newModelUrl}: CustomEvent<string>) {
    this._modelViewer.updateModelUrl(newModelUrl);
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
            @hotspot-update=${(event: CustomEvent<Array<Hotspot>>) =>
              this._configureHotspots(event)}
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
        ${super.render()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'model-viewer-setup': ModelViewerSetupElement;
  }
}
