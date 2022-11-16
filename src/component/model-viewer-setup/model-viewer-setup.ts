import {ModelViewerElement} from '@component/model-viewer/model-viewer';
import {Hotspot, VectorUpdate} from '@data/type/hotspot';
import {getModelViewerHotspotInformation} from '@util/hotspot';
import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import '@component/vector-control-element/vector-control-element';
import { throws } from 'assert';

@customElement('model-viewer-setup')
export class ModelViewerSetupElement extends ModelViewerElement {
  private _configureHotspots(hotspots: Array<Hotspot>) {
    const modelViewerHotspots = getModelViewerHotspotInformation(
      this.$domHotspots,
      hotspots.map(hotspot => hotspot.position)
    );

    this._modelViewer.hotspots = modelViewerHotspots;
  }

  private _onValueChanged({hotspotIndex, axisIndex, value}: VectorUpdate) {
    this.hotspots = this.hotspots.reduce(function (hotspots, currentHotspot, currentIndex)  {
      if (currentIndex === hotspotIndex ) {
        hotspots.push({
          ...currentHotspot,
          position: currentHotspot.position.reduce(function (newPosition, _, positionIndex) {
            newPosition[positionIndex] = axisIndex ===  positionIndex ? value : currentHotspot.position[positionIndex];

            return newPosition;
          }, [0, 0, 0])
        })
      } else hotspots.push(currentHotspot);

      return hotspots;
    }, [] as Array<Hotspot>);

    this._configureHotspots(this.hotspots);
  }

  render() {
    return html`
      <vector-control-element
        .hotspotIndex=${0}
        .onValueChanged=${this._onValueChanged.bind(this)}
      ></vector-control-element>
      ${super.render()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'model-viewer-setup': ModelViewerSetupElement;
  }
}
