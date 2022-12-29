import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {Hotspot, VectorUpdate} from '@data/type/hotspot';
import {styles} from './styles';
import {buttonStyle} from 'src/style/button';
import '@component/vector-control-element/vector-control-element';

@customElement('hotspot-control-element')
export class HotspotControlElement extends LitElement {
  static styles = [buttonStyle, styles];
  @property({type: Number}) index!: number;
  @property({type: Number}) openedIndex!: number | null;
  @property({type: Array}) hotspots!: Array<Hotspot>;

  private get hotspot(): Hotspot {
    return this.hotspots[this.index];
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
      const index = parseInt(stringIndex);
      let openedIndex = null;

      if (this.openedIndex !== index) openedIndex = index;

      this.dispatchEvent(
        new CustomEvent('headline-click', {detail: openedIndex})
      );
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

    dispatchEvent(new CustomEvent('hotspot-change', {detail: this.hotspots}));
  }

  render() {
    return html`<div class="hotspot-settings">
      <button
        data-index=${this.index}
        class="headline"
        @click=${this._onControlsClick}
      >
        Hotspot #${this.index + 1}
      </button>

      <button
        class="text-preview"
        data-index=${this.index}
        @click=${this._onControlsClick}
      >
        (${this.hotspots[this.index].text.length > 25
          ? `${this.hotspots[this.index].text.substring(0, 25)}...`
          : this.hotspots[this.index].text})
      </button>

      <div
        class="axis-controls-container ${classMap({
          'is-open': this.index === this.openedIndex,
        })}"
      >
        <div>
          Label:
          <input
            type="text"
            class="label-input"
            value=${this.hotspot.text}
            @change=${this._onTextChange}
            data-index=${this.index}
          />
        </div>
        <vector-control-element
          .hotspotIndex=${this.index}
          .onValueChanged=${this._onValueChanged.bind(this)}
          .position=${this.hotspot.position}
        ></vector-control-element>
      </div>

      <button
        class="delete-button"
        data-index=${this.index}
        @click=${this._onRemoveButtonClick}
        title="delete hotspot"
        aria-label="delete hotspot number ${this.index + 1}"
      ></button>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hotspot-control-element': HotspotControlElement;
  }
}
