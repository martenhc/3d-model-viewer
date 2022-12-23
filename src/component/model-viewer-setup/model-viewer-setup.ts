import {ModelViewerElement} from '@component/model-viewer/model-viewer';
import {Hotspot, VectorUpdate} from '@data/type/hotspot';
import {getModelViewerHotspotInformation} from '@util/hotspot';
import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {styles} from './styles';
import '@component/vector-control-element/vector-control-element';

@customElement('model-viewer-setup')
export class ModelViewerSetupElement extends ModelViewerElement {
  static styles = [...super.styles, styles];

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
      text: 'new hotspot',
    });

    this.requestUpdate();
  }

  private _onRemoveButtonClick(event: Event) {
    const stringIndex = (event.target as HTMLButtonElement).getAttribute(
      'data-index'
    );

    if (typeof stringIndex === 'string') {
      this.hotspots.splice(parseInt(stringIndex), 1);
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <div class="controls-wrapper">
        ${repeat(this.hotspots, (hotspot, index) => {
          return html` <button
              data-index=${index}
              @click=${this._onRemoveButtonClick}
            >
              -
            </button>
            <vector-control-element
              .hotspotIndex=${index}
              .onValueChanged=${this._onValueChanged.bind(this)}
              .position=${hotspot.position}
            ></vector-control-element>`;
        })}

        <button @click=${this._onAddButtonClick}>+</button>
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
