import {VectorUpdate} from '@data/type/hotspot';
import {html, LitElement} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {customElement, property, queryAll, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styles} from './styles';

@customElement('vector-control-element')
export class VectorControlElement extends LitElement {
  static styles = styles;

  @queryAll('.slidebar') private $slidebars!: Array<HTMLInputElement>;
  @queryAll('.number') private $numbers!: Array<HTMLInputElement>;

  @property({type: Function}) onValueChanged!: (
    vectorUpdate: VectorUpdate
  ) => void;
  @property({type: Number}) hotspotIndex!: number;

  @state() _isOpen = false;

  protected firstUpdated(): void {
    const that = this;

    function _onInput(this: GlobalEventHandlers) {
      const passedValue = (this as HTMLInputElement).value;
      const axisIndex = parseInt(
        (this as HTMLInputElement).getAttribute('data-axis-index') || '0'
      );

      (that.$numbers[axisIndex] as HTMLInputElement).value = passedValue;
      (that.$slidebars[axisIndex] as HTMLInputElement).value = passedValue;
      that.onValueChanged({
        hotspotIndex: that.hotspotIndex,
        value: parseInt(passedValue) / 100,
        axisIndex,
      });
    }

    this.$slidebars.forEach(slidebar => (slidebar.oninput = _onInput));
    this.$numbers.forEach(number => (number.oninput = _onInput));
  }

  private _onControlsClick() {
    this._isOpen = !this._isOpen;
  }

  render() {
    return html`<div class="vector-control-wrapper">
      <button class="button" @click=${this._onControlsClick}>
        Hotspot #${this.hotspotIndex + 1} <b>></b>
      </button>
      <div
        class="axis-controls-container ${classMap({'is-open': this._isOpen})}"
      >
        ${repeat(
          ['X', 'Y', 'Z'],
          (axisName, index) => html`<div class="button">
            <b>${axisName}</b>:
            <input
              data-axis-index=${index}
              class="slidebar"
              type="range"
              min="-100"
              max="100"
              value="0"
            />
            <input
              data-axis-index=${index}
              class="number"
              type="number"
              value="0"
              min="-100"
              max="100"
            />
          </div>`
        )}
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vector-control-element': VectorControlElement;
  }
}
