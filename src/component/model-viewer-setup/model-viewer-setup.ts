import {ModelViewerElement} from '@component/model-viewer/model-viewer';
import {Hotspot, VectorUpdate} from '@data/type/hotspot';
import {getModelViewerHotspotInformation} from '@util/hotspot';
import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {styles} from './styles';
import {classMap} from 'lit/directives/class-map.js';
import {when} from 'lit/directives/when.js';
import PlusIcon from '../../asset/icon/plus';
import '@component/vector-control-element/vector-control-element';
import '@component/model-control-element/model-control-element';

@customElement('model-viewer-setup')
export class ModelViewerSetupElement extends ModelViewerElement {
  static styles = [...super.styles, styles];

  @state() _openedIndex: number | null = 0;

  protected firstUpdated(): void {
    super.firstUpdated();

    this._modelViewer.onModelLoadError = errorMessage =>
      (this._errorMessage = errorMessage);
  }

  @state() _errorMessage = '';

  private _configureHotspots(hotspots: Array<Hotspot>) {
    const modelViewerHotspots = getModelViewerHotspotInformation(
      this.$domHotspots,
      hotspots.map(hotspot => hotspot.position)
    );

    this._modelViewer.hotspots = modelViewerHotspots;
  }

  private _onValueChanged({hotspotIndex, axisIndex, value}: VectorUpdate) {
    this.hotspots = this.hotspots.reduce(function (
      hotspots,
      currentHotspot,
      currentIndex
    ) {
      if (currentIndex === hotspotIndex) {
        hotspots.push({
          ...currentHotspot,
          position: currentHotspot.position.reduce(
            function (newPosition, _, positionIndex) {
              newPosition[positionIndex] =
                axisIndex === positionIndex
                  ? value
                  : currentHotspot.position[positionIndex];

              return newPosition;
            },
            [0, 0, 0]
          ),
        });
      } else hotspots.push(currentHotspot);

      return hotspots;
    },
    [] as Array<Hotspot>);

    this._configureHotspots(this.hotspots);
  }

  private _onAddButtonClick() {
    this.hotspots.push({
      position: [0, 0, 0],
      text: 'New hotspot',
    });

    this._openedIndex = this.hotspots.length - 1;

    this.requestUpdate();
  }

  private _onRemoveButtonClick(event: Event) {
    const stringIndex = (event.target as HTMLButtonElement).getAttribute(
      'data-index'
    );

    if (typeof stringIndex === 'string') {
      const wrapperElement = (event.target as HTMLButtonElement).parentElement;
      wrapperElement?.classList.add('closing');

      setTimeout(() => {
        this.hotspots.splice(parseInt(stringIndex), 1);
        this.requestUpdate();
      }, 250); // 250ms is what the closing animation takes
    }
  }

  private _onControlsClick(event: Event) {
    const stringIndex = (event.target as HTMLButtonElement).getAttribute(
      'data-index'
    );

    if (typeof stringIndex === 'string') {
      this._openedIndex === parseInt(stringIndex)
        ? (this._openedIndex = null)
        : (this._openedIndex = parseInt(stringIndex));
    }
  }

  private _onTextChange(event: Event) {
    const stringIndex = (event.target as HTMLInputElement).getAttribute(
      'data-index'
    );

    if (typeof stringIndex === 'string') {
      this.hotspots[parseInt(stringIndex)].text = (
        event.target as HTMLInputElement
      ).value;

      this.requestUpdate();
    }
  }

  private _onModelChange(event: CustomEvent<string>) {
    const newModelUrl = event.detail;
    this._modelViewer.updateModelUrl(newModelUrl);
    this.hotspots = [];
    this.requestUpdate();
  }

  render() {
    return html`
      <model-control-element
        @model-change=${this._onModelChange}
        .errorMessage=${this._errorMessage}
      ></model-control-element>
      <div class="controls-wrapper">
        ${repeat(this.hotspots, (hotspot, index) => {
          return html`<div class="hotspot-settings">
            <button
              data-index=${index}
              class="headline"
              @click=${this._onControlsClick}
            >
              Hotspot #${index + 1}
            </button>

            <button
              class="text-preview"
              data-index=${index}
              @click=${this._onControlsClick}
            >
              (${this.hotspots[index].text.length > 25
                ? `${this.hotspots[index].text.substring(0, 25)}...`
                : this.hotspots[index].text})
            </button>

            <div
              class="axis-controls-container ${classMap({
                'is-open': index === this._openedIndex,
              })}"
            >
              <div>
                Label:
                <input
                  type="text"
                  class="label-input"
                  value=${hotspot.text}
                  @change=${this._onTextChange}
                  data-index=${index}
                />
              </div>
              <vector-control-element
                .hotspotIndex=${index}
                .onValueChanged=${this._onValueChanged.bind(this)}
                .position=${hotspot.position}
              ></vector-control-element>
            </div>

            <button
              class="delete-button"
              data-index=${index}
              @click=${this._onRemoveButtonClick}
              title="delete hotspot"
              aria-label="delete hotspot number ${index + 1}"
            ></button>
          </div>`;
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
