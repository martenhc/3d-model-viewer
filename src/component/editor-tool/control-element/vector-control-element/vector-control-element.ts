import {VectorUpdate} from '@data/type/hotspot';
import {html, LitElement} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {customElement, property, queryAll, state} from 'lit/decorators.js';
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
  @property({type: Array}) position!: [number, number, number];

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

  render() {
    return html`<div class="vector-control-wrapper">
      ${repeat(
        ['X', 'Y', 'Z'],
        (axisName, index) => html`<div class="button">
          <span class="vector-name-wrapper">${axisName}:</span>
          <input
            data-axis-index=${index}
            class="slidebar"
            type="range"
            min="-100"
            max="100"
            value=${this.position[index] * 100}
          />
          <input
            data-axis-index=${index}
            class="number"
            type="number"
            value=${this.position[index] * 100}
            min="-100"
            max="100"
          />
        </div>`
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vector-control-element': VectorControlElement;
  }
}
